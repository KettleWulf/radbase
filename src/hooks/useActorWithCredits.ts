import { useQuery } from "@tanstack/react-query";
import { getActorWithMovies } from "../services/tmdb.services";


export const useActorWithMovies = (actorId: number) => {
	return useQuery({
		queryKey: ["actor", actorId],
		queryFn: () => getActorWithMovies(actorId),
	});
}