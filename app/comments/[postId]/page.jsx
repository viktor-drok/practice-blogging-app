"use client";

import { useQuery } from "@tanstack/react-query";
import getComment from "../../utils/getComment";
import { useParams } from "next/navigation";
import { Box } from "@mui/material";

const Comment = () => {
	const { postId } = useParams();
	const { data: comments } = useQuery({
		queryKey: ["comment"],
		queryFn: () => getComment(postId),
	});
	return (
		<Box px={4}>
			{comments?.map(item => (
				<div key={item.id} s>
					<p>{item.comment}</p>
					<p>{item.authorEmail}</p>
				</div>
			))}
		</Box>
	);
};
export default Comment;
