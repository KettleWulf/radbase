import { useParams } from "react-router";
import { useMoviesByGenre } from "../hooks/useMoviesByGenre";
import { Card, Spinner, Alert } from "react-bootstrap";
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

	const genreName = genres.find((genre) => genre.id === genreId)?.name ?? "Okänd genre";



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
			<h2 className="mb-4 text-capitalize">{genreName ? genreName : "Unknown Genre"}</h2>
			<div className="row">
				{data.results.map((movie) => (
					<div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
						<Card className="h-100">
							<Card.Img
								variant="top"
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
										: "https://via.placeholder.com/500x750?text=Ingen+bild"
								}
								alt={movie.title}
							/>
							<Card.Body className="d-flex flex-column">
								<Card.Title>{movie.title}</Card.Title>
								<Card.Text>
									{movie.overview
										? movie.overview.slice(0, 100) + "..."
										: "Ingen beskrivning tillgänglig."}
								</Card.Text>
								<small className="text-muted mt-auto">Släppt: {movie.release_date}</small>
							</Card.Body>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
};

export default GenrePage;