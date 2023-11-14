import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Input } from '../Styled';
import FieldWrapper from './FieldWrapper';

const DebouncedInputField = React.forwardRef(
  (
    {
      id,
      className,
      field,
      form,
      disabled,
      label: inputLabel,
      type,
      max,
      min,
      placeholder,
      normalize = (value) => value,
      readOnly,
      iconSize = 24,
      icon,
      iconClass,
      onUpdate = () => {},
      wait = 2,
      noValidateMessage,
      showTooltip,
      tooltipContent,
      tooltipClass,
      ...props
    },
    ref
  ) => {
    const [savedValue, setSavedValue] = useState(
      form.initialValues[field.name]
    );
    const [updatedValue] = useDebounce(field.value, wait * 1000);

    useEffect(() => {
      if (savedValue !== updatedValue) {
        setSavedValue(updatedValue);
        onUpdate(updatedValue);
      }
    }, [savedValue, updatedValue, onUpdate]);

    return (
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
            placeholder={placeholder}
            readOnly={readOnly || disabled}
            disabled={disabled}
            ref={ref}
            className={icon && 'pr-10'}
          />
          {icon &&
            React.cloneElement(icon, {
              className: '-ml-8 ' + iconClass,
              size: iconSize,
            })}
        </div>
      </FieldWrapper>
    );
  }
);

DebouncedInputField.displayName = 'TextField';

export default DebouncedInputField;
