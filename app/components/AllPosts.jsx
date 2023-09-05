"use client";

import { useQuery } from "@tanstack/react-query";

import { Grid } from "@mui/material";
import Post from "./Post";

const getPosts = async () => {
	const res = await fetch("http://localhost:3000/api/allposts", {
		method: "GET",
	});
	const data = await res.json();
	return data;
};

const AllPosts = () => {
	const { data: posts } = useQuery({
		queryKey: ["posts"],
		queryFn: () => getPosts(),
	});

	return (
		<Grid container justifyContent="center" alignItems="center" p={5}>
			{posts?.map(post => {
				return (
					<Grid item key={post.id} lg={4} width={400} p={2}>
						<Post title={post.title} post={post.post} author={post.author} postId={post.id} />
					</Grid>
				);
			})}
		</Grid>
	);
};
export default AllPosts;
