"use client";

import Link from "next/link";
import { useUser } from "../store/useUser";

const LinkUserOwnPosts = () => {
	const isAuthor = useUser(state => state.isAuthor);

	return <>{isAuthor ? <Link href={"/myposts"}>My Posts</Link> : null}</>;
};
export default LinkUserOwnPosts;
