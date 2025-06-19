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
		<motion.button
			key="prev"
			className="floating-paginator paginator-left btn btn-light"
			onClick={() => onPageChange(page - 1)}
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.25 }}
		>
			<AiOutlineLeft />
		</motion.button>
		)}

		{page < totalPages && (
		<motion.button
			key="next"
			className="floating-paginator paginator-right btn btn-light"
			onClick={() => onPageChange(page + 1)}
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 20 }}
			transition={{ duration: 0.25 }}
		>
			<AiOutlineRight />
		</motion.button>
		)}
	</AnimatePresence>
	);
};

export default Pagination;