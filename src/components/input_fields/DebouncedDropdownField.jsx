import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { nanoid } from 'nanoid';
import { Select } from '../Styled';
import FieldWrapper from './FieldWrapper';

const DebouncedDropdownField = ({
  id,
  className,
  field,
  form,
  disabled,
  label: inputLabel,
  type,
  placeholder = 'Select',
  readOnly,
  children,
  options,
  onUpdate,
  wait = 2,
  showTooltip,
  tooltipContent,
  tooltipClass,
  noValidateMessage,
  ...props
}) => {
  const [savedValue, setSavedValue] = useState(form.initialValues[field.name]);
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
      showTooltip={showTooltip}
      tooltipContent={tooltipContent}
      tooltipClass={tooltipClass}
      noValidateMessage={noValidateMessage}
    >
      <Select
        {...field}
        {...props}
        $hasError={form.errors[field.name] && form.touched[field.name]}
        placeholder={placeholder}
        readOnly={readOnly || disabled}
        disabled={disabled}
      >
        <option value=''>{placeholder}</option>
        {children ||
          options?.map((option) => (
            <option key={nanoid()} value={option?.value || option}>
              {option?.label || option}
            </option>
          ))}
      </Select>
    </FieldWrapper>
  );
};

export default DebouncedDropdownField;
