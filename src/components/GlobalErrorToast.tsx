import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const GlobalErrorToast = () => {
	const queryClient = useQueryClient();
	const errorShown = useRef(false);
	console.log("Error 1")

	useEffect(() => {
		const queries = queryClient.getQueryCache().findAll();
		const erroredQuery = queries.find(q => q.state.status === "error");
		console.log("Error 2")

		if (erroredQuery && !errorShown.current) {
			toast.error("We are currently excperiencing issues.");
			errorShown.current = true;

			setTimeout(() => (errorShown.current = false), 5000);
			console.log("Error 3")
		}
	}, [queryClient]);
	console.log("Error 4")

	return null;
};

export default GlobalErrorToast;