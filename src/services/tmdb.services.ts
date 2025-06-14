import api from "../lib/api"
import { type PaginatedResponse, type Genre, type GenreResponse, type Movie, type MovieDetails } from "./tmdb.types";

export const getGenres = async (): Promise<Genre[]> => {
	const res = await api.get<GenreResponse>("/genre/movie/list");
	return res.data.genres
}

export const getMoviesByGenre = async (genreId: number, page: number) => {
	const res = await api.get<PaginatedResponse<Movie>>("/discover/movie", {
		params: {
			with_genres: genreId,
			page,
			include_adult: false,
			region: "US",
		}
	});
	return res.data;
}

export const getMovieById = async (movieId: number) => {
	const res = await api.get<MovieDetails>("/movie/" + movieId);
	return res.data
}