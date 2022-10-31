import { useContext, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { AuthContext } from "../../contexts/AuthContext";

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://a-blog-api3.herokuapp.com/users", {
        method: "GET",
        credentials: "include",
      });
      const resData = await res.json();
      if (resData) {
        setUser!({ ...resData, isLoggedIn: true });
      }
    })();
  }, []);

  return <>{user?.isLoggedIn && <ProfileCard />}</>;
}

export default Profile;
