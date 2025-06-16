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

export interface MovieDetails extends Omit<Movie, "genre_ids"> {
	genres: Genre[];
	runtime: number;
	status: string;
	tagline: string;
	homepage: string | null;
	imdb_id: string | null;
}

export interface GenreResponse {
	genres: Genre[];
}

export interface Genre {
	id: number;
	name: string;
}

export interface CastResponse {
	id: number;
	cast: CastMember[];
};


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

export interface ActorDetailsWithMovies {
	id: number;
	name: string;
	birthday: string | null;
	deathday: string | null;
	biography: string;
	place_of_birth: string | null;
	profile_path: string | null;
	known_for_department: string;
	also_known_as: string[];
	popularity: number;
	imdb_id: string | null;
	homepage: string | null;

	movie_credits: MovieCredits;
}

export interface MovieCredits {
	cast: MovieCreditItem[];
}

export interface MovieCreditItem extends Omit<Movie, "overview"> {
	id: number;
	title: string;
	original_title: string;
	release_date: string;
	character?: string;
	poster_path: string | null;
	vote_average: number;
	vote_count: number;
	genre_ids: number[];
	adult: boolean;
	order: number;
}
