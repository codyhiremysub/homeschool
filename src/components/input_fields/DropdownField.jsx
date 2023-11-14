import React from 'react';
import { nanoid } from 'nanoid';
import { Select } from '../Styled';
import FieldWrapper from './FieldWrapper';

const DropdownField = ({
  id,
  className,
  field,
  form,
  disabled,
  label: inputLabel,
  type,
  placeholder,
  readOnly,
  children,
  options,
  showTooltip,
  tooltipContent,
  tooltipClass,
  ...props
}) => (
  <FieldWrapper
    name={field.name}
    label={inputLabel}
    form={form}
    className={className}
    showTooltip={showTooltip}
    tooltipContent={tooltipContent}
    tooltipClass={tooltipClass}
  >
    <Select
      {...field}
      {...props}
      $hasError={form.errors[field.name] && form.touched[field.name]}
      placeholder={placeholder}
      readOnly={readOnly || disabled}
      disabled={disabled}
    >
      <option value=''>Select</option>
      {children ||
        options?.map((option) => {
          if (typeof option === 'string') {
            return (
              <option key={nanoid()} value={option}>
                {option}
              </option>
            );
          }
          return (
            <option key={nanoid()} value={option.value}>
              {option.label}
            </option>
          );
        })}
    </Select>
  </FieldWrapper>
);

export default DropdownField;
