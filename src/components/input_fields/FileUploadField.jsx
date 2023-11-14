import React from 'react';
import { useDropzone } from 'react-dropzone';
import { BiTrash } from 'react-icons/bi';
import { nanoid } from 'nanoid';
import FieldWrapper from './FieldWrapper';

const FileUploadField = ({
  className,
  imgClassName,
  field,
  form,
  label: inputLabel,
  placeholder,
  maxFiles = 1,
  multiple = false,
  readOnly,
  maxSize = 10,
  showTooltip,
  tooltipContent,
  fileTypeDescription = 'File',
  tooltipClass,
  accept = {
    'image/*': [],
  },
}) => {
  const dropProps = useDropzone({
    multiple,
    maxFiles,
    validator: (file) => {
      if (file.size > maxSize * 1000000) {
        return {
          code: 'file-too-large',
          message: `File is too large (max size ${maxSize} MB)`,
        };
      }
    },
    accept,
    onDrop: (acceptedFiles) => {
      const files = [
        ...form.values[field.name],
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ];

      form.setFieldValue(field.name, files);
    },
  });

  const { getRootProps, getInputProps, fileRejections, open } = dropProps;

  const removeFile = (index) => {
    const files = [...form.values[field.name]];
    files.splice(index, 1);
    form.setFieldValue(field.name, files);
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path} className='text-[#707070]'>
      {file.path} - {Number(file.size / 1000000).toFixed(1)} MB
      <ul>
        {errors.map((error) => (
          <div key={error.code} className='text-red-500'>
            {error.message}
          </div>
        ))}
      </ul>
    </div>
  ));

  if (readOnly) {
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
        <img
          alt=''
          className={imgClassName}
          src={field?.value || placeholder}
          onLoad={() => {
            URL.revokeObjectURL(placeholder);
          }}
        />
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper
      name={field.name}
      label={inputLabel}
      form={form}
      className={className}
    >
      {form.values[field.name].length === 0 && (
        <div {...getRootProps()} className='grid w-full'>
          <input
            {...getInputProps()}
            name={field?.name}
            onBlur={(event) => {
              form?.handleBlur(event);
            }}
            disabled={readOnly}
            readOnly={readOnly}
          />
          <div className='p-x-10 flex h-28 flex-col items-center justify-center rounded border-2 border-dashed border-blue-500'>
            <div className='font-bold text-blue-500'>
              Upload {fileTypeDescription} (10MB max per file)
            </div>
            <div className='text-gray-400'>Or drag and drop it here</div>
          </div>
        </div>
      )}

      {fileRejectionItems}

      {form.values[field.name].length > 0 && (
        <>
          <div className='grid grid-cols-1 gap-y-2'>
            {form.values[field.name].map((file, index) => (
              <div
                key={nanoid()}
                className='flex flex-row items-center justify-between rounded bg-gray-100 px-4 py-2 '
              >
                {file.location ? (
                  <a
                    href={file?.location}
                    title='View/Download file'
                    className='cursor-pointer text-blue-500 hover:underline'
                  >
                    {file?.file_name}
                  </a>
                ) : (
                  <div className='cursor-not-allowed truncate'>
                    {file?.file_name || file?.path}
                  </div>
                )}
                <div>
                  <BiTrash
                    as='button'
                    className='cursor-pointer text-blue-500'
                    onClick={() => removeFile(index)}
                    size={18}
                    title='Remove file'
                  />
                </div>
              </div>
            ))}
          </div>
          {maxFiles > form.values[field.name].length && (
            <button
              type='button'
              title='Upload Another File'
              className='ml-auto mt-2 block text-blue-500'
              onClick={open}
            >
              Upload Another File
            </button>
          )}
        </>
      )}
    </FieldWrapper>
  );
};

export default FileUploadField;
