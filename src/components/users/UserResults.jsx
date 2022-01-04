import { useEffect, useState } from "react";
// import Spinner from "../layout/Spinner";
import UserItem from "../users/UserItem";

function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_TOKEN}`,
      },
    });

    console.log(response);
    const data = await response.json();
    console.log(data);

    setUsers(data);
    setLoading(false);
  };

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
