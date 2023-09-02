"use client";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "../store/useUser";

const LogIn = () => {
	const router = useRouter();
	const supabase = createClientComponentClient();

	const setIsLoggedIn = useUser(state => state.setIsLoggedIn);
	const setIsAuthor = useUser(state => state.setIsAuthor);
	const setUser = useUser(state => state.setUser);

	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSignIn = async ({ email, password }) => {
		console.log("sdgsdgsdgsdg", email, password);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		});

		const userData = await supabase.auth.getSession();
		await setIsLoggedIn(userData?.data.session?.user.aud);
		await setUser(userData?.data.session?.user.email);

		const userSessionEmail = await userData?.data.session?.user.email;
		const { data } = await supabase.from("users").select("isAuthor").eq("email", userSessionEmail);
		await setIsAuthor(data[0]?.isAuthor);

		router.refresh();
		router.push("/");
	};

	const onSubmit = async data => {
		console.log(data);
		handleSignIn(data);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						control={control}
						placeholder="Your Email"
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								{...field}
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>
						)}
					/>

					<Controller
						name="password"
						control={control}
						placeholder="Your Password"
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								{...field}
							/>
						)}
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
				</form>
			</Box>
		</Container>
	);
};
export default LogIn;
