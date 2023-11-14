/* eslint-disable arrow-body-style */
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useMutation } from "react-query";
// import { useSelector } from "react-redux";
import * as Yup from "yup";
import Modal from "../Modal";
import ModalTitle from "./ModalTitle";
import InputField from "../input_fields/InputField";
import { PrimaryFilledButton, SubmitButton } from "../Styled";
import axios from "../../api/config";
import DropdownField from "../input_fields/DropdownField";
import stamp from "../../assets/dino1.png";

const Goal = ({ area, goal, refetch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSettingGoal, setIsSettingGoal] = useState(false);

  const mutation = useMutation({
    mutationFn: (newGoal) => {
      return axios.post(`/goals/${area}`, newGoal);
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedGoal) => {
      return axios.put(`/goals/${area}`, updatedGoal);
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <>
      <div className="flex justify-between border border-gray-500 bg-neutral-300 p-2">
        <button onClick={() => setIsEditing(true)} type="button">
          <div>{goal?.action || `Set your ${area || "Other"} goal`}</div>
          <div>
            {goal?.completions.map(() => (
              <img
                className="inline h-12 w-12"
                src={stamp}
                alt="sticker for completion"
              />
            ))}
          </div>
        </button>
        <PrimaryFilledButton
          onClick={() => {
            setIsSettingGoal(true);
            setIsEditing(true);
          }}
          type="button"
        >
          Replace
        </PrimaryFilledButton>
      </div>
      <Modal show={isEditing} onClose={() => setIsEditing(false)}>
        {!isSettingGoal ? (
          <>
            <ModalTitle title="Update Goal" />
            <p>Verify you have completed the goal.</p>
            <Formik
              initialValues={{
                completed: false,
              }}
              validationSchema={Yup.object().shape({
                completed: Yup.string().required(),
              })}
              onSubmit={async () => {
                updateMutation.mutate({ id: goal?._id });
                setIsEditing(false);
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

                  <SubmitButton
                    className="px-2"
                    $proceedAllowed={values.completion}
                  >
                    Submit
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <ModalTitle title="Set Goal" />
            <p>Set your {area} goal details.</p>
            <Formik
              initialValues={{
                action: goal?.action,
                area,
              }}
              validationSchema={Yup.object().shape({
                action: Yup.string().required(),
                area: Yup.string().required(),
              })}
              onSubmit={async (values) => {
                mutation.mutate(values);
                setIsEditing(false);
                setIsSettingGoal(false);
              }}
            >
              {({ values }) => (
                <Form>
                  <Field component={InputField} name="action" label="Action" />
                  {!area && (
                    <Field
                      component={DropdownField}
                      options={["testimony"]}
                      name="area"
                      label="area"
                    />
                  )}
                  <SubmitButton
                    className="px-2"
                    $proceedAllowed={values.action}
                  >
                    Submit
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Modal>
    </>
  );
};

export default Goal;
