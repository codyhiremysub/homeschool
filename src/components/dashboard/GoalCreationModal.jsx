import React from "react";
import * as Yup from "yup";
import { useMutation, useQuery } from "react-query";
import { Field, Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import ModalTitle from "./ModalTitle";
import axios from "../../api/config";
import authorization from "../../api/authorization";
import DropdownField from "../input_fields/DropdownField";
import TextAreaField from "../input_fields/TextAreaField";
import InputField from "../input_fields/InputField";
import { SubmitButton } from "../Styled";
import areas from "../../utils/constants/input_options/areas";
import { updateAccount } from "../../redux/reducers/auth-reducer";

const GoalCreationModal = ({
  area,
  refetch,
  setModal,
  goal,
  actions,
  setOtherGoalArea,
}) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.authReducer);

  const { data } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const data = await axios.get(
        `/areas/${area}/resources`,
        authorization(token)
      );
      return data.data.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newGoal) =>
      axios.post(`/goals/${area}`, newGoal, authorization(token)),
    onSuccess: async () => {
      await refetch();
    },
  });

  //   update the other goal in the database
  const updateMutation = useMutation({
    mutationFn: (updatedLifeGoal) =>
      axios.put(`/auth/user`, updatedLifeGoal, authorization(token)),
    onSuccess: async ({ data }) => {
      dispatch(updateAccount(data.sanitizedUser));
      await refetch();
    },
  });

  console.log(area);
  return (
    <>
      <ModalTitle title={`Set ${area || "other"} Goal`} />
      <p>Set your {area} goal details.</p>
      <Formik
        initialValues={{
          action: goal?.action,
          area,
          purpose: "",
          research_question: "",
        }}
        validationSchema={Yup.object().shape({
          action: Yup.string().required("Required"),
          area: Yup.mixed().required("Required"),
          purpose: Yup.string().required("Required"),
        })}
        onSubmit={async (values) => {
          createMutation.mutate({ ...values, area: values.area.label });
          setModal(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {setOtherGoalArea && (
              <Field
                component={DropdownField}
                options={areas}
                name="area"
                label="Area"
                onChange={(event) => {
                  if (setOtherGoalArea) {
                    setOtherGoalArea(event.target.value);
                    updateMutation.mutate({ other_area: event.target.value });
                  }
                  setFieldValue("area", event.target.value);
                }}
              />
            )}
            <Field
              component={DropdownField}
              name="purpose"
              label="Life Goal"
              options={user.life_goals.map((g) => ({
                label: g,
                value: g,
              }))}
            />
            <Field
              component={TextAreaField}
              name="research_question"
              label="Research Topic and Question"
            />
            <div>
              Suggested Resources:
              <div className="grid max-h-52 overflow-y-scroll">
                {!!data?.resources &&
                  data?.resources.map((resource) => <div>{resource}</div>)}
              </div>
            </div>
            {values.area && (
              <Field
                component={InputField}
                name="action"
                label="Action"
                autocomplete
                options={actions || []}
              />
            )}

            <SubmitButton className="px-2" $proceedAllowed={values.action}>
              Submit
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GoalCreationModal;
