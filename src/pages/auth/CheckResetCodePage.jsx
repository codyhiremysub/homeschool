import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { PulseLoader } from 'react-spinners';
import {
  checkResetCode,
  sendResetCode,
} from '../../utils/requests/auth-requests';
import {
  BackToLoginButton,
  PrimaryOutlineButton,
  SubmitButton,
} from '../../components/Styled';
import { validateAuthCode } from '../../utils/helpers/input';
import InputField from '../../components/input_fields/InputField';
import { resetPasswordCode } from '../../redux/reducers/auth-reducer';

const CheckResetCodePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState();

  const { email } = useSelector((state) => state.authReducer);

  return (
    <div className='my-auto flex min-h-screen w-full items-center justify-center gap-x-[70px] divide-slate-300 px-4 sm:grid sm:px-0 sm:py-16 lg:grid-cols-2 lg:divide-x'>
      {/* Image section */}
      <img
        src='https://cdn.hiremysub.com/portal/login-pages/comparisonChartiMac.png'
        alt='iMac with hiremysub comparison chart with 3 companies.'
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
          <BackToLoginButton to='/login'>Back to Login</BackToLoginButton>
          <h1 className='my-2 text-4xl font-bold sm:text-5xl'>
            Reset Password
          </h1>
          <p className='mb-12 font-medium'>
            Enter the emailed code below to reset your password.
          </p>
          {submitError && (
            <p className='-mt-10 mb-6 text-red-500'>{submitError}</p>
          )}
          <Formik
            validateOnChange
            initialValues={{
              reset_code: '',
            }}
            validationSchema={Yup.object({
              reset_code: validateAuthCode.required('This field is required'),
            })}
            onSubmit={async (values) => {
              setSubmitError();
              try {
                const results = await checkResetCode({
                  resetCode: values.reset_code.toUpperCase(),
                  email,
                });

                dispatch(resetPasswordCode(results.user));

                navigate('/update-password');
              } catch (error) {
                setSubmitError(error);
              }
            }}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className='mb-2 w-full'>
                <Field
                  component={InputField}
                  label='Enter Code'
                  name='reset_code'
                  type='text'
                  placeholder='Enter'
                  className='mb-12'
                />

                <SubmitButton
                  type='submit'
                  className='w-full'
                  $proceedAllowed={isValid && dirty}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <PulseLoader size={10} color='white' />
                  ) : (
                    'Verify Code'
                  )}
                </SubmitButton>
              </Form>
            )}
          </Formik>
          <div className='mb-7'>
            <div className='mb-2 font-medium'>Didn't get a code?</div>
            <div className='flex flex-row justify-between'>
              <PrimaryOutlineButton
                className='h-6 w-40 text-sm'
                type='button'
                onClick={() => {
                  sendResetCode({ email }, 'email');
                }}
              >
                Resend by Email
              </PrimaryOutlineButton>
              <PrimaryOutlineButton
                className='h-6 w-40 text-sm'
                type='button'
                onClick={() => {
                  sendResetCode({ email }, 'sms');
                }}
              >
                Resend by SMS
              </PrimaryOutlineButton>
            </div>
          </div>

          <p className='text-center text-sm'>
            {`© HireMySub.com ${new Date().getFullYear()} - All Rights Reserved`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckResetCodePage;
