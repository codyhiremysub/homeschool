import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { logout } from "../redux/actions/auth-actions";
import Goal from "../components/dashboard/Goal";
import axios from "../api/config";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.authReducer);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["goals"],
    queryFn: () => axios.get(`/goals`),
  });
  console.log(data);
  if (error) {
    <div>Something went wrong</div>;
  }

  if (isPending || !data) {
    <div>Loading... Please wait.</div>;
  }
  if (data) {
    const innerData = data.data.data;
    return (
      <div>
        <h1>Lillywhite School of Wellness</h1>
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
          <Goal
            refetch={refetch}
            goal={innerData.find((goal) => goal?.area === "Exercise")}
            area="Exercise"
          />
          <Goal
            refetch={refetch}
            goal={innerData.find((goal) => goal?.area === "Financial")}
            area="Financial"
          />
          <Goal
            refetch={refetch}
            goal={innerData.find((goal) => goal?.area === "Testimony")}
            area="Testimony"
          />
          <Goal
            refetch={refetch}
            goal={innerData.find((goal) => goal?.area === "Character")}
            area="Character"
          />
          <Goal
            refetch={refetch}
            goal={innerData.find((goal) => goal?.area === "Social")}
            area="Social"
          />
          <Goal
            refetch={refetch}
            goal={innerData.find((goal) => goal?.area === "Career")}
            area="Career"
          />
          <Goal
            refetch={refetch}
            goal={innerData.find((goal) => goal?.area === "Other")}
          />
        </div>
      </div>
    );
  }
};
export default Homepage;
