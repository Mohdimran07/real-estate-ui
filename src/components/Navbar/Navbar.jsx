import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const notifications = useNotificationStore(
    (state) => state.fetchNotifications
  );
  const notificationNumber = useNotificationStore(
    (state) => state.notifications
  );

  if (currentUser) {
    notifications();
  }
  
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo1.png" alt="logo in PNG" />
          <span>Real-Estate</span>
        </a>
        <a href="/">Home</a>
        <a href="/list">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={
                currentUser?.avatar ||
                "https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              alt=""
            />
            <span>{currentUser?.name}</span>
            <Link to="/profile" className="profile">
              {notificationNumber > 0 && (
                <div className="notification">{notificationNumber}</div>
              )}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">sign in</a>
            <a href="/register" className="register">
              sign up
            </a>
          </>
        )}

        <div className="menuIcon">
          <img
            src="./menu.png"
            alt="menu-icon"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/list">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          {currentUser ? (
            <>
              <Link to="/profile" className="profile">
                <span>Profile</span>
              </Link>
            </>
          ) : (
            <>
              <a href="/login">Sign in</a>
              <a href="/register">Sign up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
