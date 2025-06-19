import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre } from "../services/tmdb.services";


export const useMoviesByGenre = (genreId: number, page: number) => {
	return useQuery({
		queryKey: [genreId, page],
		queryFn: () => getMoviesByGenre(genreId, page),
	});
}