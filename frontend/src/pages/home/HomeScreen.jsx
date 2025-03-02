import React from "react";
import { useAuthStore } from "../../store/authUser";

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <p>Home Screen</p>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default HomeScreen;
