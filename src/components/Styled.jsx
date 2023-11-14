import { Link, NavLink } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import TextAreaAutoSize from 'react-textarea-autosize';

export const SecondaryButton = tw.button`h-8 flex flex-col justify-center items-center text-[#404E5F] border border-[#404E5F] rounded hover:bg-[#404E5F] hover:text-white`;

export const PrimaryFilledButton = tw.button`bg-blue-500 text-white rounded h-8`;

export const PrimaryOutlineButton = tw.button`h-8 rounded text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white`;

export const SubmitButton = tw.button`h-8 rounded text-white border hover:text-white
${({ $proceedAllowed }) =>
  $proceedAllowed ? 'bg-blue-500' : 'bg-gray-700 cursor-not-allowed'}
`;

export const NavButton = tw(NavLink)`rounded px-3 py-2 font-bold ${({
  isActive,
}) =>
  isActive ? 'bg-blue-50 text-blue-500' : 'text-blue-500 hover:bg-blue-50'}`;

export const BackToLoginButton = tw(Link)`block text-blue-500 font-medium`;

export const BackModalButton = tw.button`text-blue-500 font-medium hover:text-blue-700`;

export const TabButton = tw(
  NavLink
)` whitespace-nowrap py-3 px-1 border-b-2 font-bold text-xl capitalize
${(p) =>
  p.$isActive
    ? 'border-blue-500 text-blue-500'
    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`;

export const MenuItem = tw(NavLink)`
whitespace-nowrap px-1 w-full capitalize
${(p) =>
  p.$isActive ? 'text-blue-600' : 'hover:text-gray-700 hover:border-gray-300'}`;

export const Input = tw.input`w-full bg-white text-sm text-gray-900 placeholder-gray-400 rounded ${({
  readOnly,
  $hasError,
  disabled,
}) => {
  if (readOnly) {
    return 'appearance-none outline-none';
  }

  if (disabled) {
    return 'py-1 px-3 border bg-gray-100';
  }

  return `py-1 px-3 border ${
    $hasError
      ? // Error state
        ' border-red-500'
      : // Normal state
        '  border-gray-900 focus:ring-1 focus:ring-blue-700'
  }`;
}}`;

export const Select = tw.select`w-full bg-white text-sm text-gray-900 placeholder-gray-400 rounded ${({
  readOnly,
  $hasError,
  disabled,
}) => {
  if (readOnly) {
    return 'appearance-none outline-none';
  }

  if (disabled) {
    return 'py-1 px-3 border bg-gray-100';
  }

  return `form-select py-1 px-3 border ${
    $hasError
      ? // Error state
        ' border-red-500'
      : // Normal state
        '  border-gray-900 focus:ring-1 focus:ring-blue-700'
  }`;
}}`;

export const Textarea = tw(
  TextAreaAutoSize
)`resize-none w-full py-2 bg-white text-sm text-gray-900 placeholder-gray-400 ${({
  readOnly,
  $hasError,
}) =>
  readOnly
    ? // Read-only state
      'appearance-none outline-none'
    : // All editable states
      `px-3 border rounded ${
        $hasError
          ? // Error state
            'border-red-500'
          : // Normal state
            'border-gray-900 focus:ring-1 focus:ring-blue-700'
      }`}`;
