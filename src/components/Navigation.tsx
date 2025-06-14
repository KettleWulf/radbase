import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";
import { useGenres } from "../hooks/useGenres";

const Navigation = () => {
	const genres = useGenres();
	console.log("Navigation genres:", genres);

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
			<Navbar.Brand as={Link} to="/">KMDB</Navbar.Brand>
			<Navbar.Toggle aria-controls="main-navbar" />
			<Navbar.Collapse id="main-navbar">
				<Nav className="me-auto">
				<Nav.Link as={Link} to="/">Start</Nav.Link>
				<Nav.Link as={Link} to="/popular">Popular</Nav.Link>
				<Nav.Link as={Link} to="/top-rated">Topplist</Nav.Link>
				<Nav.Link as={Link} to="/now-playing">Now Playing</Nav.Link>
				<NavDropdown title="Genres" id="genres-dropdown">
					{genres.map(genre => (
						<NavDropdown.Item as={Link} key={genre.id} to={"/genre/" + genre.id}>{genre.name}</NavDropdown.Item>
					))}
				</NavDropdown>
				</Nav>
			</Navbar.Collapse>
			</Container>
		</Navbar>
  );
};

export default Navigation;