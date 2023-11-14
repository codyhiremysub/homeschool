import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/auth-actions";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.authReducer);

  return (
    <div>
      <h1>Homepage</h1>
      <button
        className="bg-red-500"
        type="button"
        onClick={() => {
          dispatch(logout(navigate, token));
        }}
      >
        Logout
      </button>
      <div className="grid">
        <div>Exercise Nutrition</div>
        <div>Hygiene Cleanliness</div>
        <div>Financial</div>
        <div>Testimony</div>
        <div>Character</div>
        <div>Social</div>
        <div>Career</div>
        <div>Other</div>
      </div>
    </div>
  );
};
export default Homepage;
