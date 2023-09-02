"use client";

import { Box, Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const NewPost = () => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			title: "",
			post: "",
			author: "",
		},
	});

	const onSubmit = data => {
		console.log(data);
	};

	return (
		<Box component="main">
			<Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
				<Box sx={{ width: ["50%", "40%", "30%"], p: 4, bgcolor: "background.paper", boxShadow: 2, borderRadius: 2 }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container direction="column" gap={4} mb={4}>
							<Grid container spacing={2} direction="column">
								<label>Title</label>
								<Controller
									name="title"
									control={control}
									rules={{ required: true }}
									render={({ field }) => <TextField autoFocus {...field} />}
								/>
							</Grid>

							<Grid container spacing={2} direction="column">
								<label>Your Post</label>
								<Controller
									name="post"
									control={control}
									// placeholder="Your Password"
									rules={{ required: true }}
									render={({ field }) => <TextareaAutosize minRows={10} {...field} />}
								/>
							</Grid>
						</Grid>

						<Button variant="contained" type="submit">
							Publish
						</Button>
					</form>
				</Box>
			</Grid>
		</Box>
	);
};
export default NewPost;
