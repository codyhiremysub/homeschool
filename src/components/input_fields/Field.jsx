import React from 'react';

const Field = React.forwardRef(
  ({ formik, name, component = 'input', children = null, ...props }, ref) =>
    React.createElement(
      component,
      {
        form: formik,
        field: {
          onChange: (event) => formik.handleChange(event),
          onBlur: (event) => formik.handleBlur(event),
          name,
          value: formik.values[name],
        },
        ref,
        ...props,
      },
      children
    )
);

Field.displayName = 'Field';

export default Field;
