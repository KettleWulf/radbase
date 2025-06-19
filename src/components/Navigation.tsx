import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";
import { useGenres } from "../hooks/useGenres";
import SearchBar from "./SearchBar";
import { useSearch } from "../hooks/useSearch";
import { useTheme } from "../hooks/useTheme";

const Navigation = () => {
	const genres = useGenres();
	const { query, handleSearch } = useSearch();
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand className="py-0 my-0" as={Link} to="/">
					<img
						src="/images/RADb-logo.png"
						className="py-0 my-0 logo-nav"
						alt="Reel Movie Archive Data Base-logo"
					></img>
				</Navbar.Brand>

				<SearchBar onSearch={handleSearch} currentQuery={query} />

				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav className="ms-auto d-flex align-items-center">
						<Nav.Link
							as="button"
							onClick={toggleTheme}
							className="ms-3"
							style={{ border: "none", background: "none" }}
						>
							{isDarkMode ? "☀️" : "🌙"}
						</Nav.Link>
						<Nav.Link as={Link} to="/">
							Start
						</Nav.Link>
						<NavDropdown
							title="Browse Genres"
							id="genres-dropdown"
							className="transparent-dropdown"
						>
							{genres.length > 1 ? (
								genres.map((genre) => (
									<NavDropdown.Item
										as={Link}
										key={genre.id}
										to={`/genre/${genre.id}`}
									>
										{genre.name}
									</NavDropdown.Item>
								))
							) : (
								<NavDropdown.Item>Loading genres...</NavDropdown.Item>
							)}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
