const getComment = async () => {
  const res = await fetch(`${location.origin}/api/comments`, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export default getComment;