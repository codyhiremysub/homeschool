import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { updatePassword } from '../../utils/requests/auth-requests';
import { BackToLoginButton, SubmitButton } from '../../components/Styled';
import { validatePassword } from '../../utils/helpers/input';
import InputField from '../../components/input_fields/InputField';
import { successToast } from '../../utils/helpers/toasts';

const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.authReducer);
  const [submitError, setSubmitError] = useState();

  return (
    <div className='my-auto flex min-h-screen w-full items-center justify-center gap-x-[70px] divide-slate-300 px-4 sm:grid sm:px-0 sm:py-16 lg:grid-cols-2 lg:divide-x'>
      {/* Image section */}
      <img
        src='https://cdn.hiremysub.com/portal/login-pages/tabletWithLeadsPage.png'
        alt='Update Password'
        className='hidden w-full max-w-[475px] justify-self-end lg:block'
      />
      {/* Form section */}
      <div className='w-full justify-self-start lg:px-[70px] lg:py-16'>
        <div className='w-full sm:max-w-[382px]'>
          <img
            src='logoWithTextNoHorPad.png'
            alt='HireMySub.com Logo'
            className='mb-16 block h-8'
          />
          <BackToLoginButton to='/login' className='block'>
            Back to Login
          </BackToLoginButton>
          <h1 className='my-2 text-4xl font-bold sm:text-5xl'>
            Update Password
          </h1>
          <p className='mb-7 w-full font-medium'>
            Enter your new password to complete the update.
          </p>
          {submitError && (
            <p className='-mt-6 mb-6 text-red-500'>{submitError}</p>
          )}

          <Formik
            initialValues={{
              password: '',
              confirm_password: '',
            }}
            validateOnChange
            validationSchema={Yup.object({
              password: validatePassword.required('This field is required'),
              confirm_password: validatePassword
                .equals([Yup.ref('password'), null], 'Passwords must match')
                .required('This field is required'),
            })}
            onSubmit={async (values) => {
              setSubmitError();
              try {
                await updatePassword({
                  email,
                  password: values.password,
                });
                successToast('Successfully updated password');
                navigate('/login');
              } catch (error) {
                setSubmitError(error);
              }
            }}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className='mb-7'>
                <Field
                  label='Password'
                  component={InputField}
                  name='password'
                  type='password'
                  placeholder='Enter'
                  autoComplete='new-password'
                  className='mb-6'
                />
                <Field
                  label='Confirm Password'
                  component={InputField}
                  name='confirm_password'
                  type='password'
                  placeholder='Enter'
                  autoComplete='new-password'
                  className='mb-14'
                />
                <SubmitButton
                  type='submit'
                  className='mb-4 w-full text-center font-medium'
                  $proceedAllowed={isValid && dirty}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <PulseLoader size={10} color='white' />
                  ) : (
                    'Update Password'
                  )}
                </SubmitButton>
              </Form>
            )}
          </Formik>

          <p className='text-center text-sm'>
            &copy; HireMySub.com 2022 - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
