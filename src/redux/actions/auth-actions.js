import secureLocalStorage from 'react-secure-storage';
import axios from '../../api/config';
import authorization from '../../api/authorization';
import {
  logout as logoutAction,
  updateAccount,
} from '../reducers/auth-reducer';
import { errorToast, successToast } from '../../utils/helpers/toasts';

export const logout = (navigate, token) => async (dispatch) => {
  secureLocalStorage.removeItem('2e8c8902194449cea48e678aa9331049');

  dispatch(logoutAction());

  try {
    await axios.put('auth/logout', null, authorization(token));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Logout failed,', error);
  }
  navigate('/login');
};

export const deleteAccount =
  (token, setLoading, navigate) => async (dispatch) => {
    setLoading(true);

    try {
      const res = await axios.delete(`portal/account/`, authorization(token));
      secureLocalStorage.removeItem('2e8c8902194449cea48e678aa9331049');

      dispatch(deleteAccount());
      successToast(res.data.message);

      navigate('/login');
    } catch (error) {
      errorToast(
        error?.response?.data?.error ||
          'Something went wrong on our end. If problem persists, contact support at contact@hiremysub.com'
      );
    }
    setLoading(false);
  };

export const fetchUserAccount = (token) => async (dispatch) => {
  try {
    const res = await axios.get('auth/user', authorization(token));

    dispatch(updateAccount(res.data.user));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
