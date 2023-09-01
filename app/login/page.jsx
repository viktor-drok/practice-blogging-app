"use client";

import { Box, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import SendIcon from "@mui/icons-material/Send";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "../store/useUser";

const LogIn = () => {
	const router = useRouter();
	const supabase = createClientComponentClient();

	const userIsLoggedIn = useUser(state => state.isLoggedIn);
	const setIsLoggedIn = useUser(state => state.setIsLoggedIn);

	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSignIn = async ({ email, password }) => {
		console.log("sdgsdgsdgsdg", email, password);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		});

		const userData = await supabase.auth.getSession();
		await setIsLoggedIn(userData?.data.session?.user.aud);

		router.refresh();
		router.push("/");
	};

	const onSubmit = async data => {
		handleSignIn(data);
	};

	return (
		<Box component="main">
			<Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
				<Box sx={{ width: ["50%", "40%", "30%"], p: 4, bgcolor: "background.paper", boxShadow: 2, borderRadius: 2 }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container direction="column" gap={4} mb={4}>
							<Grid container spacing={2} direction="column">
								<label>Your Email</label>
								<Controller
									name="email"
									control={control}
									placeholder="Your Email"
									rules={{ required: true }}
									render={({ field }) => <TextField {...field} />}
								/>
							</Grid>

							<Grid container spacing={2} direction="column">
								<label>Your Password</label>
								<Controller
									name="password"
									control={control}
									placeholder="Your Password"
									rules={{ required: true }}
									render={({ field }) => <TextField {...field} />}
								/>
							</Grid>
						</Grid>

						<Button variant="contained" type="submit" endIcon={<SendIcon />}>
							Sign Up
						</Button>
					</form>
				</Box>
			</Grid>
		</Box>
	);
};
export default LogIn;
