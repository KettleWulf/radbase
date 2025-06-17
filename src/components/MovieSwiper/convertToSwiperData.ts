import type { MovieSwiperData } from "./MovieSwiper.types";
import type { Movie, MovieCreditItem, MovieDetails } from "../../services/tmdb.types";

export const convertToSwiperData = (input: Movie[] | MovieCreditItem[] | MovieDetails[]): MovieSwiperData[] => {
	return [...input].map((item) => ({
		id: item.id,
		title: item.title,
		poster_path: item.poster_path,
		vote_average: item.vote_average,
		character: "character" in item ? item.character : undefined,
	}));
};