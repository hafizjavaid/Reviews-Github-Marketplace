const GITHUB_URL = process.env.REACT_APP_URL;
const GITHUB_TOKEN = process.env.REACT_APP_TOKEN;

export const searchUsers = async (text) => {
  const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const { items } = await response.json();
  return items;
};
