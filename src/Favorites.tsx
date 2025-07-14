import { useSelector, useDispatch } from 'react-redux'
import { type RootState, removeFavorite } from './store'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const favs = useSelector((s: RootState) => s.favorites)
  const dispatch = useDispatch()

  if (favs.length === 0) return <p>Пока нет избранных фильмов</p>

  return (
    <div>
      <h1>Избранное</h1>
      <ul>
        {favs.map(m => (
          <li key={m.imdbID}>
            <Link to={`/movie/${m.imdbID}`}>{m.Title}</Link>
            <button onClick={() => dispatch(removeFavorite(m.imdbID))}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}