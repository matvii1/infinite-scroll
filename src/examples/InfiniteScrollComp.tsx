import axios from 'axios'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

type Item = {
  id: number
  name: string
  message: string
}

const InfiniteScrollComp: FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const fetchData = useCallback(async () => {
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
      console.log(error)
    }
  }, [page])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h3>Infinite scroll component</h3>

      <InfiniteScroll
        className="list"
        dataLength={items.length}
        hasMore={hasMore}
        next={fetchData}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data</p>}
        scrollThreshold={1}
      >
        {items.map((item, i) => (
          <li key={i} className="element">
            {item.name}# {item.id}
          </li>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export { InfiniteScrollComp }
