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
import SeeComments from "./SeeComments";
import PostModal from "./PostModal";
import { Button } from "@mui/material";
export const revalidate = 60;

const Post = ({ title, post, author, postId }) => {
	const supabase = createClientComponentClient();
	const isAuthor = useUser(state => state.isAuthor);
	const [userData, setUserData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const { data: userData } = await supabase?.auth.getSession();
			setUserData(userData?.session ? userData?.session.user.aud : null);
		};
		fetchData();
	}, [author, supabase]);

	const hideAuthorEmail = email => {
		const hiddenEmail = email?.slice(3, email?.indexOf(".") + 1);
		return email?.replace(hiddenEmail, "*".repeat(hiddenEmail.length));
	};
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
									{hideAuthorEmail(author)}
								</Typography>
							</Box>
						</Link>
					</Typography>
					<Typography variant="body2">{post}</Typography>
				</CardContent>
				<Box pl={2}>
					<SeeComments postId={postId} />
					<CardActions>{!isAuthor && userData !== null ? <AddComment postId={postId} /> : null}</CardActions>
				</Box>
			</Card>
			{isModalOpen ? <PostModal /> : null}
		</Box>
	);
};

export default Post;
