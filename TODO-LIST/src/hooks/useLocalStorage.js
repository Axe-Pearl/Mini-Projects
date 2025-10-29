import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (e) {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (e) {
      // ignore write errors (e.g., storage full, sandboxed env)
    }
  }, [key, state])

  return [state, setState]
}

export default useLocalStorage
