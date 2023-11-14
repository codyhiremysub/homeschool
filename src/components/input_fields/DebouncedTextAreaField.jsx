import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Textarea } from '../Styled';
import FieldWrapper from './FieldWrapper';

const DebouncedTextAreaField = ({
  id,
  className,
  disabled,
  field,
  form,
  max,
  label: inputLabel,
  placeholder,
  normalize = (value) => value,
  readOnly,
  onUpdate = async () => {},
  wait = 2,
  minRows,
  maxRows,
  showTooltip,
  tooltipContent,
  tooltipClass,
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
    >
      <Textarea
        {...field}
        {...props}
        $hasError={form.errors[field.name] && form.touched[field.name]}
        onChange={(event) => {
          form.setFieldValue(field.name, normalize(event.target.value));
        }}
        maxLength={max}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        minRows={minRows}
        maxRows={maxRows}
      />
      {max && <div>{max - field.value?.length}</div>}
    </FieldWrapper>
  );
};

export default DebouncedTextAreaField;
