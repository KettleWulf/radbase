import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { motion, LayoutGroup } from "framer-motion";
import type { Timeframe } from "../services/tmdb.services";
import { useTheme } from "../hooks/useTheme";

interface TimeframeToggleProps {
	timeframe: Timeframe;
	onToggle: (newTimeframe: Timeframe) => void;
}

const labels: Record<Timeframe, string> = {
	day: "Today",
	week: "This Week",
};

const TimeframeToggle: React.FC<TimeframeToggleProps> = ({ timeframe, onToggle }) => {

	const { isDarkMode } = useTheme();

	return (
		<LayoutGroup>
			<ToggleButtonGroup
				type="radio"
				name="timeframe"
				value={timeframe}
				onChange={onToggle}
				className="rounded-pill overflow-hidden timeframe-toggle-group"
			>
				{(["day", "week"] as Timeframe[]).map((val) => (
					<ToggleButton
						key={val}
						id={`toggle-${val}`}
						variant={isDarkMode ? "dark" : "light"}
						value={val}
						className="position-relative fw-medium shadow-sm"
					>
						{timeframe === val && (
							<motion.div
								layoutId="pill-bg"
								className="position-absolute top-0 start-0 w-100 h-100 rounded-pill"
								style={{ zIndex: -1 }}
								transition={{ type: "spring", stiffness: 300, damping: 25 }}
							/>
						)}
						{labels[val]}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</LayoutGroup>
	);
};

export default TimeframeToggle;