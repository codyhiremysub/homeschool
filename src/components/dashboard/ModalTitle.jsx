import { Dialog } from '@headlessui/react';
import React from 'react';

const ModalTitle = ({ Icon, iconColor, title }) => (
  <>
    {Icon && (
      <div
        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-${iconColor}-100`}
      >
        <Icon className={`h-6 w-6 text-${iconColor}-600`} aria-hidden='true' />
      </div>
    )}
    <div className='mb-3 sm:mb-5' />
    <Dialog.Title
      as='h3'
      className='mb-2 text-center text-base font-semibold leading-6 text-gray-900'
    >
      {title}
    </Dialog.Title>
  </>
);

export default ModalTitle;
