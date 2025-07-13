import React from "react";
import { BeatLoader } from "react-spinners";

interface LoadingSpinnerProps {
	isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
	return (
		<div className="d-flex justify-content-center mt-5">
			<BeatLoader 
				color="#534bb3" 
				loading={isLoading}
				speedMultiplier={1}
			/>
		</div>
	);
};

export default LoadingSpinner;
