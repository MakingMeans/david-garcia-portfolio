/**
 * Live Codeforces data for the profile modal, read from the public API
 * (https://codeforces.com/apiHelp) in the visitor's browser. The API answers
 * with `Access-Control-Allow-Origin: *`, so no backend sits in between.
 *
 * `contest.standings` no longer filters by handle for anonymous callers, so
 * each contest's problems and failed attempts are rebuilt from the user's own
 * submissions instead.
 */
import { site } from '../data/site'

const API = 'https://codeforces.com/api'
const DAY = 86_400_000

// Only the fields read below.
interface ApiUser {
  handle: string
  rating?: number
  maxRating?: number
  titlePhoto: string
  avatar: string
  organization?: string
  city?: string
  country?: string
}

interface ApiRatingChange {
  contestId: number
  contestName: string
  rank: number
  ratingUpdateTimeSeconds: number
  oldRating: number
  newRating: number
}

interface ApiSubmission {
  contestId?: number
  creationTimeSeconds: number
  problem: { contestId?: number; problemsetName?: string; index: string; name: string }
  author: { participantType: string }
  verdict?: string
}

interface ApiContest {
  id: number
  name: string
  phase: string
  durationSeconds: number
  startTimeSeconds?: number
}

type ApiResponse<T> = { status: 'OK'; result: T } | { status: 'FAILED'; comment: string }

export interface Rank {
  name: string
  /** Lowest rating that earns the rank. */
  min: number
  /** Codeforces' own hue, lifted just enough to read on the dark surface. */
  color: string
  /** 0 = newbie … 9 = legendary grandmaster; picks the emblem. */
  tier: number
}

export const RANKS: Rank[] = [
  { name: 'Newbie', min: -Infinity, color: '#a3a3a3', tier: 0 },
  { name: 'Pupil', min: 1200, color: '#4ade80', tier: 1 },
  { name: 'Specialist', min: 1400, color: '#2dd4bf', tier: 2 },
  { name: 'Expert', min: 1600, color: '#60a5fa', tier: 3 },
  { name: 'Candidate Master', min: 1900, color: '#e879f9', tier: 4 },
  { name: 'Master', min: 2100, color: '#fb923c', tier: 5 },
  { name: 'International Master', min: 2300, color: '#fb923c', tier: 6 },
  { name: 'Grandmaster', min: 2400, color: '#f87171', tier: 7 },
  { name: 'International Grandmaster', min: 2600, color: '#f87171', tier: 8 },
  { name: 'Legendary Grandmaster', min: 3000, color: '#f87171', tier: 9 },
]

export const rankFor = (rating: number) => RANKS.findLast((rank) => rating >= rank.min) ?? RANKS[0]

export const formatDate = (time: number) =>
  new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

/** A rating change as Codeforces prints it, with a true minus sign. */
export const formatDelta = (delta: number) => (delta > 0 ? `+${delta}` : delta < 0 ? `−${-delta}` : '0')

export interface RatingPoint {
  contestId: number
  contestName: string
  /** When the change was applied, in ms. */
  time: number
  rating: number
  delta: number
  place: number
}

/** `even` is a rated contest that moved nothing; `pending` is still waiting for its change. */
export type ContestOutcome = 'gain' | 'loss' | 'even' | 'unrated' | 'pending'

export interface ProblemAttempt {
  index: string
  name: string
  solved: boolean
  failed: number
}

export interface ContestEntry {
  id: number
  name: string
  /** Start time in ms. */
  start: number
  /** In seconds; 0 when the contest is not in the public list (gyms). */
  duration: number
  outcome: ContestOutcome
  /** Final standing – only known for rated contests. */
  place?: number
  before: number
  after: number
  problems: ProblemAttempt[]
  failed: number
}

export interface Activity {
  /** Submissions per local calendar day, keyed by `dayKey`. */
  perDay: Map<string, number>
  solved: { all: number; year: number; month: number }
  streak: { all: number; year: number; month: number }
}

