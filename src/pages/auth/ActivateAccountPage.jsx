import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { PrimaryFilledButton } from '../../components/Styled';
import axios from '../../api/config';
import authorization from '../../api/authorization';
import { successToast } from '../../utils/helpers/toasts';

const ActivateAccountPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [tokenVerified, setTokenVerified] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const activateAccountHandler = async () => {
    setLoading(true);
    try {
      await axios.post('auth/activate-account', {}, authorization(token));

      setTokenVerified(true);
      successToast('Account has been activated. You may now login.');
    } catch (error) {
      setError(error.response.data.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      activateAccountHandler();
      // setTimeout(() => navigate('/'), 5000);
    }
  }, []);

  return (
    <div className='flex min-h-screen flex-row items-center justify-center gap-x-8 lg:-mb-16 lg:-mt-32 '>
      {tokenVerified && (
        <div className='max-w-md text-center'>
          <img
            src='logoWithTextNoHorPad.png'
            alt='HireMySub.com Logo'
            className='mb-16 block h-8'
          />
          <h1 className='mb-2 text-4xl font-bold sm:text-5xl'>Welcome</h1>

          <p className='mb-12'>
            Once activated will be navigated automatically. Click the button
            below to login if something goes wrong.
          </p>

          <PrimaryFilledButton
            className='w-40'
            onClick={() => navigate('/')}
            disabled={loading}
          >
            {loading ? <PulseLoader size={10} color='white' /> : 'Login'}
          </PrimaryFilledButton>
        </div>
      )}
      {error && (
        <div className='max-w-md place-content-center'>
          Token Expired. Please request a new email to activate your account.
        </div>
      )}
    </div>
  );
};

export default ActivateAccountPage;
