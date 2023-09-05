const getComment = async () => {
	const res = await fetch("http://localhost:3000/api/comments", {
		method: "GET",
	});
	const data = await res.json();
	console.log(data);
	return data;
};

const Comment = async () => {
	const comment = await getComment();
	return (
		<div>
			{comment.map(item => (
				<div key={item.comment}>{item.comment}</div>
			))}
		</div>
	);
};
export default Comment;
