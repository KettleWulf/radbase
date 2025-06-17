import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/tmdb.services";
import { useLocation } from "react-router";

export const useRecentMovies = () => {
 	const [storedMovieIds, setStoredMovieIds] = useState<number[]>([]);
	const location = useLocation();

	useEffect(() => {
		const movieIds = JSON.parse(localStorage.getItem("recentMovies") || "[]") as number[];
		const filteredMovieIds = movieIds.filter((id): id is number => typeof id === "number");
		setStoredMovieIds(filteredMovieIds);
	}, [location.key])


	const movieQueries = useQueries({
		queries: storedMovieIds.map((id) => ({
			queryKey: ["recent", id],
			queryFn: () => getMovieById(id),
			enabled: storedMovieIds.length > 0
		})),
	});

	const movies = movieQueries
		.filter((q) => q.data)
		.map((q) => q.data);

	const isLoading = movieQueries.some((q) => q.isLoading);
	const isError = movieQueries.some((q) => q.isError);

	return { movies, isLoading, isError }
}