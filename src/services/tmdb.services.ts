import api from "../lib/api"
import { type PaginatedResponse, type Genre, type GenreResponse, type Movie, type MovieDetails, type CastResponse, type ActorDetailsWithMovies } from "./tmdb.types";

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
			sort_by: "popularity.desc",
		}
	});
	return res.data;
}

export const getMovieById = async (movieId: number) => {
	const res = await api.get<MovieDetails>("/movie/" + movieId);
	return res.data
}

export const getMoviesByQuery = async (query: string, page: number) => {
	const res = await api.get<PaginatedResponse<Movie>>("/search/movie", {
		params: {
			query,
			page,
			include_adult: false,
			region: "US",
		}
	});
	return res.data;
}

export const getCastByMovieId = async (movieId: number) => {
	const res = await api.get<CastResponse>(`/movie/${movieId}/credits`);
	return res.data
}

export const getActorWithMovies = async (actorId: number) => {
	const res = await api.get<ActorDetailsWithMovies>("/person/" + actorId, {
		params: {
			append_to_response: "movie_credits",
		}
	});
	return res.data
}