export interface CodeforcesProfile {
  handle: string
  /** Where to load the current Codeforces photo from, in order of preference. */
  photos: string[]
  rating: number
  maxRating: number
  rank: Rank
  maxRank: Rank
  organization?: string
  location?: string
  ratingHistory: RatingPoint[]
  /** Most recent first. */
  contests: ContestEntry[]
  activity: Activity
  fetchedAt: number
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** The API allows about one call every two seconds per visitor; back off and retry when it says so. */
async function call<T>(method: string, params: Record<string, string>): Promise<T> {
  const url = `${API}/${method}?${new URLSearchParams(params)}`

  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url)
    const body = (await response.json().catch(() => null)) as ApiResponse<T> | null
    if (body?.status === 'OK') return body.result

    const comment = body?.status === 'FAILED' ? body.comment : `Codeforces answered ${response.status}`
    if ((response.status === 429 || /call limit/i.test(comment)) && attempt < 3) {
      await sleep(2000 * (attempt + 1))
      continue
    }
    throw new Error(comment)
  }
}

/** Local calendar day, so the heatmap and streaks follow the visitor's clock as Codeforces' own do. */
export const dayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const problemKey = (submission: ApiSubmission) =>
  `${submission.problem.contestId ?? submission.problem.problemsetName}-${submission.problem.index}`

function longestStreak(times: number[]) {
  const days = [
    ...new Set(
      times.map((time) => {
        const date = new Date(time)
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
      }),
    ),
  ].sort((a, b) => a - b)

  let best = 0
  let run = 0
  days.forEach((day, i) => {
    // Rounded, because a day across a DST change is 23 or 25 hours long.
    run = i > 0 && Math.round((day - days[i - 1]) / DAY) === 1 ? run + 1 : 1
    best = Math.max(best, run)
  })
  return best
}

function buildActivity(submissions: ApiSubmission[], now: number): Activity {
  const perDay = new Map<string, number>()
  for (const submission of submissions) {
    const key = dayKey(new Date(submission.creationTimeSeconds * 1000))
    perDay.set(key, (perDay.get(key) ?? 0) + 1)
  }

  const since = (from: number) => submissions.filter((s) => s.creationTimeSeconds * 1000 >= from)
  const solved = (list: ApiSubmission[]) => new Set(list.filter((s) => s.verdict === 'OK').map(problemKey)).size
  const streak = (list: ApiSubmission[]) => longestStreak(list.map((s) => s.creationTimeSeconds * 1000))
  const year = since(now - 365 * DAY)
  const month = since(now - 30 * DAY)

  return {
    perDay,
    solved: { all: solved(submissions), year: solved(year), month: solved(month) },
    streak: { all: streak(submissions), year: streak(year), month: streak(month) },
  }
}

/** Submissions that never got a verdict are not failures. */
const UNJUDGED = new Set(['TESTING', 'SKIPPED'])

function attemptsByProblem(submissions: ApiSubmission[]): ProblemAttempt[] {
  const byIndex = new Map<string, ProblemAttempt>()
  for (const { problem, verdict } of submissions) {
    const attempt = byIndex.get(problem.index) ?? { index: problem.index, name: problem.name, solved: false, failed: 0 }
    if (verdict === 'OK') attempt.solved = true
    else if (verdict && !UNJUDGED.has(verdict)) attempt.failed += 1
    byIndex.set(problem.index, attempt)
  }
  return [...byIndex.values()].sort((a, b) => a.index.localeCompare(b.index, 'en', { numeric: true }))
}

/** Rating held at `time`: the last change applied before it, or 0 before the first. */
function ratingAt(ratings: ApiRatingChange[], time: number) {
  let rating = 0
  for (const change of ratings) {
    if (change.ratingUpdateTimeSeconds * 1000 > time) break
    rating = change.newRating
  }
  return rating
}

/** Live participation only – practice and virtual runs are not contests taken. */
const LIVE = new Set(['CONTESTANT', 'OUT_OF_COMPETITION'])
/** Rated rounds can take a day or two to apply their changes. */
const RATING_GRACE_MS = 3 * DAY

