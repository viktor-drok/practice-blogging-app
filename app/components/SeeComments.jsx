import { Box } from "@mui/material";
import { FaRegComment } from "react-icons/fa";

const SeeComments = ({ postId }) => {
	console.log(postId);

	return (
		<Box className="flex justify-start items-center px-4 py-2 rounded bg-[#b6daee] w-fit hover:bg-[#c8e5f5] transition-all cursor-pointer">
			<FaRegComment size={30} color="#0369a1" />
			<span className="ml-2 text-sky-700">Comments</span>
		</Box>
	);
};
export default SeeComments;
