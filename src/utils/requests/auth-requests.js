import secureLocalStorage from 'react-secure-storage';
import axios from '../../api/config';
import { errorToast, successToast } from '../helpers/toasts';
import authorization from '../../api/authorization';
import { createFormDataFromObject } from '../helpers/input';

export const login = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post('auth/login', body);

      resolve(res.data);
    } catch (error) {
      reject(
        error?.response?.data?.error ||
          'Something went wrong on our end. If problem persists, please contact support for assistance.'
      );
    }
  });

export const checkMFALogin = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put('auth/check-mfa-code', body);

      secureLocalStorage.setItem('2e8c8902194449cea48e678aa9331049', true);

      resolve(res.data);
    } catch (error) {
      reject(
        error?.response?.data?.error ||
          'Something went wrong on our end. If problem persists, contact support for assistance.'
      );
    }
  });

export const sendMFACode = async (body, method) => {
  try {
    const res = await axios.post(`auth/send-mfa-code/${method}`, body);

    successToast(res.data.message);
  } catch (error) {
    errorToast(
      error.response?.data?.error || 'Something went wrong, please try again.'
    );
  }
};

export const forgotPassword = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put('auth/reset', body);

      resolve(res.data);
    } catch (error) {
      reject(
        error?.response?.data?.error ||
          'Something went wrong on our end. If problem persists, contact support at contact@hiremysub.com'
      );
    }
  });

export const updatePassword = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      await axios.put('auth/update-password', body);

      resolve();
    } catch (error) {
      reject(
        error?.response?.data?.errors?.map((error) => error.msg).join(', ') ||
          error?.response?.data?.error ||
          'Something went wrong on our end. If problem persists, contact support at contact@hiremysub.com'
      );
    }
  });

export const checkResetCode = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put('auth/check-reset-code', body);
      resolve(res.data);
    } catch (error) {
      reject(
        error?.response?.data?.error ||
          'Something went wrong on our side. If problem persists, contact support at contact@hiremysub.com'
      );
    }
  });

export const sendResetCode = async (body, method) => {
  try {
    const res = await axios.post(`auth/send-reset-code/${method}`, body);

    successToast(res.data.message);
  } catch (error) {
    errorToast(
      error.response?.data?.error ||
        'Something went wrong on our end. If problem persists, contact support at contact@hiremysub.com'
    );
  }
};

export const updateAccount = (body, token) => {
  const formData = createFormDataFromObject(body);

  if (body?.contact_photo?.length > 0) {
    formData.append('contact_photo', body.contact_photo[0]);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(`auth/account`, formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      });
      resolve(res.data);
    } catch (error) {
      reject(
        error?.response?.data?.error || 'Something went wrong, please try again'
      );
    }
  });
};

export const changePassword = (body, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(
        'auth/change-password',
        body,
        authorization(token)
      );

      resolve(res.data.message);
    } catch (error) {
      reject(
        error?.response?.data?.error ||
          'Something went wrong on our end. If problem persists, contact support at contact@hiremysub.com'
      );
    }
  });

export const fetchUser = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get('auth/user', authorization(token));

      resolve(res.data);
    } catch (error) {
      reject(
        error?.response?.data?.error ||
          'Something went wrong on our end. If problem persists, contact support at contact@hiremysub.com'
      );
    }
  });
