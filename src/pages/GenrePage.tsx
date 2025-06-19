import { useParams } from "react-router";
import { useMoviesByGenre } from "../hooks/useMoviesByGenre";
import { Spinner, Alert, Row, } from "react-bootstrap";
import { useGenres } from "../hooks/useGenres";
import MoveListCard from "../components/MoveListCard";
import { motion } from "framer-motion";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";



const GenrePage = () => {
	const { id } = useParams();
	const genreId = Number(id);
	
	const genres  = useGenres();
	console.log("genres", genres);

	const { page, handlePageChange} = usePagination()
	
	const {
		data,
		isLoading,
		isError,
	} = useMoviesByGenre(genreId, page);


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
		<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.6 }}
		>
			<div className="container mt-4" >
				<title>{`RADb | ${genreName}`}</title>
				<h2 className="mb-4 text-capitalize">{genreName}</h2>

					<Row xs={2} sm={2} md={4} xl={5} className="g-4 position-relative">
						{data.results.map((movie) => (
							<MoveListCard key={movie.id} movie={movie} />
						))}

						<Pagination
						page={page}
						totalPages={data.total_pages}
						onPageChange={handlePageChange}
						/>
					</Row>
			</div>
		</motion.div>
	);
};

export default GenrePage;