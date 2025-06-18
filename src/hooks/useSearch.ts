import { useLocation, useNavigate} from "react-router";

export const useSearch = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const query = new URLSearchParams(location.search).get("q") || "";

	const handleSearch = (query: string) => {
	navigate(`/search?q=${encodeURIComponent(query.trim())}`);
	};

	return { query, handleSearch };
};