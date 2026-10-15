import { useEffect, useState } from 'react'
import { cachedCodeforcesProfile, loadCodeforcesProfile, type CodeforcesProfile } from './codeforces'

type State =
  | { status: 'loading' }
  | { status: 'ready'; profile: CodeforcesProfile }
  | { status: 'error'; message: string }

const initialState = (): State => {
  const profile = cachedCodeforcesProfile()
  return profile ? { status: 'ready', profile } : { status: 'loading' }
}

export function useCodeforcesProfile() {
  const [state, setState] = useState<State>(initialState)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    loadCodeforcesProfile().then(
      (profile) => {
        if (!cancelled) setState({ status: 'ready', profile })
      },
      (error: unknown) => {
        if (!cancelled) setState({ status: 'error', message: error instanceof Error ? error.message : String(error) })
      },
    )
    return () => {
      cancelled = true
    }
  }, [attempt])

  const retry = () => {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }

  return { state, retry }
}
