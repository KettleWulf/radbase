import { useQuery } from "@tanstack/react-query";
import { getMoviesByCategory, type Category } from "../services/tmdb.services";

export const useMoviesByCategory = (category: Category) => {
	return useQuery({
		queryKey: ["category", category],
		queryFn: () => getMoviesByCategory(category),
	});
}