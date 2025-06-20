import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import { useGenres } from "../hooks/useGenres";
import SearchBar from "./SearchBar";
import { useSearch } from "../hooks/useSearch";
import { useTheme } from "../hooks/useTheme";
import { IoIosSunny } from "react-icons/io";
import { FaRegMoon } from "react-icons/fa";

const Navigation = () => {
	const genres = useGenres();
	const { query, handleSearch } = useSearch();
	const { isDarkMode, toggleTheme } = useTheme();

	const location = useLocation();

	const isAnyGenreActive = location.pathname.startsWith("/genre");

	return (
		<Navbar className="navigation">
			<Container>
				<Navbar.Brand className="py-0 my-1" as={NavLink} to="/">
					<img
						src="/images/RADb-logo.png"
						className="py-0 my-0 logo-nav"
						alt="Reel Movie Archive Data Base-logo"
					/>
				</Navbar.Brand>

				<SearchBar onSearch={handleSearch} currentQuery={query} />

				<Nav className="ms-auto d-flex align-items-center">
					
					<Nav.Link as={NavLink} to="/">
						Start
					</Nav.Link>

					<NavDropdown
						title="Browse Genres"
						id="genres-dropdown"
						className={`transparent-dropdown ${
							isAnyGenreActive ? "active" : ""
						}`}
					>
						{genres.length > 1 ? (
							genres.map((genre) => (
								<NavDropdown.Item
									as={NavLink}
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
					<Nav.Link
						as="button"
						onClick={toggleTheme}
						className="rounded-circle d-flex align-items-center justify-content-center border border-white"
						style={{ border: "none", background: "none" }}
					>
						{isDarkMode ? <IoIosSunny /> : <FaRegMoon />}
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Navigation;
