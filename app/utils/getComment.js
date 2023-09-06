const getComment = async (postId) => {

  const res = await fetch(`${location.origin}/api/comments/${postId}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export default getComment;