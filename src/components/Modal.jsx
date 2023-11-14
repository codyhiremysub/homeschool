import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({ show, onClose, onBack, children, className }) => (
  <Transition appear show={show} as={Fragment}>
    <Dialog as='div' className='relative z-10' onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-gray-500 bg-opacity-40' />
      </Transition.Child>
      <div className='fixed inset-x-4 inset-y-[1%] mt-16 overflow-y-auto'>
        <div className='flex min-h-[98%] items-center justify-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
              <button
                type='button'
                title='Close'
                onClick={() => (onBack ? onBack() : onClose())}
                className='fixed right-5 top-5 h-[19px] text-blue-500 hover:underline'
              >
                Back
              </button>
              <div className={`max-h-[70vh] overflow-y-auto ${className}`}>
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default Modal;
