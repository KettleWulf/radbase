import { useNavigate, useParams } from "react-router";
import { useMovie } from "../hooks/useMovie";
import { useCredits } from "../hooks/useCredits";
import { Alert, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { useEffect } from "react";
import { useRecommendedMovies } from "../hooks/useRecommendedMovies";
import MovieSwiper from "../components/MovieSwiper/MovieSwiper";
import LoadingSpinner from "../components/spinners/LoadingSpinner";

const MovieDetailsPage = () => {
	const { id } = useParams();
	const movieId = Number(id);
	const navigate = useNavigate();

	const { data: movie, isError, isLoading } = useMovie(movieId);
	const {data: recommended } = useRecommendedMovies(movieId);
	const { data: credits } = useCredits(movieId);

	useEffect(() => {
		if (movie) {
			const existing = JSON.parse(localStorage.getItem("recentMovies") || "[]") as number[];
			const updated = [movie.id, ...existing.filter((id) => id !== movie.id)].slice(0, 10);
			localStorage.setItem("recentMovies", JSON.stringify(updated));
		}
	}, [movie]);

	if (isLoading) return <LoadingSpinner isLoading />

	if (isError || !movie) {
		return (
			<Alert variant="danger" className="mt-5 text-center">
				404 movie details not found.
			</Alert>
		);
	}

	return (
		<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.6 }}
		>
		<div className="container mt-5 rating-badge-wrapper">
			<title>{`RADb | ${movie.title}`}</title>

			<div className="row">
				<div className="col-md-4 mb-4">
					<img
						src={
							movie.poster_path
								? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
								: "/images/placeholder-big.png"
						}
						alt={movie.title}
						className="img-fluid rounded shadow"
					/>
				</div>

				<div className="col-md-8 d-flex flex-column justify-content-between">
					<div>
						<h2>{movie.title}</h2>
						{movie.tagline && <p className="text-muted fst-italic">"{movie.tagline}"</p>}
						<div className="mb-2">
							<Badge bg="dark" className="me-2">
								⭐ {movie.vote_average.toFixed(1)}
							</Badge>
							<Badge bg="secondary" className="me-2">
								{movie.runtime} min
							</Badge>
							<Badge bg="secondary">{movie.release_date}</Badge>
						</div>
						{movie.genres && (
							<div className="mb-2">
								{movie.genres.map((genre) => (
									<Badge bg="light" text="dark" className="me-2" key={genre.id}>
										{genre.name}
									</Badge>
								))}
							</div>
						)}
						{/* <div className="rating-badge" title={`# votes ${movie.vote_count}`}>
							{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
						</div> */}
						<p className="mt-3">{movie.overview || "Description not yet available."}</p>
					</div>

					<div>
						{credits && (
							<>
								<h5>Cast:</h5>
								<div className="position-relative">
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
																: "/images/placeholder-big.png"
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
									<div className="swiper-fade-left"></div>
									<div className="swiper-fade-right"></div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			{recommended && (
				
				<div className="row">
					<hr className="my-3 mx-auto border w-75"/>
					<h6>Others liked:</h6>
					<div>
						<MovieSwiper isSmall movies={recommended.results}/>

					</div>
				</div>
			)}
		</div>
		</motion.div>
	);
};

export default MovieDetailsPage;