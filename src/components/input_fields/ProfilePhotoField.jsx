import React from 'react';
import { useDropzone } from 'react-dropzone';
import { nanoid } from 'nanoid';
import FieldWrapper from './FieldWrapper';

const ProfilePhotoField = ({
  className,
  imgClassName,
  field,
  form,
  label: inputLabel,
  placeholder,
  multipleFiles = false,
  readOnly,
  maxFileSize: maxFileMB = 5,
  disabled = false,
  uploadContainerClass,
  showTooltip,
  tooltipContent,
  tooltipClass,
  accept = {
    'image/*': [],
  },
}) => {
  const { getRootProps, getInputProps, fileRejections, acceptedFiles } =
    useDropzone({
      multiple: multipleFiles,
      disabled,
      validator: (file) => {
        if (file.size > maxFileMB * 1000000) {
          return {
            code: 'file-too-large',
            message: `File is too large (max size 5 MB)`,
          };
        }
      },
      accept,
      onDrop: (acceptedFiles) => {
        form.setFieldValue(
          field.name,
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        form.setFieldTouched(field.name);
      },
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <div key={nanoid()} className='text-[#707070]'>
      {file.path}
    </div>
  ));

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
          className={
            'h-32 w-32 rounded-full border object-cover ' + imgClassName
          }
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
      <div {...getRootProps()} className='grid w-full'>
        <input
          {...getInputProps()}
          name={field?.name}
          onBlur={(event) => {
            form?.handleBlur(event);
          }}
          disabled={disabled}
          readOnly={readOnly}
        />

        {Array.isArray(field.value) && field?.value?.length > 0 && (
          <img
            src={field?.value[0]?.preview}
            className={
              'h-32 w-32 rounded-full border object-cover ' + imgClassName
            }
            alt=''
          />
        )}
        {!field?.value?.length > 0 &&
          !field?.value?.includes('cdn.hiremysub.com') && (
            <div
              className={
                `flex flex-col items-center justify-center border-2 border-dashed border-blue-500 ` +
                uploadContainerClass
              }
            >
              <span className='font-bold text-blue-500'>
                Click or Drag here
              </span>
              <span className='text-gray-400'>(max size {maxFileMB} MB)</span>
            </div>
          )}
        {field?.value?.includes('cdn.hiremysub.com') && (
          <img
            src={field?.value}
            alt={field?.value}
            className={
              'h-32 w-32 rounded-full border object-cover ' + imgClassName
            }
          />
        )}
        {fileRejectionItems}
        {acceptedFileItems}
      </div>
    </FieldWrapper>
  );
};

export default ProfilePhotoField;
