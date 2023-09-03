"use client";
import { useState } from "react";

import AddComment from "@/app/components/AddComment";
import { Box, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useUser } from "@/app/store/useUser";

const Page = ({ params }) => {
	const supabase = createClientComponentClient();
	const isAuthor = useUser(state => state.isAuthor);
	const [posts, setPosts] = useState([]);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const { data: userData } = await supabase?.auth.getSession();
			const { data: posts } = await supabase.from("blogs").select("*").eq("author", params.author.replace("%40", "@"));

			setPosts(posts);
			setUserData(userData.session.user.aud);
		};
		fetchData();
	}, [params.author, supabase]);

	return (
		<Grid container gap={2} my={5} mx={5}>
			{posts?.map(post => {
				return (
					<Box key={post.id} sx={{ position: "relative" }}>
						<Card sx={{ width: 400, maxHeight: 350, overflowY: "auto" }}>
							<CardContent>
								<Typography variant="h4">{post.title}</Typography>
								<Typography variant="body2">{post.post}</Typography>
							</CardContent>
							<CardActions>{!isAuthor && userData ? <AddComment /> : null}</CardActions>
						</Card>
					</Box>
				);
			})}
		</Grid>
	);
};
export default Page;
