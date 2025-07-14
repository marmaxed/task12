import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_KEY = '64405bd2'

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (query: string) => {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
  const data = await res.json()
  return data.Search || []
})

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id: string) => {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
  return await res.json()
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState: { list: [] as any[], loading: false, selected: null as any },
  reducers: {
    clearSelected(state) { state.selected = null }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, (state) => { state.loading = true })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.selected = action.payload
      })
  }
})

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as any[],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.find(m => m.imdbID === action.payload.imdbID)) state.push(action.payload)
    },
    removeFavorite: (state, action) => state.filter(m => m.imdbID !== action.payload)
  }
})

export const { clearSelected } = moviesSlice.actions
export const { addFavorite, removeFavorite } = favoritesSlice.actions

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    favorites: favoritesSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch