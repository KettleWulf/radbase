import { Link, useParams } from "react-router";
import { useMoviesByGenre } from "../hooks/useMoviesByGenre";
import { Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import { useGenres } from "../hooks/useGenres";


const GenrePage = () => {
	const { id } = useParams();
	const genreId = Number(id);
	
	const genres  = useGenres();
	console.log("genres", genres);

	const {
		data,
		isLoading,
		isError,
	} = useMoviesByGenre(genreId);

	const genreName = genres.find((genre) => genre.id === genreId)?.name ?? "Genre name not found";



	console.log(data);

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	if (isError || !data) {
		return (
			<Alert variant="danger" className="mt-5 text-center">
				Något gick fel vid hämtning av filmer.
			</Alert>
		);
	}

	if (data.results.length === 0) {
		return (
			<Alert variant="danger" className="mt-5 text-center">
				Oops! Here be no movies...
			</Alert>
		);
	}

	return (
		<div className="container mt-4">
			<h2 className="mb-4 text-capitalize">{genreName}</h2>
			
			<Row xs={2} sm={2} md={4} xl={5} className="g-4">
				{data.results.map((movie) => (
					<Col key={movie.id}>
						<div className="rating-badge-wrapper card-wrapper h-100">
							<Card
								as={Link}
								to={`/movie/${movie.id}`}
								className="h-100 text-decoration-none text-dark"
							>
								<div className="card-image-wrapper">
									<Card.Img
										variant="top"
										src={
											movie.poster_path
												? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
												: "https://via.placeholder.com/500x750?text=Ingen+bild"
										}
										alt={movie.title}
									/>
								</div>
								<Card.Body className="d-flex flex-column">
									<Card.Title className="card-title-clamp" title={movie.title}>
										{movie.title}
									</Card.Title>
									<small className="text-muted mt-auto d-block">
										Released: {movie.release_date}
									</small>
								</Card.Body>
							</Card>

							<div className="rating-badge" title={`# votes ${movie.vote_count}`}>
								{movie.vote_average.toFixed(1)}
							</div>
						</div>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default GenrePage;