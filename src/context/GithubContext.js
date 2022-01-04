import { createContext, useReducer } from "react";
// import { URLSearchParams } from "url";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_URL;
const GITHUB_TOKEN = process.env.REACT_APP_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //   Fetch All Users
  //   const fetchUsers = async () => {
  //     setLoading();
  //     const response = await fetch(`${GITHUB_URL}/users`, {
  //       headers: {
  //         Authorization: `token ${GITHUB_TOKEN}`,
  //       },
  //     });

  //     const data = await response.json();
  //     dispatch({
  //       type: "GET_USERS",
  //       payload: data,
  //     });
  //   };

  //   const setLoading = () => {
  //     dispatch({
  //       type: "SET_LOADING",
  //     });
  //   };

  const searchUsers = async (text) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
