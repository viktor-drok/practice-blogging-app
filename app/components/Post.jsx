"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import AddComment from "./AddComment";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "../store/useUser";
import { useEffect, useState } from "react";
export const revalidate = 60;

const Post = ({ title, post, author, postId }) => {
	const supabase = createClientComponentClient();
	const isAuthor = useUser(state => state.isAuthor);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const { data: userData } = await supabase?.auth.getSession();
			setUserData(userData?.session ? userData?.session.user.aud : null);
		};
		fetchData();
	}, [author, supabase]);
	return (
		<Box sx={{ position: "relative" }}>
			<Card variant="outlined" sx={{ height: "400px", overflowY: "auto" }} py={4}>
				<CardContent>
					<Typography variant="h5" component="div">
						{title}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						<Link href={`/posts/${author}`}>
							<Box sx={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", color: "blue" }}>
								Author:
								<Typography variant="body2" color="text.secondary">
									{author}
								</Typography>
							</Box>
						</Link>
					</Typography>
					<Typography variant="body2">{post}</Typography>
				</CardContent>
				<CardActions>{!isAuthor && userData !== null ? <AddComment postId={postId} /> : null}</CardActions>
			</Card>
		</Box>
	);
};

export default Post;
