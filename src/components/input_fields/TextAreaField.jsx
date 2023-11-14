import React, { forwardRef } from 'react';
import FieldWrapper from './FieldWrapper';
import { Textarea } from '../Styled';

const TextAreaField = forwardRef(
  (
    {
      id,
      className,
      disabled,
      field,
      form,
      max,
      maxRows,
      minRows,
      label: inputLabel,
      placeholder,
      normalize = (value) => value,
      readOnly,
      showTooltip,
      tooltipContent,
      tooltipClass,
      noValidateMessage,
      ...props
    },
    ref
  ) => (
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
      <Textarea
        {...field}
        {...props}
        $hasError={form.errors[field.name] && form.touched[field.name]}
        maxRows={maxRows}
        minRows={minRows}
        onChange={(event) => {
          form.setFieldValue(field.name, normalize(event.target.value));
        }}
        maxLength={max}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        ref={ref}
      />
      {max && <div>{max - field.value?.length}</div>}
    </FieldWrapper>
  )
);

export default TextAreaField;
