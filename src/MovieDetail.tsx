import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieById, clearSelected, addFavorite } from './store'
import { type RootState } from './store'

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<any>()
  const movie = useSelector((s: RootState) => s.movies.selected)

  useEffect(() => {
    if (id) dispatch(fetchMovieById(id))
    return () => { dispatch(clearSelected()) }
  }, [id, dispatch])

  if (!movie) return <p>Загрузка...</p>

  return (
    <div>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p><b>Год:</b> {movie.Year}</p>
      <p><b>Жанр:</b> {movie.Genre}</p>
      <p><b>Длительность:</b> {movie.Runtime}</p>
      <p><b>Режиссёр:</b> {movie.Director}</p>
      <p><b>Актёры:</b> {movie.Actors}</p>
      <p><b>Рейтинг:</b> {movie.imdbRating}</p>
      <button onClick={() => dispatch(addFavorite(movie))}>Добавить в избранное</button>
    </div>
  )
}
