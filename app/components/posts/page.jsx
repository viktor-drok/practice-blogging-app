import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Posts = async () => {
	const supabase = createServerComponentClient({ cookies });

	const { data: posts } = await supabase.from("blogs").select();

	return (
		<div>
			{posts?.map(post => {
				return <div key={post.id}>{post.title}</div>;
			})}
		</div>
	);
};
export default Posts;
