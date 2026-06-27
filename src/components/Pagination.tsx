import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";


interface PaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
	return (
	<AnimatePresence>
		{page > 1 && (
		<motion.div
			key="prev"
			className="paginator-rail paginator-left"
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.25 }}
		>
			<button
				className="floating-paginator btn btn-light"
				onClick={() => onPageChange(page - 1)}
			>
				<AiOutlineLeft />
			</button>
		</motion.div>
		)}

		{page < totalPages && (
		<motion.div
			key="next"
			className="paginator-rail paginator-right"
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 20 }}
			transition={{ duration: 0.25 }}
		>
			<button
				className="floating-paginator btn btn-light"
				onClick={() => onPageChange(page + 1)}
			>
				<AiOutlineRight />
			</button>
		</motion.div>
		)}
	</AnimatePresence>
	);
};

export default Pagination;
