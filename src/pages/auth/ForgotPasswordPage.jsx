import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { PulseLoader } from 'react-spinners';
import { BackToLoginButton, SubmitButton } from '../../components/Styled';
import { validateEmail } from '../../utils/helpers/input';
import InputField from '../../components/input_fields/InputField';
import { forgotPassword } from '../../utils/requests/auth-requests';
import { forgotPassword as forgotPasswordAction } from '../../redux/reducers/auth-reducer';
import { successToast } from '../../utils/helpers/toasts';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [submitError, setSubmitError] = useState();

  return (
    <div className='my-auto flex min-h-screen w-full items-center justify-center gap-x-[70px] divide-slate-300 px-4 sm:grid sm:px-0 sm:py-16 lg:grid-cols-2 lg:divide-x'>
      {/* Image section */}
      <img
        src='https://cdn.hiremysub.com/portal/login-pages/mackBookWithLeadsPage.png'
        alt='One Iphone on top of the other displaying HireMySub screens from the portal.'
        className='hidden w-full max-w-[475px] justify-self-end lg:block'
      />
      {/* Form section */}
      <div className='w-full justify-self-start lg:px-[70px] lg:py-16'>
        <div className='wfull sm:max-w-[382px]'>
          <img
            src='logoWithTextNoHorPad.png'
            alt='HireMySub.com Logo'
            className='mb-16 block h-8'
          />
          <BackToLoginButton to='/login'>Back to Login</BackToLoginButton>
          <h1 className='my-2 text-4xl font-bold sm:text-5xl'>
            Forgot Password
          </h1>
          <p className='mb-9 w-full'>
            Please enter your email address below and we will send a reset code.
          </p>
          {submitError && (
            <p className='-mt-10 mb-6 text-red-500'>{submitError}</p>
          )}
          <Formik
            initialValues={{ email: '' }}
            validateOnChange
            validationSchema={Yup.object({
              email: validateEmail.required('This field is required'),
            })}
            onSubmit={async (values) => {
              setSubmitError();
              try {
                const results = await forgotPassword(values);
                dispatch(forgotPasswordAction({ email: values.email }));
                successToast(results.message);
                navigate('/check-reset-code');
              } catch (error) {
                setSubmitError(error);
              }
            }}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className='grid gap-y-9'>
                <Field
                  component={InputField}
                  label='Email Address'
                  type='text'
                  name='email'
                  placeholder='Enter'
                  autoComplete='email'
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
                    'Send Request'
                  )}
                </SubmitButton>
              </Form>
            )}
          </Formik>

          <p className='mt-7 w-full text-center text-sm'>
            {`© HireMySub.com ${new Date().getFullYear()} - All Rights Reserved`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
