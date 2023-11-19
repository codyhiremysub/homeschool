/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Form, Field } from "formik";
import { nanoid } from "nanoid";
import { BsFillTrash3Fill } from "react-icons/bs";
import InputField from "./InputField";

const MyDynamicForm = ({ push, remove, form, name }) => (
  <div>
    {form.values[name].map((item, index) => (
      <Field
        key={nanoid()}
        component={InputField}
        inFieldArray
        placeholder={`Item ${index + 1}`}
        icon={
          <button type="button">
            <BsFillTrash3Fill color="red" onClick={() => remove(index)} />
          </button>
        }
        name={`${name}.${index}`}
      />
    ))}
    <button
      type="button"
      onClick={() => {
        push("");
      }}
    >
      Add Item
    </button>
  </div>
);
export default MyDynamicForm;
