import React, { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../utils/requests/auth-requests";
import { logout } from "../redux/actions/auth-actions";
import { updateAccount } from "../redux/reducers/auth-reducer";

const PrivateRouteWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = secureLocalStorage.getItem(
    "2e8c8902194449cea48e678aa9331049"
  );
  const { token } = useSelector((state) => state.authReducer);

  const refreshUser = async () => {
    try {
      const { user } = await fetchUser(token);
      if (user) {
        dispatch(updateAccount(user));
      }
    } catch (error) {
      dispatch(logout(navigate, token));
    }
  };

  useEffect(() => {
    if (token) {
      refreshUser();
    }
  }, [token]);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteWrapper;
