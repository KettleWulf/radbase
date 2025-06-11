export interface PaginatedResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface Movie {
	id: number;
	title: string;
	overview: string;
	release_date: string;
	poster_path: string | null;
	backdrop_path: string | null;
	vote_average: number;
	vote_count: number;
	genre_ids: number[];
	adult: boolean;
	original_language: string;
	original_title: string;
	popularity: number;
	video: boolean;
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
	genres: Genre[];
	runtime: number;
	status: string;
	tagline: string;
	homepage: string | null;
	imdb_id: string | null;
}

export interface Genre {
	id: number;
	name: string;
}

export interface CastMember {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}