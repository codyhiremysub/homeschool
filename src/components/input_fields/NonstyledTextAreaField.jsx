import React, { forwardRef } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';
import FieldWrapper from './FieldWrapper';

const NonstyledTextAreaField = forwardRef(
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
      onChange,
      replaceStyled,
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
      <TextAreaAutoSize
        {...field}
        {...props}
        $hasError={form.errors[field.name] && form.touched[field.name]}
        maxRows={maxRows}
        minRows={minRows}
        onChange={(event) => {
          form.setFieldValue(field.name, normalize(event.target.value));
          onChange && onChange();
        }}
        maxLength={max}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        ref={ref}
        className='w-full resize-none appearance-none bg-white py-2 text-sm text-gray-900 placeholder-gray-400 outline-none'
      />
    </FieldWrapper>
  )
);

export default NonstyledTextAreaField;
