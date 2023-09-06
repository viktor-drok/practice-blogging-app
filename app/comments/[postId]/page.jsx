"use client";

import { useQuery } from "@tanstack/react-query";
import getComment from "../../utils/getComment";
import { useParams } from "next/navigation";
import { Avatar, Box, Paper, Typography } from "@mui/material";
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

	function stringToColor(string) {
		let hash = 0;
		let i;
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = "#";

		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}

		return color;
	}

	function stringAvatar(name) {
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: `${name[0][0]}${name[1][0]}`,
		};
	}

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
				<Typography variant="body1" p={2}>
					{post.data?.post}
				</Typography>
			</Paper>
			{comments.data?.map(item => (
				<Box key={item.id} ml={4}>
					<Paper sx={{ p: 2, mb: 2 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
							<Avatar {...stringAvatar(item.authorEmail)} />
							<Typography variant="h5">{item.authorEmail}</Typography>
						</Box>
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
