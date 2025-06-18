import { useQuery } from "@tanstack/react-query";
import { getRecommendedMoviesById } from "../services/tmdb.services";


export const useRecommendedMovies = (movieId: number) => {
	return useQuery({
		queryKey: ["recommended", movieId],
		queryFn: () => getRecommendedMoviesById(movieId),
	});
}