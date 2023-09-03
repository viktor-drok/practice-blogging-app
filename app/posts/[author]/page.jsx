import { Card, CardContent, Grid, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const page = async ({ params }) => {
	const supabase = createClientComponentClient();

	const { data: posts } = await supabase.from("blogs").select("*").eq("author", params.author.replace("%40", "@"));

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
export default page;
