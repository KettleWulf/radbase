import api from "../lib/api"
import type { Genre, GenreResponse } from "./tmdb.types";

export const getGenres = async (): Promise<Genre[]> => {
	const res = await api.get<GenreResponse>("/genre/movie/list");
	return res.data.genres
}