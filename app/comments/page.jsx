"use client";

import { useQuery } from "@tanstack/react-query";
import getComment from "../utils/getComment";

// const getComment = async () => {
// 	const res = await fetch("http://localhost:3000/api/comments", {
// 		method: "GET",
// 	});
// 	const data = await res.json();
// 	console.log(data);
// 	return data;
// };

const Comment = () => {
	const { data: comments } = useQuery({
		queryKey: ["comment"],
		queryFn: () => getComment(),
	});
	return (
		<div>
			{comments?.map(item => (
				<div key={item.comment}>{item.comment}</div>
			))}
		</div>
	);
};
export default Comment;
