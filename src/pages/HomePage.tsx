import { Container } from "react-bootstrap";
import { useMoviesByCategory } from "../hooks/useMoviesByCategory";
import MovieSwiper from "../components/MovieSwiper/MovieSwiper";
import HeroSlider from "../components/HeroSlider";
import { motion } from "framer-motion";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { useEffect, useState } from "react";
import type { Timeframe } from "../services/tmdb.services";
import { useSearchParams } from "react-router";
import TimeframeToggle from "../components/TimeframeToggle";

const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialTimeframe =
		(searchParams.get("timeframe") as Timeframe) || "week";
	const [timeframe, setTimeframe] = useState<Timeframe>(initialTimeframe);

	useEffect(() => {
		const current = searchParams.get("timeframe");
		if (current !== timeframe) {
			const updatedParams = new URLSearchParams(searchParams);
			updatedParams.set("timeframe", timeframe);
			setSearchParams(updatedParams);
		}
	}, [searchParams, setSearchParams, timeframe]);

	const { data: now_playing } = useMoviesByCategory("now_playing");
	const { data: popular } = useMoviesByCategory("popular");
	const { data: top_rated } = useMoviesByCategory("top_rated");
	const { data: trending } = useTrendingMovies(timeframe);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
		>
			{trending && (
				<div className="mt-2">
					<div className="d-flex justify-content-center">
						<TimeframeToggle timeframe={timeframe} onToggle={setTimeframe} />
					</div>
					<motion.div
						key={timeframe}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6 }}
					>
						<MovieSwiper isBig movies={trending.results} />
					</motion.div>
				</div>
			)}
			{now_playing && now_playing.results.length > 0 && (
				<HeroSlider movies={now_playing.results.slice(0, 5)} />
			)}
			<Container>
				<title>RADb | Reel Archive Data Base</title>
				<h1 className="visually-hidden">HomePage</h1>

				{now_playing && popular && top_rated && (
					<>
						<hr className="my-4 mx-auto border w-75" />
						<h6>Now Playing:</h6>
						<MovieSwiper movies={now_playing.results} />
						<hr className="my-4 mx-auto border w-75" />
						<h6>Top Rated:</h6>
						<MovieSwiper movies={top_rated.results} />
						<hr className="my-4 mx-auto border w-75" />
						<h6>Popular:</h6>
						<MovieSwiper movies={popular.results} />
						<hr className="my-4 mx-auto border w-75" />
					</>
				)}
			</Container>
		</motion.div>
	);
};

export default HomePage;
