import type { ReactNode } from "react";

interface SearchOverlayProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose, children }) => {
	return (
		<div
			className={`search-overlay ${open ? "is-open" : ""}`}
			aria-hidden={!open}
		>
			<button
				type="button"
				className="search-overlay__backdrop"
				onClick={onClose}
				aria-label="Close search"
				tabIndex={open ? 0 : -1}
			/>

			<div
				className="search-overlay__panel"
				role="dialog"
				aria-modal="true"
			>
				{children}
			</div>
		</div>
	);
};

export default SearchOverlay;