import { useParams } from "react-router";
import { useMoviesByGenre } from "../hooks/useMoviesByGenre";
import { Spinner, Alert, Row, } from "react-bootstrap";
import { useGenres } from "../hooks/useGenres";
import MoveListCard from "../components/MoveListCard";



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
			<title>{`RADb | ${genreName}`}</title>
			<h2 className="mb-4 text-capitalize">{genreName}</h2>
			
			<Row xs={2} sm={2} md={4} xl={5} className="g-4">
				{data.results.map((movie) => (
					<MoveListCard key={movie.id} movie={movie} />
				))}
			</Row>
		</div>
	);
};

export default GenrePage;