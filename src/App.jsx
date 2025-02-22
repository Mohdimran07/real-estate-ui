import { Routes, Route } from "react-router";
import "./layout.scss";

import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import List from "./screens/ListPage/List";
import SinglePage from "./screens/SinglePage/SinglePage";
import Profile from "./screens/Profile/Profile";
import Login from "./screens/Login/Login";
import Register from "./screens/register/Register";
import AuthenticatedRoutes from "./components/Authentication/AuthenticatedRoutes";
import ProfileUpdate from "./screens/profileUpdatePage/ProfileUpdate";
import CreatePost from "./screens/createPost/CreatePost";


function App() {
  return (
    <div className="newLayout">
      <Navbar />
      <div className="newContent">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/:id" element={<SinglePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<AuthenticatedRoutes />}>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="profile/update" element={<ProfileUpdate />} />
            <Route path="profile/create" element={<CreatePost />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
