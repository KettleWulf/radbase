import { Route, Routes, useLocation } from "react-router";
import GenrePage from "./pages/GenrePage";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ActorDetailsPage from "./pages/ActorDetailsPage";
import Navigation from "./components/Navigation";
import "swiper/swiper-bundle.css";
import RecentMoviesToggle from "./components/RecentMovieToggle";
import SearchPage from "./pages/SearchPage";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";
import GlobalFetchingSpinner from "./components/spinners/GlobalFetchingSpinner";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GlobalErrorToast from "./components/GlobalErrorToast";

function App() {
	const location = useLocation();

	return (
		<div id="app">
			<Navigation />
			<GlobalFetchingSpinner />
			<RecentMoviesToggle />
			<GlobalErrorToast />

			<main>
				<AnimatePresence mode="wait">
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={<HomePage />} />
						<Route path="/genre/:id" element={<GenrePage />} />
						<Route path="/movie/:id" element={<MovieDetailsPage />} />
						<Route path="/actor/:id" element={<ActorDetailsPage />} />
						<Route path="/search" element={<SearchPage />} />

						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</AnimatePresence>
			</main>

			<Footer />
			<ToastContainer position="top-center" autoClose={4000} />
		</div>
	);
}

export default App;
