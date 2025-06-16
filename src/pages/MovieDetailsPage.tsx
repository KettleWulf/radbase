import { useNavigate, useParams } from "react-router";
import { useMovie } from "../hooks/useMovie";
import { useCredits } from "../hooks/useCredits";
import { Spinner, Alert, Badge } from "react-bootstrap";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { useEffect } from "react";

const MovieDetailsPage = () => {
	const { id } = useParams();
	const movieId = Number(id);
	const navigate = useNavigate();

	const { data: movie, isError, isLoading } = useMovie(movieId);
	const { data: credits } = useCredits(movieId);

	useEffect(() => {
		if (movie) {
			const existing = JSON.parse(localStorage.getItem("recentMovies") || "[]") as number[];
			const updated = [movie.id, ...existing.filter((id) => id !== movie.id)].slice(0, 10);
			localStorage.setItem("recentMovies", JSON.stringify(updated));
		}
	}, [movie]);

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	if (isError || !movie) {
		return (
			<Alert variant="danger" className="mt-5 text-center">
				404 movie details not found.
			</Alert>
		);
	}

	return (
		<div className="container mt-5 rating-badge-wrapper">
			<title>{`KettleDB | ${movie.title}`}</title>

			<div className="row">
				<div className="col-md-4 mb-4">
					<img
						src={
							movie.poster_path
								? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
								: "https://via.placeholder.com/500x750?text=Ingen+bild"
						}
						alt={movie.title}
						className="img-fluid rounded shadow"
					/>
				</div>

				<div className="col-md-8">
					<h2>{movie.title}</h2>
					{movie.tagline && <p className="text-muted fst-italic">"{movie.tagline}"</p>}

					<div className="mb-3">
						<Badge bg="secondary" className="me-2">
							⭐ {movie.vote_average.toFixed(1)}
						</Badge>
						<Badge bg="info" className="me-2">
							{movie.runtime} min
						</Badge>
						<Badge bg="dark">{movie.release_date}</Badge>
					</div>

					{movie.genres && (
						<div className="mb-3">
							{movie.genres.map((genre) => (
								<Badge bg="light" text="dark" className="me-2" key={genre.id}>
									{genre.name}
								</Badge>
							))}
						</div>
					)}

					<div className="rating-badge" title={`# votes ${movie.vote_count}`}>
						{movie.vote_average.toFixed(1)}
					</div>

					<p className="mb-5">{movie.overview || "Description not yet available."}</p>

					{credits && (
						<>
							<h5 className="mt-5">Cast:</h5>
							<Swiper
								slidesPerView="auto"
								spaceBetween={10}
								freeMode={true}
								navigation={true}
								modules={[FreeMode, Navigation]}
								className="mySwiper py-2"
							>
								{credits.cast.slice(0, 20).map((actor) => (
									<SwiperSlide
										key={actor.id}
										style={{ width: 120, cursor: "pointer" }}
										onClick={() => navigate(`/actor/${actor.id}`)}
									>
										<div className="text-center">
											<img
												src={
													actor.profile_path
														? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
														: "https://via.placeholder.com/120x180?text=Ingen+bild"
												}
												alt={actor.name}
												className="img-fluid rounded mb-1 shadow-sm"
											/>
											<small className="fw-bold d-block">{actor.name}</small>
											<small className="text-muted">{actor.character}</small>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default MovieDetailsPage;