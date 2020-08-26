const sleep = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const savePost = async (postData) => {
  await sleep(1000);
  return { data: { post: postData } };
};

export { savePost };
