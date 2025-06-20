import { useParams } from "react-router";
import { useMoviesByGenre } from "../hooks/useMoviesByGenre";
import { Alert, Row } from "react-bootstrap";
import { useGenres } from "../hooks/useGenres";
import MoveListCard from "../components/MoveListCard";
import { motion } from "framer-motion";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import { BeatLoader } from "react-spinners";
import { useSwipeable } from "react-swipeable";

const GenrePage = () => {
	const { id } = useParams();
	const genreId = Number(id);

	const genres = useGenres();
	console.log("genres", genres);

	const { page, handlePageChange } = usePagination();

	const { data, isLoading, isError, error } = useMoviesByGenre(genreId, page);

	const genreName =
		genres.find((genre) => genre.id === genreId)?.name ??
		"Genre name not found";

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => {
			if (data && page < data.total_pages) handlePageChange(page + 1);
		},
		onSwipedRight: () => {
			if (page > 1) handlePageChange(page - 1);
		},
		trackTouch: true,
		preventScrollOnSwipe: true,
	});

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<BeatLoader color="#534bb3" loading={isLoading} speedMultiplier={1} />
			</div>
		);
	}

	if (isError || !data) {
		return (
			<Alert variant="danger" className="mt-5 text-center">
				{error ? error.message : "Uknown error"}
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
			key={page}
			drag="x"
			dragElastic={0.2}
			dragConstraints={{ left: 0, right: 0 }}
			whileDrag={{ scale: 0.98, opacity: 0.95 }}
			{...swipeHandlers}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
		>
			<div className="container mt-4">
				<title>{`RADb | ${genreName}`}</title>
				<h2 className="mb-4 text-capitalize">{genreName}</h2>

				<small className="text-muted ms-1 mb-2">
					Showing page {page} of {data.total_pages}
				</small>
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
