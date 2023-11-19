/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Input } from "../Styled";
import FieldWrapper from "./FieldWrapper";

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
      autocomplete,
      options,
      inFieldArray,
      ...props
    },
    ref
  ) => {
    const [suggestions, setSuggestions] = useState([]);
    const [tempValue, setTempValue] = useState(field.value);
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
        <div className="flex flex-row items-center">
          <Input
            type={type}
            {...field}
            $hasError={form.errors[field.name] && form.touched[field.name]}
            onChange={(event) => {
              if (inFieldArray) {
                setTempValue(event.target.value);
                return;
              }
              form.setFieldValue(field.name, normalize(event.target.value));
              if (autocomplete) {
                const filteredSuggestions = options.filter((suggestion) =>
                  suggestion.toLowerCase().includes(field.value.toLowerCase())
                );
                if (field.value?.length > 2) {
                  setSuggestions(filteredSuggestions);
                } else {
                  setSuggestions([]);
                }
              }
            }}
            onBlur={() => {
              if (inFieldArray) {
                console.log(tempValue, field.name);
                form.setFieldValue(field.name, tempValue);
                console.log(form);
              }
            }}
            value={inFieldArray ? tempValue : field.value}
            {...props}
            max={max}
            min={min}
            step={step}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            ref={ref}
            className={`${inputClass} ${icon && "pr-10"}`}
          />
          {icon &&
            !readOnly &&
            React.cloneElement(icon, {
              className: "text-black -ml-8",
              size: iconSize,
            })}
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute w-full border border-black bg-white">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => {
                  form.setFieldValue(field.name, normalize(suggestion));
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </FieldWrapper>
    );
  }
);

InputField.displayName = "TextField";

export default InputField;
