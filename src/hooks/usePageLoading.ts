import {
  useEffect,
  useState,
} from 'react'

function usePageLoading(
  duration = 500,
) {
  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const timer = window.setTimeout(
      () => {
        setLoading(false)
      },
      duration,
    )

    return () => {
      window.clearTimeout(timer)
    }
  }, [duration])

  return loading
}

export default usePageLoading