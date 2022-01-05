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
    user: {},
    repos: [],
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // Get user repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
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
        // users: state.users,
        // user: state.user,
        // loading: state.loading,
        // repos: state.repos,
        ...state,
        getUser,
        dispatch,
        clearUsers,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
