"use client";
import { useRouter } from "next/navigation";

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "../store/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Header = () => {
	const supabase = createClientComponentClient();
	const userIsLoggedIn = useUser(state => state.isLoggedIn);
	const setIsLoggedIn = useUser(state => state.setIsLoggedIn);

	const router = useRouter();

	const handleLogIn = () => router.push("/login");
	const handleSignUp = () => router.push("/register");
	const handleSLogOut = async () => {
		const { data, error } = await supabase.auth.signOut();
		console.log("signOut", data);
		setIsLoggedIn(false);
		router.push("/");
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						All Posts
					</Typography>
					<Box>
						{userIsLoggedIn ? (
							<Button color="inherit" onClick={handleSLogOut}>
								Log Out
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
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
export default Header;
