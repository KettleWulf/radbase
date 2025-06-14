import { useNavigate, useParams } from "react-router";
import { useMovie } from "../hooks/useMovie";
import { Spinner, Alert, Badge } from "react-bootstrap";

const MovieDetailsPage = () => {
	const { id } = useParams();
	const movieId = Number(id);
	const navigate = useNavigate();

	const { data: movie, isError, isLoading } = useMovie(movieId);

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
		<div className="container mt-5">
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
						<Badge bg="dark">
							{movie.release_date}
						</Badge>
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

					<p>{movie.overview || "Description not yet available."}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieDetailsPage;