import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { useNavigate } from "react-router";
import { sortMoviesByPopularity } from "../../utils/sortMoviesByPopularity";
import type { MovieSwiperData } from "./MovieSwiper.types";


interface MovieSwiperProps {
	movies: MovieSwiperData[];
} 

const MovieSwiper: React.FC<MovieSwiperProps> = ({ movies }) => {
	const navigate = useNavigate();

	return (
		<div className="position-relative">
			<Swiper
				slidesPerView="auto"
				spaceBetween={10}
				freeMode={true}
				navigation={true}
				modules={[FreeMode, Navigation]}
				className="mySwiper py-2"
			>
				{sortMoviesByPopularity(movies).map((movie) => (
					<SwiperSlide
						key={movie.id}
						style={{ width: 120, cursor: "pointer" }}
						onClick={() => navigate(`/movie/${movie.id}`)}
					>
						<div className="text-center">
							<img
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
										: "/images/placeholder-big.png"
								}
								alt={movie.title}
								className="img-fluid rounded mb-1 shadow-sm"
							/>
							<small className="fw-bold d-block">{movie.title}</small>
							{movie.character && <small className="text-muted">{movie.character}</small>}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className="swiper-fade-left"></div>
			<div className="swiper-fade-right"></div>
		</div>
	)
}

export default MovieSwiper