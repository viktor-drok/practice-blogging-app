import { FaRegComment } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

import getComment from "../utils/getComment";
import Link from "next/link";

const SeeComments = ({ postId }) => {
	const { data: comments } = useQuery({
		queryKey: ["comment", postId],
		queryFn: () => getComment(postId),
	});
	return (
		<Link
			href={`/comments/${postId}`}
			className="flex justify-start items-center px-4 py-2 rounded bg-[#b6daee] w-fit hover:bg-[#c8e5f5] transition-all cursor-pointer"
		>
			<FaRegComment size={30} color="#0369a1" />
			<span className="ml-2 text-sky-700">
				{comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
			</span>
		</Link>
	);
};
export default SeeComments;
