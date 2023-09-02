"use client";

import Link from "next/link";
import { useUser } from "../store/useUser";
import { Box } from "@mui/material";

const LinkNewPost = () => {
	const isAuthor = useUser(state => state.isAuthor);

	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px", width: "200px" }}>
			{isAuthor ? (
				<Link
					style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
					href={"/newpost"}
				>
					Create New Post
				</Link>
			) : null}
		</Box>
	);
};
export default LinkNewPost;
