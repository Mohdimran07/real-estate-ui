import React, { useContext, useState } from "react";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import "./profileUpdate.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import UploadWidget from "../../components/uploadWiget/UploadWidget";
import { BASE_URL } from "./../../constants";

const ProfileUpdate = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  console.log(currentUser)
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
 
  const [publicId, setPublicId] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const userInfo = {
      name,
      email,
      password,
      avatar:
        avatar[0] ||
        currentUser.avatar ||
        "/noavatar.jpg",
    };
    console.log(userInfo);

    try {
      const resp = await fetch(`${BASE_URL}/user/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userInfo),
      });
      const responsedata = await resp.json();
      const { updatedUser } = responsedata;
      console.log(updatedUser);
      updateUser(updatedUser);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profile">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
      <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "imran-developer",
            uploadPreset: "Estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
          setPublicId={setPublicId}
        />
       
      </div>
    </div>
  );
};

export default ProfileUpdate;
