"use client";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useUser } from "../store/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AddComment = ({ postId }) => {
	const authorEmail = useUser(state => state.user);

	const supabase = createClientComponentClient();

	const [expanded, setExpanded] = useState(false);

	const { control, handleSubmit } = useForm({
		defaultValues: {
			authorEmail,
			comment: "",
			commendedPostId: postId,
		},
	});

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// const AddCommentToDB = () => {};

	const handleSubmitComment = async data => {
		setExpanded(false);

		const { error } = await supabase.from("comments").insert(data);

		console.log(error);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Button size="small" sx={{ float: "right", zIndex: "5" }} onClick={handleExpandClick}>
				Leave a comment
			</Button>
			<Box
				sx={
					expanded
						? {
								position: "absolute",
								bottom: "-100px",
								left: "0",
								right: "0",
								zIndex: "1",
								background: "#fff",
						  }
						: {
								position: "absolute",
								display: "none",
								bottom: "0",
								left: "0",
								right: "0",
								zIndex: "1",
						  }
				}
			>
				<form onSubmit={handleSubmit(handleSubmitComment)}>
					<Controller
						name="comment"
						control={control}
						render={({ field }) => <TextField {...field} fullWidth label="Your Comment" />}
					/>

					<Button type="submit" sx={{ float: "right" }}>
						Add Comment
					</Button>
				</form>
			</Box>
		</Box>
	);
};
export default AddComment;
