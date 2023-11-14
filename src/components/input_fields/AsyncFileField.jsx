import React from 'react';
import { useDropzone } from 'react-dropzone';
import { nanoid } from 'nanoid';
import FieldWrapper from './FieldWrapper';

const UploadItem = ({ file }) => (
  <div
    className={`mt-3 flex h-12 w-full items-center justify-between rounded bg-gray-100 pl-3 pr-6 ${
      file.progress === 100 ? 'hidden' : ''
    }`}
  >
    <span>{file.path}</span>
    <span className='text-gray-900'>{file.progress || 0}%</span>
  </div>
);

const AsyncFileField = ({
  className,
  field,
  form,
  label: inputLabel,
  multipleFiles = false,
  readOnly,
  maxFileSize: maxFileMB = 10,
  showTooltip,
  tooltipContent,
  tooltipClass,
  accept = {
    'image/*': [],
  },
  progress,
  onDrop = () => {},
}) => {
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: multipleFiles,
    accept,
    validator: (file) => {
      if (file.size > maxFileMB * 1000000) {
        return {
          code: 'file-too-large',
          message: `File is too large (max size ${maxFileMB} MB)`,
        };
      }
    },
    onDrop,
  });

  const acceptedFileItems = progress?.map((file) => (
    <UploadItem key={nanoid()} file={file} />
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={nanoid()} className='text-[#707070]'>
      {file.path} - {Number(file.size / 1000000).toFixed(1)} MB
      {errors.map((error) => (
        <div key={nanoid()} className='text-red-500'>
          {error.message}
        </div>
      ))}
    </div>
  ));

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

        <div className='p-x-10 flex h-20 flex-col items-center justify-center rounded border-2 border-dashed border-blue-500'>
          <span className='font-bold text-blue-500'>
            Select and Upload ({maxFileMB}MB max per file)
          </span>
          <span className='text-gray-400'>Or drag and drop it here</span>
        </div>

        {fileRejectionItems}
        {acceptedFileItems}
      </div>
    </FieldWrapper>
  );
};

export default AsyncFileField;
