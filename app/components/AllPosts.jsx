import { Grid } from "@mui/material";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Post from "./Post";

const AllPosts = async () => {
	const supabase = createServerComponentClient({ cookies });

	const { data: posts } = await supabase.from("blogs").select();

	return (
		<Grid container justifyContent="center" alignItems="center" p={5}>
			{posts?.map(post => {
				return (
					<Grid item key={post.id} lg={4} width={400} p={2}>
						<Post title={post.title} post={post.post} author={post.author} />
					</Grid>
				);
			})}
		</Grid>
	);
};
export default AllPosts;
