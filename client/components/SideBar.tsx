import React, { useEffect } from "react";
import axios from "axios";

const SideBar = () => {
  const getData = async () => {
    const userList = await axios.get("http://localhost:4000/user/all?userid=" + userid");
    return userList;
  };

  useEffect(() => {
    const userList = getData();
  }, []);

  return <div className="w-1/5 h-full bg-cyan-400">test</div>;
};

export default SideBar;
