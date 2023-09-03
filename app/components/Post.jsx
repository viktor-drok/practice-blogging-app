import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
export const revalidate = 60;

const Post = ({ title, post, author }) => {
	return (
		<Box>
			<Card variant="outlined" sx={{ height: "400px", overflowY: "auto" }} py={4}>
				<CardContent>
					<Typography variant="h5" component="div">
						{title}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						<Link href={`/posts/${author}`}>
							<Box sx={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", color: "blue" }}>
								Author:
								<Typography variant="body2" color="text.secondary">
									{author}
								</Typography>
							</Box>
						</Link>
					</Typography>
					<Typography variant="body2">{post}</Typography>
				</CardContent>
				{/* <CardActions>
					<Button size="small">Learn More</Button>
				</CardActions> */}
			</Card>
		</Box>
	);
};

export default Post;
