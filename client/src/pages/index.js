import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import { useSelector, useDispatch } from 'react-redux';
import isLogin from "../common/isLogin";
import { selectLogin, setLogin } from "../redux/authSlice";

import LoginPage from "./Login";
import HomePage from './Home';
import DetailsPage from './DetailsPage';
import NotFoundPage from "./NotFound";

export default function App() {
  const login = useSelector(selectLogin);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(setLogin(isLogin())) }, [])

  return (
    <div className="App">
      {
        isLogin() ? <>
          {/* Navbar And Header */}
          <div className="siteContent" style={{ top: isLogin() ? 'var(--navBar-height)' : '0px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
              <Route path="/details/:id" element={<RequireAuth><DetailsPage /></RequireAuth>} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </> : <LoginPage />
      }
    </div>
  );
}