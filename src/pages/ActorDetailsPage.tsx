import { useNavigate, useParams } from "react-router";
import { Spinner, Alert, Badge } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import { useActorWithMovies } from "../hooks/useActorWithCredits";
import { sortByRoleHierarchy } from "../utils/sortByRoleHierarchy";

const ActorDetailsPage = () => {
	const { id } = useParams();
	const actorId = Number(id);
	const navigate = useNavigate();

	const { data: actor, isError, isLoading } = useActorWithMovies(actorId);

	const truncateBySentences = (text: string, maxSentences: number): string => {
		const sentences = text.split(/(?<=[.!?])\s+/);
		if (sentences.length <= maxSentences) return sentences.slice(0, 1).join(" ") + " Stay posted for more details on your favourite actors or, even better, contribute (!) by transferring 500 USD to Kettle.INC (a, pretty much, non profit-organisation who would never scam you for your money).";
		return sentences.slice(0, maxSentences).join(" ");
	}

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	if (isError || !actor) {
		return (
			<Alert variant="danger" className="mt-5 text-center">
				404 movie details not found.
			</Alert>
		);
	}

	return (
		<div className="container mt-5">
			<title>{`RADb | ${actor.name}`}</title>

			<div className="row">
				<div className="col-md-4 mb-4">
					<img
						src={
							actor.profile_path
								? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
								: "/images/placeholder-big.png"
						}
						alt={actor.name}
						className="img-fluid rounded shadow"
					/>
				</div>

				<div className="col-md-8 d-flex flex-column justify-content-between">
					<div>
						<h2>{actor.name}</h2>
						{/* {actor.biography && <p className="text-muted fst-italic">"{movie.tagline}"</p>} */}
						<div className="mb-3">
							<Badge bg="secondary" className="me-2">
								{actor.place_of_birth}
							</Badge>
							<Badge bg="info" className="me-2">
								{actor.birthday}
							</Badge>
							<Badge bg="dark">{actor.known_for_department}</Badge>
						</div>
						<p className="mb-5"><em>{truncateBySentences(actor.biography, 3) || "Biography not yet available."}</em></p>
					</div>

					<div>
						{actor.movie_credits && (
							<>
								<h5 className="mt-5">Known for:</h5>
								<Swiper
									slidesPerView="auto"
									spaceBetween={10}
									freeMode={true}
									navigation={true}
									modules={[FreeMode, Navigation]}
									className="mySwiper py-2"
								>
									{sortByRoleHierarchy(actor.movie_credits.cast).map((movie) => (
										<SwiperSlide
											key={movie.id}
											style={{ width: 120, cursor: "pointer" }}
											onClick={() => navigate(`/movie/${movie.id}`)}
										>
											<div className="text-center">
												<img
													src={
														movie.poster_path
															? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
															: "/images/placeholder-big.png"
													}
													alt={movie.title}
													className="img-fluid rounded mb-1 shadow-sm"
												/>
												<small className="fw-bold d-block">{movie.title}</small>
												<small className="text-muted">{movie.character}</small>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActorDetailsPage;