import { useQuery } from "@tanstack/react-query";
import { GenreContext } from "./GenreContext";
import { getGenres } from "../services/tmdb.services";

interface GenreContextProviderProps {
	children: React.ReactNode;
}

export const GenreContextProvider: React.FC<GenreContextProviderProps> = ({ children }) => {

	const { data = [] } = useQuery({
		queryKey: ["genres"],
		queryFn: getGenres,
		staleTime: 1000 * 60 * 60 * 24,
	})

	return (
		<GenreContext.Provider value={data}>
			{children}
		</GenreContext.Provider>
	);
};	