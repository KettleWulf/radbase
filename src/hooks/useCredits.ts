import { useQuery } from "@tanstack/react-query";
import { getCastByMovieId } from "../services/tmdb.services";


export const useCredits = (movieId: number) => {
	return useQuery({
		queryKey: ["credits", movieId],
		queryFn: () => getCastByMovieId(movieId),
	});
}