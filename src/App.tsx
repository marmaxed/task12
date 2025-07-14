import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import { store } from './store'
import Search from './Search'
import MovieDetail from './MovieDetail'
import Favorites from './Favorites'

const router = createBrowserRouter([
  { path: '/', element: <Search /> },
  { path: '/movie/:id', element: <MovieDetail /> },
  { path: '/favorites', element: <Favorites /> },
])

export default function App() {
  return (
    <Provider store={store}>
      <nav style={{ marginBottom: 16 }}>
        <Link to="/">Поиск</Link> | <Link to="/favorites">Избранное</Link>
      </nav>
      <RouterProvider router={router} />
    </Provider>
  )
}