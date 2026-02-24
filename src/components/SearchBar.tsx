import { useEffect, useRef, useState } from "react";
import { FormControl } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoSearchCircle } from "react-icons/io5";
import { useTheme } from "../hooks/useTheme";

interface SearchBarProps {
	onSearch: (query: string) => void;
	currentQuery: string;

	open?: boolean;
	onClose?: () => void;
	autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	currentQuery,
	open = true,
	onClose,
	autoFocus = false,
}) => {
	const [searchQuery, setSearchQuery] = useState(currentQuery ?? "");
	const { isDarkMode } = useTheme();
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		setSearchQuery(currentQuery ?? "");
	}, [currentQuery]);


	useEffect(() => {
		if (!open || !autoFocus) return;

		setTimeout(() => inputRef.current?.focus(), 0);
	}, [open, autoFocus]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const q = searchQuery.trim();
		if (!q) return;
		onSearch(q);
	};

	if (!open) return null;

	return (
		<Form
			className="rounded-pill"
			onSubmit={handleSearch}
			role="search"
			aria-label="Search form"
		>
			<Form.Label htmlFor="searchQuery" className="visually-hidden">
				Search Query
			</Form.Label>

			<InputGroup>
				<FormControl
					ref={inputRef}
					id="searchQuery"
					className="rounded-start-pill search-bar"
					type="search"
					placeholder="Search..."
					aria-label="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					size="lg"
					onKeyDown={(e) => {
						if (e.key === "Escape") onClose?.();
					}}
				/>

				<div className={"p-1 rounded-end-pill search-button"}>
					<Button
						variant={isDarkMode ? "secondary" : "light"}
						size="lg"
						type="submit"
						className="p-1 rounded-circle"
						aria-label="Submit search"
					>
						<IoSearchCircle className="fs-1 text-muted m-1" />
					</Button>
				</div>
			</InputGroup>
		</Form>
	);
};

export default SearchBar;