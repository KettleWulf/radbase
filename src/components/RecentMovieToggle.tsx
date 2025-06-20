import { useState, useEffect, useRef } from "react";
import { useRecentMovies } from "../hooks/useRecentMovies";
import MovieSwiper from "./MovieSwiper/MovieSwiper";
import { useLocation } from "react-router";
import { convertToSwiperData } from "./MovieSwiper/convertToSwiperData";
import type { MovieDetails } from "../services/tmdb.types";

const RecentMoviesToggle = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { movies, isLoading, isError } = useRecentMovies();
	const location = useLocation();

	const toggleRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		setIsOpen(false);
	}, [location.pathname]);

	return (
		<div ref={toggleRef}>
			{movies.length > 0 && <div className="position-relative">
				<button
					className="btn btn-sm position-absolute shadow-lg recent-toggle-button z-index-3"
					style={{
						right: "3rem",
					}}
					onClick={() => setIsOpen(!isOpen)}
				>
					Last Visited <span>{isOpen ? "▲" : "▼"}</span>
				</button>

				{isOpen && (
					<div
						className="border-top position-absolute top-100 end-0 shadow fade-in rounded z-index-2 w-50 recent-toggle-dropdown"
					>
						{isLoading && <p className="text-muted px-3">Loading...</p>}
						{isError && <p className="text-danger px-3">Something went wrong.</p>}
						{movies && (
							<MovieSwiper isSmall movies={convertToSwiperData(movies as MovieDetails[])} />
						)}
					</div>
				)}
			</div>}
		</div>
	);
};

export default RecentMoviesToggle;