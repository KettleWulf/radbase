import { useState, useEffect } from "react";
import { useRecentMovies } from "../hooks/useRecentMovies";
import MovieSwiper from "./MovieSwiper/MovieSwiper";
import { useLocation } from "react-router";
import { convertToSwiperData } from "./MovieSwiper/convertToSwiperData";
import type { MovieDetails } from "../services/tmdb.types";

const RecentMoviesToggle = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { movies, isLoading, isError } = useRecentMovies();
	const location = useLocation();

	useEffect(() => {
		setIsOpen(false);
	}, [location.pathname]);

	return (
		<div className="position-relative">
			<button
				className="btn btn-sm btn-light position-absolute recent-toggle-button z-index-3"
				style={{
					right: "3rem",
				}}
				onClick={() => setIsOpen(!isOpen)}
			>
				Last Visited <span>{isOpen ? "▲" : "▼"}</span>
			</button>

			{isOpen && (
				<div
					className="border-top border-light p-2 bg-white position-absolute top-100 end-0 w-50 shadow fade-in rounded"
					style={{ zIndex: 1 }}
				>
					{isLoading && <p className="text-muted px-3">Loading...</p>}
					{isError && <p className="text-danger px-3">Something went wrong.</p>}
					{movies && (
						<MovieSwiper movies={convertToSwiperData(movies as MovieDetails[])} />
					)}
				</div>
			)}
		</div>
	);
};

export default RecentMoviesToggle;