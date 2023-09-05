const getComment = async () => {
  const res = await fetch("http://localhost:3000/api/comments", {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export default getComment;