function buildContests(
  ratings: ApiRatingChange[],
  submissions: ApiSubmission[],
  contests: ApiContest[],
  now: number,
): ContestEntry[] {
  const contestById = new Map(contests.map((contest) => [contest.id, contest]))
  const changeById = new Map(ratings.map((change) => [change.contestId, change]))
  const ownById = new Map<number, ApiSubmission[]>()
  for (const submission of submissions) {
    if (submission.contestId === undefined || !LIVE.has(submission.author.participantType)) continue
    ownById.set(submission.contestId, [...(ownById.get(submission.contestId) ?? []), submission])
  }

  return [...new Set([...changeById.keys(), ...ownById.keys()])]
    .map((id): ContestEntry => {
      const contest = contestById.get(id)
      const change = changeById.get(id)
      const own = ownById.get(id) ?? []
      const startSeconds =
        contest?.startTimeSeconds ??
        change?.ratingUpdateTimeSeconds ??
        Math.min(...own.map((s) => s.creationTimeSeconds))
      const problems = attemptsByProblem(own)

      const entry = {
        id,
        name: contest?.name ?? change?.contestName ?? `Contest ${id}`,
        start: startSeconds * 1000,
        duration: contest?.durationSeconds ?? 0,
        problems,
        failed: problems.reduce((total, problem) => total + problem.failed, 0),
      }

      if (change) {
        const delta = change.newRating - change.oldRating
        return {
          ...entry,
          outcome: delta > 0 ? 'gain' : delta < 0 ? 'loss' : 'even',
          place: change.rank,
          before: change.oldRating,
          after: change.newRating,
        }
      }

      const before = ratingAt(ratings, entry.start)
      const ended = entry.start + entry.duration * 1000
      const awaitingChange =
        contest !== undefined &&
        own.some((s) => s.author.participantType === 'CONTESTANT') &&
        !/unrated/i.test(entry.name) &&
        (contest.phase !== 'FINISHED' || now - ended < RATING_GRACE_MS)

      return { ...entry, outcome: awaitingChange ? 'pending' : 'unrated', before, after: before }
    })
    .sort((a, b) => b.start - a.start)
}

const absolute = (url: string) => (url.startsWith('//') ? `https:${url}` : url)

async function fetchProfile(handle: string): Promise<CodeforcesProfile> {
  const [[user], ratings, submissions, contests] = await Promise.all([
    call<ApiUser[]>('user.info', { handles: handle }),
    call<ApiRatingChange[]>('user.rating', { handle }),
    call<ApiSubmission[]>('user.status', { handle }),
    call<ApiContest[]>('contest.list', { gym: 'false' }),
  ])
  const now = Date.now()
  const titlePhoto = absolute(user.titlePhoto)

  return {
    handle: user.handle,
    // When userpic.codeforces.org fails, Cloudflare caches the error for up to
    // two days, so the second try asks past that cache; the small avatar is last.
    photos: [titlePhoto, `${titlePhoto}?v=${now}`, absolute(user.avatar)],
    rating: user.rating ?? 0,
    maxRating: user.maxRating ?? 0,
    rank: rankFor(user.rating ?? 0),
    maxRank: rankFor(user.maxRating ?? 0),
    organization: user.organization || undefined,
    location: [user.city, user.country].filter(Boolean).join(', ') || undefined,
    ratingHistory: ratings.map((change) => ({
      contestId: change.contestId,
      contestName: change.contestName,
      time: change.ratingUpdateTimeSeconds * 1000,
      rating: change.newRating,
      delta: change.newRating - change.oldRating,
      place: change.rank,
    })),
    contests: buildContests(ratings, submissions, contests, now),
    activity: buildActivity(submissions, now),
    fetchedAt: now,
  }
}

let request: Promise<CodeforcesProfile> | null = null
let latest: CodeforcesProfile | null = null

/** Fetched once per page view and shared by every opening; a failure is dropped so it can be retried. */
export function loadCodeforcesProfile() {
  request ??= fetchProfile(site.codeforcesHandle).then(
    (profile) => (latest = profile),
    (error: unknown) => {
      request = null
      throw error
    },
  )
  return request
}

/** The profile if it has already arrived, so a reopened modal skips the loader. */
export const cachedCodeforcesProfile = () => latest
