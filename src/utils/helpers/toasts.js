import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * It takes a message and a number of seconds to display the message using the green toast style, and then displays the message for
 * the specified number of seconds
 * @param message - The message to be displayed
 * @param [seconds=5000] - The number of milliseconds to display the toast.
 */
export const successToast = (message, seconds = 5000) =>
  toast.success(message, {
    position: 'top-right',
    autoClose: seconds,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

/**
 * It takes a message and a number of seconds to display the message using the red toast style, and then displays the message for
 * the specified number of seconds
 * @param message - The message to be displayed
 * @param [seconds=5000] - The number of milliseconds to display the toast.
 */
export const errorToast = (message, seconds = 5000) =>
  toast.error(message, {
    position: 'top-right',
    autoClose: seconds,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

/**
 * It takes a message and a number of seconds to display the message using the blue toast style, and then displays the message for
 * the specified number of seconds
 * @param message - The message to be displayed
 * @param [seconds=5000] - The number of milliseconds to display the toast.
 */
export const infoToast = (message, seconds = 5000) =>
  toast.info(message, {
    position: 'top-right',
    autoClose: seconds,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const Toast = ({ containerStyle, toastStyle, icon }) => (
  <ToastContainer style={containerStyle} toastStyle={toastStyle} icon={icon} />
);
