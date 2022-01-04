import { useContext, useEffect, useState } from "react";
import GithubContext from "../../context/GithubContext";
// import Spinner from "../layout/Spinner";
import UserItem from "../users/UserItem";

function UserResults() {
  const { users, loading, fetchUsers } = useContext(GithubContext);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default UserResults;
