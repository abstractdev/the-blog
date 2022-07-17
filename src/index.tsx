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
import ProtectedUser from "./components/Protected/ProtectedUser";
import ProtectedAuthor from "./components/Protected/ProtectedAuthor";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/the-blog">
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/author" element={<AuthorSignup />} />
          <Route path="/:blogpostTitle" element={<Blogpost />} />
          <Route
            path="/profile"
            element={
              <ProtectedUser>
                <Profile />
              </ProtectedUser>
            }
          />
          <Route
            path="/author/create"
            element={
              <ProtectedAuthor>
                <AuthorCreate />
              </ProtectedAuthor>
            }
          />
          <Route
            path="/author/edit/:blogpostTitle/:blogpostId"
            element={
              <ProtectedAuthor>
                <AuthorEdit />
              </ProtectedAuthor>
            }
          />
          <Route
            path="/author/view"
            element={
              <ProtectedAuthor>
                <AuthorView />
              </ProtectedAuthor>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
