import { Navigate, Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { InfiniteScrollComp, Observer } from './examples'

function App() {
  return (
    <div className="container">
      <div className="link-group">
        <Link to="/observer" className="link">
          Observer
        </Link>
        <Link to="/infinite-scroll" className="link">
          Infinite scroll component
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/observer" />} />
        <Route path="/observer" element={<Observer />} />
        <Route path="/infinite-scroll" element={<InfiniteScrollComp />} />
      </Routes>
    </div>
  )
}

export default App
