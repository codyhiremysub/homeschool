import React from 'react';

const Tooltip = ({
  content,
  children,
  show = false,
  tooltipClass = 'mt-6 bg-blue-800',
}) => (
  <div className='group'>
    {show && (
      <span
        className={
          'absolute z-50 max-w-sm scale-0 rounded p-2 text-sm text-white transition-all group-hover:scale-100 ' +
          tooltipClass
        }
      >
        {content}
      </span>
    )}
    {children}
  </div>
);

export default Tooltip;
