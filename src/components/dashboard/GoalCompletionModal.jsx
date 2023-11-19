import React from "react";
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { SubmitButton } from "../Styled";
import DropdownField from "../input_fields/DropdownField";
import ModalTitle from "./ModalTitle";
import axios from "../../api/config";
import authorization from "../../api/authorization";

const GoalCompletionModal = ({ goal, setModal, refetch, area }) => {
  const { token } = useSelector((state) => state.authReducer);
  const updateMutation = useMutation({
    mutationFn: (updatedGoal) =>
      axios.put(`/goals/${area}`, updatedGoal, authorization(token)),
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <>
      <ModalTitle title="Completed?" />
      <p>Verify you have completed the goal.</p>
      <Formik
        initialValues={{
          completed: false,
        }}
        validationSchema={Yup.object().shape({
          completed: Yup.string().required("Required"),
        })}
        onSubmit={async () => {
          updateMutation.mutate({ id: goal?._id });
          setModal(false);
        }}
      >
        {({ values }) => (
          <Form>
            <Field
              component={DropdownField}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              name="completion"
              label="Did you complete the goal for this week?"
            />

            <SubmitButton className="px-2" $proceedAllowed={values.completion}>
              Submit
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GoalCompletionModal;
