"use client";

import { Box, Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "../store/useUser";
import { useRouter } from "next/navigation";

export const revalidate = 60;

const NewPost = () => {
	const user = useUser(state => state.user);
	const router = useRouter();

	const { control, handleSubmit } = useForm({
		defaultValues: {
			title: "",
			post: "",
			author: user,
		},
	});

	const supabase = createClientComponentClient();

	const onSubmit = async data => {
		await supabase.from("blogs").insert(data).select();

		router.refresh();
		router.push("/");
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
