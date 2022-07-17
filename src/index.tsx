import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/Global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App/App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserSignup from "./pages/UserSignup/UserSignup";
import Blogpost from "./pages/Blogpost/Blogpost";
import Profile from "./pages/Profile/Profile";
import AuthorSignup from "./pages/AuthorSignup/AuthorSignup";
import AuthorCreate from "./pages/AuthorCreate/AuthorCreate";
import AuthorView from "./pages/AuthorView/AuthorView";
import AuthorEdit from "./pages/AuthorEdit/AuthorEdit";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/author" element={<AuthorSignup />} />
          <Route path="/:blogpostTitle" element={<Blogpost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/author/create" element={<AuthorCreate />} />
          <Route path="/author/edit/:blogpostTitle/:blogpostId" element={<AuthorEdit />} />
          <Route path="/author/view" element={<AuthorView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
