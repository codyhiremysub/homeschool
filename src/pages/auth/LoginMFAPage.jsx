import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { PulseLoader } from 'react-spinners';
import {
  BackToLoginButton,
  PrimaryOutlineButton,
  SubmitButton,
} from '../../components/Styled';
import InputField from '../../components/input_fields/InputField';
import { successToast } from '../../utils/helpers/toasts';
import { checkMFALogin, sendMFACode } from '../../utils/requests/auth-requests';
import { mfaLogin } from '../../redux/reducers/auth-reducer';

const LoginMFAPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resendLoading, setResendLoading] = useState(false);
  const [submitError, setSubmitError] = useState();

  const { userId } = useSelector((state) => state.authReducer);

  return (
    <div className='my-auto flex min-h-screen w-full items-center justify-center gap-x-[70px] divide-slate-300 px-4 sm:grid sm:px-0 sm:py-16 lg:grid-cols-2 lg:divide-x'>
      {/* Image section */}
      <img
        src='https://cdn.hiremysub.com/portal/login-pages/iphoneWithSearchResults.png'
        alt='Login with MFA'
        className='hidden w-full max-w-[475px] justify-self-end lg:block'
      />
      {/* Form section */}
      <div className='w-full justify-self-start lg:px-[70px] lg:py-16'>
        <div className='max-w-[382px]'>
          <img
            src='logoWithTextNoHorPad.png'
            alt='HireMySub.com Logo'
            className='mb-16 block h-8'
          />
          <BackToLoginButton to='/login'>Back to Login</BackToLoginButton>
          <h1 className='my-2 text-4xl font-bold sm:text-5xl'>Enter Code</h1>
          <p className='mb-12'>
            Enter the emailed code below to login to the portal.
          </p>
          {submitError && (
            <p className='-mt-10 mb-6 text-red-500'>{submitError}</p>
          )}
          <Formik
            validateOnChange
            initialValues={{
              code: '',
            }}
            validationSchema={Yup.object({
              code: Yup.string().required('This field is required'),
            })}
            onSubmit={async (values) => {
              setSubmitError();
              setResendLoading(true);

              try {
                const results = await checkMFALogin({
                  id: userId,
                  code: values.code.toUpperCase(),
                });
                dispatch(
                  mfaLogin({
                    user: results?.user,
                    token: results?.token,
                  })
                );

                successToast(results.message);
                navigate('/');
              } catch (error) {
                setSubmitError(error);
              }
              setResendLoading(false);
            }}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form>
                <Field
                  component={InputField}
                  label='Enter Code'
                  name='code'
                  type='text'
                  placeholder='Enter'
                  className='mb-16'
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
                onClick={() => {
                  setSubmitError('');
                  sendMFACode({ id: userId }, 'email');
                }}
                className='h-6 w-40 text-sm'
                disabled={resendLoading}
              >
                Resend by Email
              </PrimaryOutlineButton>
              <PrimaryOutlineButton
                onClick={() => {
                  setSubmitError('');
                  sendMFACode({ id: userId }, 'sms');
                }}
                disabled={resendLoading}
                className='h-6 w-40 text-sm'
              >
                Resend by SMS
              </PrimaryOutlineButton>
            </div>
          </div>
          <div className='mt-6 text-center text-sm'>
            <p>
              {`© HireMySub.com ${new Date().getFullYear()} - All Rights Reserved`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMFAPage;
