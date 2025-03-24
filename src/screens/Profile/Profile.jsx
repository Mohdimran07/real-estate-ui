import { useCallback, useEffect, useState } from "react";
import React, { useContext } from "react";

import "./profile.scss";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { showToast } from "../../components/toast/Toast";
import { fetchProfileData } from "../../services/chatServices";
import {  logoutHandler } from "../../services/apiService";

const Profile = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [data, setData] = useState();
  const [chats, setChats] = useState([]);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutHandler();
      showToast("Logout Successful", "success");
      updateUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
      showToast("Failed to logout", "error");
    }
  };

  const fetchProfileDataHandler = useCallback(async () => {
    try {
      const { postsData, chatsData } = await fetchProfileData();
      setData(postsData);
      setChats(chatsData.data);
    } catch (error) {
      showToast("Failed to fetch profile data", "error");
      console.error("Fetch Profile Data Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchProfileDataHandler();
  }, [fetchProfileDataHandler]);

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
              <button onClick={handleLogout}>Logout</button>
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
