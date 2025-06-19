import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Movie } from "../services/tmdb.types";


interface HeroSliderProps {
	movies: Movie[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ movies }) => {
	return (
		<div className="hero-slider-wrapper">
			<Swiper
				modules={[Autoplay, EffectFade]}
				effect="fade"
				loop
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				slidesPerView={1}
				className="hero-swiper"
			>
				{movies.map((movie) => (
					<SwiperSlide key={movie.id}>
						<div
							className="hero-slide"
							style={{
								backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
							}}
						>
							<div className="hero-overlay">
								<img
									src="/images/RADb-logo.png"
									alt="RADb logo"
									className="hero-logo"
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default HeroSlider;
