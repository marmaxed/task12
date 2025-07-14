import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies } from './store'
import { Link } from 'react-router-dom'
import { type RootState } from './store'

export default function Search() {
  const [query, setQuery] = useState('')
  const { list, loading } = useSelector((s: RootState) => s.movies)
  const dispatch = useDispatch<any>()

  const onSearch = () => {
    if (query.trim()) dispatch(fetchMovies(query))
  }

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Название..." />
      <button onClick={onSearch}>Искать</button>
      {loading && <p>Загрузка...</p>}
      <ul>
        {list.map(m => (
          <li key={m.imdbID}>
            <Link to={`/movie/${m.imdbID}`}>{m.Title} ({m.Year})</Link>
          </li>
        ))}
      </ul>
      { !loading && list.length === 0 && <p>Ничего не найдено</p> }
    </div>
  )
}