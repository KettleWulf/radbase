import api from "../lib/api"
import { type PaginatedResponse, type Genre, type GenreResponse, type Movie } from "./tmdb.types";

export const getGenres = async (): Promise<Genre[]> => {
	const res = await api.get<GenreResponse>("/genre/movie/list");
	return res.data.genres
}

export const getMoviesByGenre = async (genreId: number, page = 1) => {
	const res = await api.get<PaginatedResponse<Movie>>("/discover/movie", {
		params: {
			with_genres: genreId,
			page,
			include_adult: false,
		}
	});
	return res.data;
}