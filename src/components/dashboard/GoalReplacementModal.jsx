import React, { useState } from "react";
import * as Yup from "yup";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import authorization from "../../api/authorization";
import ModalTitle from "./ModalTitle";
import InputField from "../input_fields/InputField";
import DropdownField from "../input_fields/DropdownField";
import TextAreaField from "../input_fields/TextAreaField";
import { SubmitButton } from "../Styled";
import axios from "../../api/config";
import areas from "../../utils/constants/input_options/areas";

const GoalReplacementModal = ({ area, refetch, goal, setModal, actions }) => {
  const { token, user } = useSelector((state) => state.authReducer);

  const [showArea, setShowArea] = useState();

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

  return (
    <>
      <ModalTitle title={`Replace ${area} Goal`} />
      <p className="text-sm">
        You should not change goals until you have formed a habit. Once the
        habit is formed you may replace your goal and add this habit to your
        goal tracker app.
      </p>
      <button
        type="button"
        className="text-xs text-blue-500"
        onClick={() => {
          setShowArea(!showArea);
        }}
      >
        {showArea ? "Hide" : "Show"} area selection
      </button>
      <Formik
        initialValues={{
          action: goal?.action,
          area: { label: area, value: area },
          purpose: goal?.purpose,
          research_question: goal?.research_question,
        }}
        validationSchema={Yup.object().shape({
          action: Yup.string().required("Required"),
          area: Yup.mixed().required("Required"),
        })}
        onSubmit={async (values) => {
          createMutation.mutate({ ...values, area: values.area.label });
          setModal(false);
        }}
      >
        {({ values }) => (
          <Form>
            {showArea && (
              <Field
                component={DropdownField}
                options={areas}
                name="area"
                label="Area"
              />
            )}
            <Field
              component={InputField}
              name="action"
              label="Action"
              autocomplete
              options={actions}
            />
            <Field
              component={DropdownField}
              name="purpose"
              label="Life Goal"
              options={user?.life_goals.map((g) => ({
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
              <div className="grid max-h-24 overflow-y-scroll">
                {!!data?.resources &&
                  data?.resources.map((resource) => <div>{resource}</div>)}
              </div>
            </div>
            <SubmitButton className="px-2" $proceedAllowed={values.action}>
              Submit
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GoalReplacementModal;
