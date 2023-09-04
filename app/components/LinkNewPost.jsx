"use client";

import Link from "next/link";
import { useUser } from "../store/useUser";
export const revalidate = 60;

const LinkNewPost = () => {
	const isAuthor = useUser(state => state.isAuthor);

	return (
		<>
			{isAuthor ? (
				<Link
					className="text-bold py-4 px-5 bg-[#1976d2] hover:bg-[#1e63a8] rounded-lg text-white transition-all min-w-[160px] text-center"
					href={"/newpost"}
				>
					Create New Post
				</Link>
			) : null}
		</>
	);
};
export default LinkNewPost;
