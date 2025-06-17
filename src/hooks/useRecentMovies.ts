import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/tmdb.services";

export const useRecentMovies = () => {
 	const [storedMovieIds, setStoredMovieIds] = useState<number[] | null>(null);

 	const movieIds = JSON.parse(localStorage.getItem("recentMovies") || "[]") as number[];

	const filteredMovieIds = movieIds.filter((id): id is number => typeof id === "number");
	localStorage.setItem("recentMovies", JSON.stringify(filteredMovieIds));

	useEffect(() => {
		setStoredMovieIds(filteredMovieIds)
	}, [filteredMovieIds])

	const movieQueries = useQueries({
		queries: movieIds.map((id) => ({
			queryKey: ["movie", id],
			queryFn: () => getMovieById(id),
			enabled: !!storedMovieIds,
		})),
	});

	const movies = movieQueries
		.filter((q) => q.data)
		.map((q) => q.data);

	const isLoading = movieQueries.some((q) => q.isLoading);
	const isError = movieQueries.some((q) => q.isError);

	return { movies, isLoading, isError }
}