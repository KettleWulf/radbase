import { Route, Routes } from 'react-router'
import './App.css'
import GenrePage from './pages/GenrePage'
import HomePage from './pages/HomePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import ActorDetailsPage from './pages/ActorDetailsPage'
import Navigation from './components/Navigation'

function App() {
	return (
		<div id="app">
			<Navigation />
			
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/genre/:id" element={<GenrePage />} />
				<Route path="/movie/:id" element={<MovieDetailsPage />} />
				<Route path="/actor/:id" element={<ActorDetailsPage />} />

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
		
	)
}

export default App
