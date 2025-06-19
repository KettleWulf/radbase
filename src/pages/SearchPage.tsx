
import { useSearchMovies } from "../hooks/useSearchMovies";
import { Alert, Row, Spinner } from "react-bootstrap";
import { useSearch } from "../hooks/useSearch";
import { usePagination } from "../hooks/usePagination";
import MoveListCard from "../components/MoveListCard";
import Pagination from "../components/Pagination";

const SearchPage = () => {

	const { page, handlePageChange } = usePagination();
	const { query } = useSearch();
	const { data, isLoading, isError } = useSearchMovies(query, page);

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
			<title>{`RADb | ${query}`}</title>
			{/* <h1 className="visually-hidden">Search Page</h1> */}
			<h2 className="mb-4 text-capitalize">Search</h2>
			
			<small className="text-muted ms-1 mb-2">Showing results for <em>"{query}"</em> - page {page} of {data.total_pages}</small>
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
  )
}

export default SearchPage