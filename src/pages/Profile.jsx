import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
function Profile() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return user ? <h2>{user.displayName}</h2> : <h2>Not Logged In</h2>;
}

export default Profile;
