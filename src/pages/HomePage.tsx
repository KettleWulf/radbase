import { Container, Image } from "react-bootstrap"
import { useMoviesByCategory } from "../hooks/useMoviesByCategory"
import MovieSwiper from "../components/MovieSwiper/MovieSwiper";

const HomePage = () => {

	const {data: now_playing} = useMoviesByCategory("now_playing");
	const {data: popular } = useMoviesByCategory("popular");
	const {data: top_rated } = useMoviesByCategory("top_rated");




  return (
	<Container className="mt-4">
		<title>RADb | Reel Archive Data Base</title>
		<h1 className="visually-hidden">HomePage</h1>
		<div className="d-flex justify-content-center mt-5">
			<Image
				src="/images/RADb-logo.png"
				alt="Reel Movie Archive Data Base-logo"
				className="shadow bg-white bg-opacity-10 rounded border-0"
			/>
		</div>



		{now_playing && popular && top_rated && 
		<>

			<hr className="my-5 mx-auto border w-75"/>
			<h6>Now Playing:</h6>
			<MovieSwiper movies={now_playing.results}/>


			<hr className="my-5 mx-auto border w-75"/>
			<h6>Top Rated:</h6>
			<MovieSwiper movies={top_rated.results}/>


			<hr className="my-5 mx-auto border w-75"/>
			<h6>Popular:</h6>
			<MovieSwiper movies={popular.results}/>

		</>}

	</Container>
  )
}

export default HomePage