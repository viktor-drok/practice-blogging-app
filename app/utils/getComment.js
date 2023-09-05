const getComment = async (postId) => {

  const res = await fetch(`${location.origin}/api/comments/${postId}`, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export default getComment;