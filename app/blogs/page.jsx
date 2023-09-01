import supabase from "../lib/supabaseClient";

const page = async () => {
	const { data: blogs } = await supabase.from("blogs").select();

	console.log(blogs);

	return (
		<div>
			hello
			<div>
				{blogs?.map(blog => (
					<div key={blog.id}>{blog.id}</div>
				))}
			</div>
		</div>
	);
};
export default page;
