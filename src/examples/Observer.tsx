import axios from 'axios'
import { useState, useEffect, useRef, useCallback } from 'react'

type Item = {
  id: number
  name: string
  message: string
}

const Observer = () => {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)

  const observer = useRef<IntersectionObserver | null>(null)
  const observerTarget = useRef<HTMLDivElement>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(false)

    try {
      // to make sure loading state is working
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { data } = await axios.get<Item[]>(
        `https://api.punkapi.com/v2/beers?page=${page}`
      )

      setItems((prevItems) => [...prevItems, ...data])
      setPage((prev) => prev + 1)
      setHasMore(data.length > 0)
    } catch (error) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const element = observerTarget.current
    observer.current = new IntersectionObserver(
      (entries) => {
        if (isLoading) return

        if (entries[0].isIntersecting && hasMore) {
          fetchData()
        }
      },
      { threshold: 1 }
    )

    if (element) {
      observer.current.observe(element)
    }

    return () => {
      if (element) {
        observer.current!.unobserve(element)
      }
    }
  }, [fetchData, observer, isLoading, hasMore])

  return (
    <div>
      <h3>Observer API</h3>
      <ul className="list">
        {items.map((item, i) => (
          <li key={i} className="element">
            {item.name}# {item.id}
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {!hasMore && <p>No more data</p>}

      <div ref={observerTarget}></div>
    </div>
  )
}

export { Observer }
