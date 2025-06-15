import { Card, Col } from "react-bootstrap"
import type { Movie } from "../services/tmdb.types"
import { Link } from "react-router"

interface MoveListCardProps {
	movie: Movie
}

const MoveListCard: React.FC<MoveListCardProps> = ({ movie }) => {
  return (
	<Col key={movie.id}>
			<div className="rating-badge-wrapper card-wrapper h-100">
				<Card
					as={Link}
					to={`/movie/${movie.id}`}
					className="h-100 text-decoration-none text-dark"
				>
					<div className="card-image-wrapper">
						<Card.Img
							variant="top"
							src={
								movie.poster_path
									? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
									: "https://via.placeholder.com/500x750?text=Ingen+bild"
							}
							alt={movie.title}
						/>
					</div>
					<Card.Body className="d-flex flex-column">
						<Card.Title className="card-title-clamp" title={movie.title}>
							{movie.title}
						</Card.Title>
						<small className="text-muted mt-auto d-block">
							Released: {movie.release_date}
						</small>
					</Card.Body>
				</Card>

				<div className="rating-badge" title={`# votes ${movie.vote_count}`}>
					{movie.vote_average.toFixed(1)}
				</div>
			</div>
		</Col>
  )
}

export default MoveListCard