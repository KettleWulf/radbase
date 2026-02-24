import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import GlobalErrorToast from "./components/GlobalErrorToast";
import { useSearch } from "./hooks/useSearch";
import SearchBar from "./components/SearchBar";
import SearchOverlay from "./components/searchOverlay";

function App() {
	const location = useLocation();
	const { query, handleSearch } = useSearch();

	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const openSearch = () => setIsSearchOpen(true);
	const closeSearch = () => setIsSearchOpen(false);

	const onSearchAndClose = (q: string) => {
		handleSearch(q);
		closeSearch();
	};

	useEffect(() => {
		if (!isSearchOpen) {
			document.body.style.overflow = "";
			document.body.style.paddingRight = "";
			return;
		}

		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = "hidden";
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		return () => {
			document.body.style.overflow = "";
			document.body.style.paddingRight = "";
		};
	}, [isSearchOpen]);

	useEffect(() => {
		closeSearch();

	}, [location.pathname]);

	return (
		<div id="app">
			<Navigation onOpenSearch={openSearch} />

			<GlobalFetchingSpinner />
			<RecentMoviesToggle />
			<GlobalErrorToast />

			<SearchOverlay open={isSearchOpen} onClose={closeSearch}>
				<SearchBar
					open={isSearchOpen}
					onClose={closeSearch}
					autoFocus
					onSearch={onSearchAndClose}
					currentQuery={query}
				/>
			</SearchOverlay>

			<main className="pt-2">
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