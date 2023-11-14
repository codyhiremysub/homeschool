import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PulseLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { SubmitButton } from "../../components/Styled";
import { validateEmail, validatePassword } from "../../utils/helpers/input";
import InputField from "../../components/input_fields/InputField";
import { login } from "../../utils/requests/auth-requests";
import { successToast } from "../../utils/helpers/toasts";
import { login as loginAction } from "../../redux/reducers/auth-reducer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitError, setSubmitError] = useState("");

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex h-screen flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            {submitError && <p className=" text-red-500">{submitError}</p>}
          </div>

          <div className="mt-10">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validateOnChange
              validationSchema={Yup.object({
                email: validateEmail.required("This field is required"),
                password: validatePassword.required("This field is required"),
              })}
              onSubmit={async (values) => {
                setSubmitError();
                try {
                  const results = await login(values);
                  dispatch(
                    loginAction({
                      userId: results.user_id,
                    })
                  );
                  successToast(results.message);
                  navigate("/login-mfa");
                } catch (error) {
                  setSubmitError(error);
                }
              }}
            >
              {({ isValid, dirty, isSubmitting }) => (
                <Form className="space-y-6">
                  <Field
                    component={InputField}
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter"
                    autoComplete="email"
                    className="mb-6"
                  />
                  <Field
                    component={InputField}
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter"
                    autoComplete="password"
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between">
                    <Link
                      to="/forgot-password"
                      className="mb-[52px] block text-right text-sm font-medium text-blue-500 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <SubmitButton
                    type="submit"
                    className="w-full text-center font-medium"
                    $proceedAllowed={isValid && dirty}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <PulseLoader size={10} color="white" />
                    ) : (
                      "Login"
                    )}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1585432959449-b1c9c8cc49ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
};

export default LoginPage;
