import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const FallbackErrorPage = ({ resetErrorBoundary }) => (
  <div className='flex h-screen w-screen items-center justify-center rounded-md bg-white p-4'>
    <div className='flex'>
      <div className='flex-shrink-0'>
        <AiFillBug className='h-6 w-6 text-red-500' aria-hidden='true' />
      </div>
      <div className='ml-3'>
        <h3 className='text-lg font-medium text-red-800'>
          Oops! Something went wrong on our end...
        </h3>
        <div className='mt-2 text-sm text-red-700'>
          <p>Possible solutions:</p>
          <ul className='list-disc space-y-1 pl-5'>
            <li>
              Click the home button below, then logout and sign back in to try
              again.
            </li>
            <li>Clear your cache and cookies and try again.</li>
          </ul>
        </div>
        <div className='my-6 mt-2 text-base text-red-700'>
          If the issue persists after trying the solutions above please contact
          HireMySub Support team through email at{' '}
          <a
            href='mailto:contact@hiremysub.com'
            className='cursor-pointer text-blue-500 underline'
          >
            contact@hiremysub.com
          </a>{' '}
          or by phone at{' '}
          <a
            href='tel:8668449844'
            className='cursor-pointer text-blue-500 underline'
          >
            866-844-9844
          </a>
          .
        </div>
        <Link
          to='/'
          onClick={resetErrorBoundary}
          className='rounded bg-blue-500 px-3 py-2 text-white'
        >
          Home
        </Link>
      </div>
    </div>
  </div>
);

export default FallbackErrorPage;
