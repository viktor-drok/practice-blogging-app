"use client";

import Link from "next/link";
import { useUser } from "../store/useUser";

const LinkNewPost = () => {
	const isAuthor = useUser(state => state.isAuthor);

	return <div>{isAuthor ? <Link href={"/newpost"}>Create New Post</Link> : null}</div>;
};
export default LinkNewPost;
