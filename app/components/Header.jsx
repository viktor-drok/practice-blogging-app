"use client";
import { useRouter } from "next/navigation";

import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useUser } from "../store/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const Header = () => {
	const supabase = createClientComponentClient();
	const userIsLoggedIn = useUser(state => state.isLoggedIn);
	const setIsLoggedIn = useUser(state => state.setIsLoggedIn);
	const setIsAuthor = useUser(state => state.setIsAuthor);
	const setUser = useUser(state => state.setUser);

	const router = useRouter();

	const handleLogIn = () => router.push("/login");
	const handleSignUp = () => router.push("/register");
	const handleSLogOut = async () => {
		const { error } = await supabase.auth.signOut();
		setIsLoggedIn(false);
		setIsAuthor(false);
		setUser("");
		router.push("/");
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Link href="/">
						<Typography variant="h6" component="div" sx={{ color: "#ffffff" }}>
							All Posts
						</Typography>
					</Link>
					<Box>
						<div suppressHydrationWarning>
							{userIsLoggedIn ? (
								<Button color="inherit" onClick={handleSLogOut}>
									<Avatar sx={{ mr: "10px" }} />
									<span>Log Out</span>
								</Button>
							) : (
								<>
									<Button color="inherit" onClick={handleSignUp}>
										Sign Up
									</Button>
									<Button color="inherit" onClick={handleLogIn}>
										Log In
									</Button>
								</>
							)}
						</div>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
export default Header;
