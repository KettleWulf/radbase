import { useQuery } from "@tanstack/react-query";
import { getMoviesByQuery } from "../services/tmdb.services";


export const useSearchMovies = (query: string, page = 1) => {
	return useQuery({
		queryKey: [query, page],
		queryFn: () => getMoviesByQuery(query, page),
	});
}