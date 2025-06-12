import { useContext } from "react"
import { GenreContext } from "../contexts/GenreContext"

export const useGenres = () => {
	const context = useContext(GenreContext);
	if (!context) throw new Error("useGenres must be used within GenreContextProvider");
	return context
}