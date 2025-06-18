import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from "react-router";

interface SearchBarProps {
	onSearch: (query: string) => void;
	currentQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, currentQuery }) => {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
			setSearchQuery(""); //
		}
	};

	

  return (
	<Form className="d-flex mx-2 rounded-pill position-relative" onSubmit={handleSearch}>
		<Form.Label htmlFor="searchQuery" className="visually-hidden">Search Query</Form.Label>

		<InputGroup>
		<FormControl
			id="searchQuery"
			className="rounded-start-pill"
			type="search"
			placeholder="Search..."
			aria-label="Search"
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			size="sm"
		/>
		<div className="p-0 rounded-end-pill bg-light border-white">
			<Button
				variant="light"
				size="sm"
				type="submit"
				className="p-0 rounded-circle"
				>
				<IoSearchCircle className="fs-3 text-muted"/>
			</Button>
		</div>
		</InputGroup>
	</Form>
	)
}

export default SearchBar