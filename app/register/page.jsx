"use client";

import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUser } from "../store/useUser";
import { Checkbox, FormControlLabel } from "@mui/material";

export const revalidate = 60;

const SignUp = () => {
	const router = useRouter();
	const supabase = createClientComponentClient();

	const setIsLoggedIn = useUser(state => state.setIsLoggedIn);
	const setIsAuthor = useUser(state => state.setIsAuthor);
	const setUser = useUser(state => state.setUser);

	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			author: false,
		},
	});

	const handleSignUp = async ({ email, password, firstName, lastName, author }) => {
		await supabase.auth.signUp({
			email,
			password,
			firstName,
			lastName,
			author,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		});

		const userData = await supabase.auth.getSession();
		await setIsLoggedIn(userData?.data.session?.user.aud);
		await setIsAuthor(author);
		await setUser(userData?.data.session?.user.email);

		await supabase.from("users").insert({ firstName, lastName, isAuthor: author, email });

		router.refresh();

		router.push("/");
	};

	const onSubmit = data => {
		handleSignUp(data);
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
					Sign up
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Controller
								name="firstName"
								control={control}
								placeholder="Your Firstname"
								rules={{ required: true }}
								render={({ field }) => (
									<TextField
										{...field}
										autoComplete="given-name"
										name="firstName"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Controller
								name="lastName"
								control={control}
								placeholder="Your Lastname"
								rules={{ required: true }}
								render={({ field }) => (
									<TextField
										{...field}
										autoComplete="given-name"
										name="lastName"
										required
										fullWidth
										id="lastName"
										label="Last Name"
										autoFocus
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="email"
								control={control}
								placeholder="Your Email"
								rules={{ required: true }}
								render={({ field }) => (
									<TextField
										{...field}
										autoComplete="given-name"
										name="email"
										required
										fullWidth
										id="email"
										label="Email Address"
										autoFocus
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="password"
								control={control}
								placeholder="Your Password"
								rules={{ required: true }}
								render={({ field }) => (
									<TextField
										{...field}
										autoComplete="given-name"
										name="password"
										required
										fullWidth
										id="password"
										label="Password"
										autoFocus
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="author"
								control={control}
								render={({ field }) => (
									<FormControlLabel
										label="I want to be an Author"
										control={<Checkbox value="allowExtraEmails" color="primary" {...field} />}
									/>
								)}
							/>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
				</form>
			</Box>
		</Container>
	);
};
export default SignUp;
