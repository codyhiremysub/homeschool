import React from 'react';
import { nanoid } from 'nanoid';
import { BiTrash } from 'react-icons/bi';
import NonstyledTextAreaField from './NonstyledTextAreaField';
import Field from './Field';
import { openInNewTab } from '../../utils/helpers/navigation';

const TextAreaWithFilesField = ({ formik, name, filesFieldName, ...props }) => (
  <div className='mb-2 w-full rounded border border-gray-900 pl-3 focus:ring-1 focus:ring-blue-700'>
    <Field
      component={NonstyledTextAreaField}
      formik={formik}
      name={name}
      {...props}
    />
    {formik.values[filesFieldName].length > 0 && (
      <div className='flex flex-wrap gap-3 pb-3'>
        {formik.values[filesFieldName].map((file, index) => (
          <div
            key={nanoid()}
            className='flex w-40 items-center justify-between gap-2 rounded bg-gray-100 px-4 py-2'
          >
            {file.preview || file.location ? (
              <button
                type='button'
                onClick={() => {
                  openInNewTab(file?.preview || file.location);
                }}
                title='View/Download file'
                className='w-28 cursor-pointer truncate text-left text-xs text-blue-500 hover:underline'
              >
                {file?.path}
              </button>
            ) : (
              <div
                className='w-28 cursor-not-allowed truncate text-left text-xs'
                title={file?.file_name}
              >
                {file?.file_name || file?.path}
              </div>
            )}
            <BiTrash
              className='w-6 cursor-pointer text-blue-500'
              onClick={() => {
                const files = [...formik.values[filesFieldName]];
                files.splice(index, 1);
                formik.setFieldValue(filesFieldName, files);
              }}
              size={18}
              title='Remove file'
            />
          </div>
        ))}
      </div>
    )}
  </div>
);

export default TextAreaWithFilesField;
