import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies, type Timeframe } from "../services/tmdb.services";


export const useTrendingMovies = (timeframe: Timeframe) => {
	return useQuery({
		queryKey: ["trending", timeframe],
		queryFn: () => getTrendingMovies(timeframe),
		placeholderData: (prev) => prev,
	});
}