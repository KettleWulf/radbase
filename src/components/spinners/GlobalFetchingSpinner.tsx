import { useIsFetching } from "@tanstack/react-query";
import { BarLoader } from "react-spinners";

const GlobalFetchingSpinner = () => {
	const isFetching = useIsFetching();



	return (
		<div id="global-spinner">
			<BarLoader
				color="#602578"
				loading={!!isFetching}
				width={"100%"}
				height={2}
				speedMultiplier={3}
			/>
		</div>
	)
}

export default GlobalFetchingSpinner;
