import { useCallback, useEffect, useState } from "react";
import React, { useContext } from "react";

import "./profile.scss";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import { BASE_URL } from "../../constants";
import { data, Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [data, setData] = useState();
  const [chats, setChats] = useState([]);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // sent request in json format
        },
        credentials: "include", // Ensure cookies are included in the request
      });
      await resp.json();
      updateUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // const getPosts = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/user/profilePosts`, {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     console.log("[data]", data);
  //     setData(data);
  //   } catch (error) {}
  // };
  // const getChats = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/chats`, {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     console.log("[data]", data);
  //     // setData(data);
  //   } catch (error) {}
  // };
  
  const fetchProfileData = useCallback(async () => {
    try {
      const [postsResponse, chatsResponse] = await Promise.all([
        fetch(`${BASE_URL}/user/profilePosts`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
        fetch(`${BASE_URL}/chats`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
      ]);

      if (!postsResponse.ok || !chatsResponse.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const postsData = await postsResponse.json();
      const chatsData = await chatsResponse.json();

      setData(postsData);
      console.log("Chats Data:", chatsData.data);
      setChats(chatsData.data);
    } catch (error) {
      console.error("Fetch Profile Data Error:", error);
    }
  }, []);
  useEffect(() => {
    // getPosts();
    // getChats();
    fetchProfileData();
  }, []);

  return (
    currentUser && (
      <div className="profile">
        <div className="info">
          <div className="wrapper">
            <div className="title">
              <h1>User Info</h1>
              <Link to="/profile/update">
                <button>Update Profile</button>
              </Link>
            </div>
            <div className="userInfo">
              <span>
                Avatar:{" "}
                <img
                  src={
                    currentUser.avatar ||
                    "https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt=""
                />
              </span>
              <span>
                Username: <b>{currentUser.name}</b>
              </span>
              <span>
                Email: <b>{currentUser.email}</b>
              </span>
              <button onClick={logoutHandler}>Logout</button>
            </div>
            <div className="title">
              <h1>My List</h1>
              <Link to={"/profile/create"}>
                <button>Create Post</button>
              </Link>
            </div>
            <List postData={data?.data} />
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List postData={data?.saved} />
          </div>
        </div>
        <div className="messageContainer">
          <div className="wrapper">
            <Chat chats={chats} />
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
