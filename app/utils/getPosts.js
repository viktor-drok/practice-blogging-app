const getPosts = async () => {
  const res = await fetch(`${location.origin}/api/allposts`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export default getPosts;