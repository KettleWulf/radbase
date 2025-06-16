import type { MovieCreditItem } from "../services/tmdb.types";

export const sortByRoleHierarchy = (creditArray: MovieCreditItem[]) => {
	return [... creditArray].sort((a, b) => b.vote_average - a.vote_average);
}