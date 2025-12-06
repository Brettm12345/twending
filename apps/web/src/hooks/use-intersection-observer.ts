import {useCallback, useEffect, useState} from 'react'

function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const ref = useCallback((element: HTMLElement) => {
    setNode(element)
  }, [])

  useEffect(() => {
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [node, options])

  return [ref, isVisible]
}
