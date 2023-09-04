"use client";
import { Box, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AddComment from "./AddComment";
import { useUser } from "../store/useUser";
import { useEffect, useState } from "react";

const PostByUser = () => {
	const supabase = createClientComponentClient();

	const isAuthor = useUser(state => state.isAuthor);
	const [posts, setPosts] = useState([]);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const { data: userData } = await supabase?.auth.getSession();
			const user = userData?.session.user?.email;
			const { data: posts } = await supabase.from("blogs").select("*").eq("author", user);

			setPosts(posts);
			setUserData(userData.session.user ? userData.session.user.aud : null);
		};
		fetchData();
	}, [supabase]);

	return (
		<Grid container gap={2} my={5} mx={5}>
			{posts?.map(post => {
				return (
					<Box key={post.id} sx={{ position: "relative" }}>
						<Card sx={{ width: 400, height: "100%", overflowY: "auto" }}>
							<CardContent>
								<Typography variant="h4">{post.title}</Typography>
								<Typography variant="body2">{post.post}</Typography>
							</CardContent>
							<CardActions>{!isAuthor && userData ? <AddComment postId={post.id} /> : null}</CardActions>
						</Card>
					</Box>
				);
			})}
		</Grid>
	);
	``;
};
export default PostByUser;
