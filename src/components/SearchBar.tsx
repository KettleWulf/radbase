import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import { IoSearchCircle } from "react-icons/io5";
// import { useNavigate } from "react-router";

interface SearchBarProps {
	onSearch: (query: string) => void;
	currentQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, currentQuery }) => {
	const [searchQuery, setSearchQuery] = useState(currentQuery ?? "");

	useEffect(() => {
		setSearchQuery(currentQuery ?? "");
	}, [currentQuery]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			onSearch(searchQuery);
		}
	};

  return (
	<Form className="d-flex mx-2 rounded-pill" onSubmit={handleSearch}>
		<Form.Label htmlFor="searchQuery" className="visually-hidden">Search Query</Form.Label>

		<InputGroup>
			<FormControl
				id="searchQuery"
				className="rounded-start-pill search-bar"
				type="search"
				placeholder="Search..."
				aria-label="Search"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				size="sm"
			/>
			<div className="p-0 rounded-end-pill bg-light">
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