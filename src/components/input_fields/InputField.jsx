import React from 'react';
import { Input } from '../Styled';
import FieldWrapper from './FieldWrapper';

const InputField = React.forwardRef(
  (
    {
      id,
      className,
      inputClass,
      field,
      form,
      disabled,
      label: inputLabel,
      type,
      max,
      min,
      step,
      placeholder,
      normalize = (value) => value,
      readOnly,
      icon,
      iconSize = 24,
      noValidateMessage,
      showTooltip,
      tooltipContent,
      tooltipClass,
      ...props
    },
    ref
  ) => (
    <FieldWrapper
      name={field.name}
      label={inputLabel}
      form={form}
      className={className}
      noValidateMessage={noValidateMessage}
      showTooltip={showTooltip}
      tooltipContent={tooltipContent}
      tooltipClass={tooltipClass}
    >
      <div className='flex flex-row items-center'>
        <Input
          type={type}
          {...field}
          {...props}
          $hasError={form.errors[field.name] && form.touched[field.name]}
          onChange={(event) => {
            form.setFieldValue(field.name, normalize(event.target.value));
          }}
          max={max}
          min={min}
          step={step}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          ref={ref}
          className={`${inputClass} ${icon && 'pr-10'}`}
        />
        {icon &&
          !readOnly &&
          React.cloneElement(icon, {
            className: 'text-black -ml-8',
            size: iconSize,
          })}
      </div>
    </FieldWrapper>
  )
);

InputField.displayName = 'TextField';

export default InputField;
