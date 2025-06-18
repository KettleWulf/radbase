import { useSearchParams } from "react-router";

export const usePagination = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;


	const handlePageChange = (newPage: number) => {
		setSearchParams({ page: newPage.toString() });
	};


	return { page, handlePageChange };
};  