import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const revalidate = 60;

const PostByUser = async () => {
	const supabase = createServerComponentClient({ cookies });

	const { data: userData } = await supabase.auth.getSession();

	const user = userData?.session.user?.email;

	const { data: posts } = await supabase.from("blogs").select("*").eq("author", user);

	return (
		<div>
			{posts?.map(post => {
				return <div key={post.id}>{post.title}</div>;
			})}
		</div>
	);
};
export default PostByUser;
