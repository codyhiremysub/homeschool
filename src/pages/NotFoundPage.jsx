import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryFilledButton } from '../components/Styled';

const NotFoundPage = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        'flex min-h-screen flex-row items-center justify-center gap-x-8 lg:-mb-16 lg:-mt-32 ' +
        className
      }
    >
      <div className='max-w-md text-center'>
        <h1 className='pb-2 text-7xl font-bold text-blue-500'>404</h1>
        <h2 className='py-2 text-5xl font-bold text-gray-800'>
          Page Not Found
        </h2>
        <p className='mb-4 py-2 text-base text-gray-600'>
          The page you are looking might have been moved or no longer exists.
        </p>
        <PrimaryFilledButton className='w-40' onClick={() => navigate('/')}>
          Back to Home
        </PrimaryFilledButton>
      </div>
      <div className='hidden max-w-md place-content-center lg:grid'>
        <img
          src='https://i.ibb.co/JjmY1tm/tuk-component.png'
          alt='girl in an underconstruction site'
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
