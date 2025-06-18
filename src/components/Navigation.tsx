import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useGenres } from "../hooks/useGenres";
import { useState } from "react";
import SearchBar from "./SearchBar";

const Navigation = () => {
	const genres = useGenres();
	const navigate = useNavigate();


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


				<div className="d-flex align-items-center ms-auto">

					<SearchBar />

					<Navbar.Toggle aria-controls="main-navbar" />
					<Navbar.Collapse id="main-navbar">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/">Start</Nav.Link>
							<Nav.Link as={Link} to="/popular">Popular</Nav.Link>
							<Nav.Link as={Link} to="/top-rated">Topplist</Nav.Link>
							<Nav.Link as={Link} to="/now-playing">Now Playing</Nav.Link>
							<NavDropdown title="Genres" id="genres-dropdown">
								{genres.length > 1 ? genres.map(genre => (
									<NavDropdown.Item as={Link} key={genre.id} to={`/genre/${genre.id}`}>{genre.name}</NavDropdown.Item>
								)) : <NavDropdown.Item>Loading genres...</NavDropdown.Item>}
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</div>

			
			</Container>
		</Navbar>
	);
};

export default Navigation;