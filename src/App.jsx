import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import "./layout.scss";

import Navbar from "./components/Navbar/Navbar";
import Toast from "./components/toast/Toast";
const Home = lazy(() => import("./screens/Home/Home"));
const List = lazy(() => import("./screens/ListPage/List"));
const SinglePage = lazy(() => import("./screens/SinglePage/SinglePage"));
const Profile = lazy(() => import("./screens/Profile/Profile"));
const Login = lazy(() => import("./screens/Login/Login"));
const Register = lazy(() => import("./screens/register/Register"));
const AuthenticatedRoutes = lazy(() =>
  import("./components/Authentication/AuthenticatedRoutes")
);
const ProfileUpdate = lazy(() =>
  import("./screens/profileUpdatePage/ProfileUpdate")
);
const CreatePost = lazy(() => import("./screens/createPost/CreatePost"));

function App() {
  return (
    <div className="newLayout">
      <Navbar />
      <div className="newContent">
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
      <Toast />
    </div>
  );
}

export default App;
