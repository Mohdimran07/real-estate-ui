import React, { useContext, useState } from "react";
import "./profileUpdate.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import UploadWidget from "../../components/uploadWiget/UploadWidget";
import { showToast } from "../../components/toast/Toast";
import { updateUserProfile } from "../../services/postServices";

const ProfileUpdate = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);

  const [publicId, setPublicId] = useState("");

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
      avatar: avatar[0] || currentUser.avatar || "/noavatar.jpg",
    };

    if (!name || !email || !password) {
      showToast("Please fill all the fields", "warn");
      return;
    }

    try {
      const responsedata = await updateUserProfile(currentUser.id, userInfo);
      if (!responsedata.error) {
        showToast(responsedata.message, "success");
        const { updatedUser } = responsedata;
        console.log(updatedUser);
        updateUser(updatedUser);
        navigate("/profile");
      }
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
         
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
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
