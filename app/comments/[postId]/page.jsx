"use client";

import { useQuery } from "@tanstack/react-query";
import getComment from "../../utils/getComment";
import { useParams } from "next/navigation";
import { Box, Paper, Typography } from "@mui/material";
import getPosts from "@/app/utils/getPosts";

const Comment = () => {
	const { postId } = useParams();
	const comments = useQuery({
		queryKey: ["comment"],
		queryFn: () => getComment(postId),
	});

	const post = useQuery({
		queryKey: ["post", postId],
		queryFn: () => getPosts(),
		select: data => data.find(item => item.id.toString() === postId.toString()),
	});

	if (comments.isFetching || post.isFetching) {
		return <div>Loading...</div>;
	}

	if (comments.isError || post.isError) {
		return console.log(post.error.message);
	}

	return (
		<Box p={4}>
			<Paper sx={{ p: 2, mb: 2 }}>
				<Typography variant="h4">{post.data?.title}</Typography>
			</Paper>
			{comments.data?.map(item => (
				<Box key={item.id} ml={4}>
					<Paper sx={{ p: 2, mb: 2 }}>
						<Typography variant="h5">{item.authorEmail}</Typography>
						<Typography variant="body1" ml={2}>
							{item.comment}
						</Typography>
					</Paper>
				</Box>
			))}
		</Box>
	);
};
export default Comment;
