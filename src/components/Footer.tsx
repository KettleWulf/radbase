import Container from "react-bootstrap/Container";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer text-center pb-4">
			<hr className="mt-5 mb-3 mx-auto border w-50" />
			<div className="mb-5" />
			<Container fluid="md">
				<p className="mb-2">
					Powered by : 
					<a
					className="github-link"
					href="https://www.themoviedb.org/"
					>
					<img className="tmdb-logo" src="/images/tmdb-logo.svg" alt="Powered by TMDb" />
					</a>
				</p>
				<p className="mb-2 text-muted small">
					Olle Wistedt, 2025
				</p>
				<a
					className="github-link"
					href="https://github.com/KettleWulf"
				>
					<FaGithub className="me-1" />
				</a>
			</Container>
		</footer>
	);
};

export default Footer;