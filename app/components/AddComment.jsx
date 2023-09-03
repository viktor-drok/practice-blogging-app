"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const AddComment = () => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleSubmitComment = () => {
		setExpanded(false);
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
								transition: "all 0.5s ease-in-out",
						  }
						: {
								position: "absolute",
								display: "none",
								bottom: "0",
								left: "0",
								right: "0",
								zIndex: "1",
								transition: "all 0.5s ease-in-out",
						  }
				}
			>
				<TextField fullWidth label="Your Comment" />
				<Button onClick={handleSubmitComment} sx={{ float: "right" }}>
					Add Comment
				</Button>
			</Box>
		</Box>
	);
};
export default AddComment;
