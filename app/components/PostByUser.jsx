import { Card, CardContent, Grid, Typography } from "@mui/material";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const revalidate = 60;

const PostByUser = async () => {
	const supabase = createServerComponentClient({ cookies });

	const { data: userData } = await supabase.auth.getSession();

	const user = userData?.session.user?.email;

	const { data: posts } = await supabase.from("blogs").select("*").eq("author", user);

	return (
		<Grid container gap={2} my={5} mx={5}>
			{posts?.map(post => {
				return (
					<Card key={post.id} sx={{ width: 400, maxHeight: 350, overflowY: "auto" }}>
						<CardContent>
							<Typography variant="h4">{post.title}</Typography>
							<Typography variant="body2">{post.post}</Typography>
						</CardContent>
					</Card>
				);
			})}
		</Grid>
	);
};
export default PostByUser;
