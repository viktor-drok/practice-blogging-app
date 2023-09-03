import { Card, CardContent, Grid, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const page = async ({ params }) => {
	console.log(params.author.replace("%40", "@"));
	const supabase = createClientComponentClient();

	const { data: posts } = await supabase.from("blogs").select("*").eq("author", params.author.replace("%40", "@"));

	console.log(posts);

	return (
		<Grid container gap={2} my={5} mx={5}>
			{posts?.map(post => {
				return (
					<Card key={post.id} sx={{ maxWidth: 345 }}>
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
