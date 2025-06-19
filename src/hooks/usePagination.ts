import { useSearchParams } from "react-router";

export const usePagination = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;

	const handlePageChange = (newPage: number) => {
		
		const newParams = new URLSearchParams(searchParams);
		newParams.set("page", newPage.toString());
		setSearchParams(newParams);
	};

	return { page, handlePageChange };
};