

export const sortMoviesByPopularity = <T extends { vote_average: number }>(movies: T[]): T[] => {
	return [... movies].sort((a, b) => b.vote_average - a.vote_average);
}