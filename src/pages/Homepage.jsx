import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { logout } from "../redux/actions/auth-actions";
import Goal from "../components/dashboard/Goal";
import axios from "../api/config";
import Modal from "../components/Modal";
import ModalTitle from "../components/dashboard/ModalTitle";
import { SubmitButton } from "../components/Styled";
import MyDynamicForm from "../components/input_fields/InputFieldArray";
import authorization from "../api/authorization";
import { updateAccount } from "../redux/reducers/auth-reducer";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  // const [otherGoalArea, setOtherGoalArea] = useState(false);
  const { token, user } = useSelector((state) => state.authReducer);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["goals"],
    queryFn: () => axios.get(`/goals`, authorization(token)),
  });

  const updateMutation = useMutation({
    mutationFn: (updatedLifeGoal) =>
      axios.put(`/auth/user`, updatedLifeGoal, authorization(token)),
    onSuccess: async ({ data }) => {
      dispatch(updateAccount(data.sanitizedUser));
      await refetch();
    },
  });

  useEffect(() => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    if (dayOfWeek === "Sunday" || dayOfWeek === "Monday") {
      setModal(dayOfWeek);
    }
  }, []);

  if (error) {
    <div>Something went wrong</div>;
  }

  if (isPending || !data) {
    <div>Loading... Please wait.</div>;
  }
  if (data) {
    const innerData = data.data.data;
    const actions = innerData.map((data) => data?.action);
    return (
      <>
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
          <button
            type="button"
            onClick={() => {
              setModal("goals");
            }}
          >
            View/Edit Life Goals
          </button>
          <h1 className="mb-4 mt-8 text-4xl">My Classes</h1>
          <div className="grid max-w-4xl">
            <Goal
              refetch={refetch}
              goal={innerData.find(
                (goal) => goal?.area === "Exercise Nutrition"
              )}
              area="Exercise Nutrition"
              actions={actions}
            />
            <Goal
              refetch={refetch}
              goal={innerData.find((goal) => goal?.area === "Financial")}
              area="Financial"
              actions={actions}
            />
            <Goal
              refetch={refetch}
              goal={innerData.find((goal) => goal?.area === "Testimony")}
              area="Testimony"
              actions={actions}
            />
            <Goal
              refetch={refetch}
              goal={innerData.find((goal) => goal?.area === "Character")}
              area="Character"
              actions={actions}
            />
            <Goal
              refetch={refetch}
              goal={innerData.find(
                (goal) => goal?.area === "Social Relational"
              )}
              area="Social Relational"
              actions={actions}
            />
            <Goal
              refetch={refetch}
              goal={innerData.find((goal) => goal?.area === "Career")}
              area="Career"
              actions={actions}
            />
            {/* <Goal
              refetch={refetch}
              goal={innerData.find((goal) => goal?.area === otherGoalArea)}
              setOtherGoalArea={setOtherGoalArea}
              area={otherGoalArea || user?.other_area}
            /> */}
          </div>
        </div>
        <Modal show={!!modal} onClose={() => setModal(false)}>
          {modal === "goals" && (
            <>
              <ModalTitle title="Life Goals" />
              <p>
                What do you wish your life looked like? What do you want to be
                known for? Record your life goals so you can start working
                towards them.
              </p>
              <Formik
                initialValues={{
                  life_goals: user?.life_goals || [],
                }}
                enableReinitialize
                validationSchema={Yup.object().shape({
                  life_goals: Yup.array().required(),
                })}
                onSubmit={async (values) => {
                  updateMutation.mutate(values);
                  setModal(false);
                }}
              >
                {({ isValid, dirty }) => (
                  <Form>
                    <div className="max-h-40 overflow-y-auto border border-black p-4 shadow-lg">
                      <FieldArray
                        component={MyDynamicForm}
                        name="life_goals"
                        label="Life Goals"
                      >
                        {(arrayHelpers) => (
                          <MyDynamicForm
                            arrayName="life_goals"
                            {...arrayHelpers}
                          />
                        )}
                      </FieldArray>
                    </div>

                    <SubmitButton
                      className="mt-3 px-2"
                      $proceedAllowed={isValid && dirty}
                    >
                      Submit
                    </SubmitButton>
                  </Form>
                )}
              </Formik>
            </>
          )}
          {modal === "Sunday" && (
            <>
              <ModalTitle title="Family Council" />
              <p>
                Please go through each goal and mark if you completed. Update
                the goals if the habit has been formed (At least 3 weeks).
              </p>
            </>
          )}
          {modal === "Monday" && (
            <>
              <ModalTitle title="Family Home Evening" />
              <p>
                Each family member should share something they learned this
                week. Strive to complete any tasks not yet completed from last
                week or get ahead on the current week.
              </p>
            </>
          )}
        </Modal>
      </>
    );
  }
};
export default Homepage;
