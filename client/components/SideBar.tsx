import React, { useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const SideBar = () => {
  const session = useSession();

  const getData = async () => {
    console.log(session);

    // const userList = await axios.get(
    //   "http://localhost:4000/user/all?userid=" + userid
    // );
    // return userList;
  };

  useEffect(() => {
    console.log(session.data?.user);

    const userList = getData();
  }, [session]);

  return <div className="w-1/5 h-full bg-cyan-400">test</div>;
};

export default SideBar;
