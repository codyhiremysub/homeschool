import React from 'react';
import { MdError } from 'react-icons/md';
import Tooltip from '../Tooltip';

const FieldWrapper = ({
  form,
  label,
  name,
  children,
  showTooltip = false,
  tooltipContent,
  tooltipClass,
  className = '',
  noValidateMessage = false,
}) => (
  <div className={className}>
    <div className='mb-1 flex w-full flex-col'>
      {label && (
        <label className='mb-1 font-bold text-gray-900' htmlFor={name}>
          {label}
        </label>
      )}
      <Tooltip
        show={showTooltip}
        content={tooltipContent}
        tooltipClass={tooltipClass}
      >
        {children}
      </Tooltip>
    </div>
    {!noValidateMessage && form.errors[name] && form.touched[name] && (
      <div className='flex flex-row items-center gap-x-2 text-red-500'>
        <MdError size={20} />
        {form.errors[name]}
      </div>
    )}
  </div>
);

export default FieldWrapper;
