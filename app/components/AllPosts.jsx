import { Grid } from "@mui/material";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Post from "./Post";

const AllPosts = async () => {
	const supabase = createServerComponentClient({ cookies });

	const { data: posts } = await supabase.from("blogs").select();

	return (
		<Grid container justifyContent="center" alignItems="center" spacing={2} p={5}>
			{posts?.map(post => {
				return (
					<Grid item key={post.id} lg={4} height={300} xs="auto">
						<Post title={post.title} post={post.post} />
					</Grid>
				);
			})}
		</Grid>
	);
};
export default AllPosts;
