import * as Yup from 'yup';
import { yearGroups } from '../constants/input_options/year-options';

/**
 * The function `normalizeText` removes all non-alphabetic characters from a given string.
 * @param value - The parameter `value` is a string that represents the text that needs to be
 * normalized. The function `normalizeText` removes all non-alphabetic characters from the string and
 * returns the resulting string.
 */
export const normalizeText = (value) => value.replace(/[^a-zA-Z]/g, '');

/**
 * The function `normalizeNumber` removes all non-numeric characters from a given string.
 * @param value - The parameter `value` is a string representing a number that may contain non-numeric
 * characters. The function `normalizeNumber` uses a regular expression to remove all non-numeric
 * characters from the string and returns the resulting string.
 */
export const normalizeNumber = (value) => value.replace(/\D/g, '');

/**
 * The function normalizes a credit card number by removing non-digit characters and limiting the
 * length to 19 digits.
 * @param value - The input value of a credit card number that needs to be normalized.
 */
export const normalizeCreditCardNumber = (value) =>
  value.replace(/\D/g, '').substring(0, 19);

/**
 * The function normalizes a credit card CVC value by removing non-numeric characters and limiting the
 * length to 4 digits.
 * @param value - The input value that needs to be normalized. It is expected to be a string containing
 * the card CVC (Card Verification Code) entered by the user.
 */
export const normalizeCardCVC = (value) =>
  value.replace(/\D/g, '').substring(0, 4);

/**
 * The function normalizes a routing number by removing non-numeric characters and limiting the length
 * to 9 digits.
 * @param value - The input value that needs to be normalized. It could be a string containing a
 * routing number with or without non-numeric characters.
 */
export const normalizeRoutingNumber = (value) =>
  value.replace(/\D/g, '').substring(0, 9);

/**
 * The function normalizes an account number by removing non-digit characters and limiting the length
 * to 8 digits.
 * @param value - The input value that needs to be normalized. It could be a string containing any
 * characters, including non-numeric ones.
 */
export const normalizeAccountNumber = (value) =>
  value.replace(/\D/g, '').substring(0, 8);

/**
 * The function normalizes an expiration date string by removing non-numeric characters and limiting
 * the length to 5 digits.
 * @param value - The input value that represents an expiration date.
 */
export const normalizeExpirationDate = (value) =>
  value.replace(/[^0-9]/g, '').substring(0, 5);

/**
 * The function `normalizeName` removes all non-alphabetic characters and spaces from a given string.
 * @param value - The input string that needs to be normalized. The function removes all non-alphabetic
 * characters (except spaces) from the string.
 */
export const normalizeName = (value) => value.replace(/[^a-zA-Z\s]/g, '');

export const validateName = Yup.string().matches(
  /^[a-zA-Z']{1,32}$/g,
  'Names must not contain symbols, spaces or numbers.'
);

/**
 * The function `normalizePassword` removes all whitespace characters from a given string.
 * @param value - The input value that needs to be normalized. The function removes any whitespace
 * characters (spaces, tabs, line breaks) from the input value.
 */
export const normalizePassword = (value) => value.replace(/\s/g, '');

export const validatePassword = Yup.string().matches(
  /^[^@.$]{6,}$/g,
  'Password must be at least 6 characters long'
);

/**
 * The function `normalizeZipCode` takes a string value and returns a normalized version of it by
 * removing any non-digit characters and keeping only the first 5 digits.
 * @param value - The input value that needs to be normalized. It is expected to be a string containing
 * a zip code.
 */
export const normalizeZipCode = (value) =>
  value.replace(/\D/g, '').substring(0, 5);

export const validateZipCode = Yup.string().matches(
  /^[0-9]{5}$/g,
  'Zip code must be exactly 5 digits'
);

/**
 * The function `normalizePhoneNumber` removes all non-digit characters from a string and returns the
 * first 10 digits.
 * @param value - The input value that represents a phone number.
 */
export const normalizePhoneNumber = (value) =>
  value.replace(/\D/g, '').substring(0, 10);

export const validatePhoneNumber = Yup.string()
  .matches(/^[0-9]{10}$/g, 'Must be a valid phone number')
  .min(10, 'Must be a valid phone number')
  .max(10, 'Must be a valid phone number');

/**
 * The function `normalizeEmail` removes certain special characters from an email address string.
 * @param value - The input value that needs to be normalized. This function removes any whitespace or
 * special characters (such as !, #, $, %, &, and ~) from the input value.
 */
export const normalizeEmail = (value) => value.replace(/[\s!#$%&~]/g, '');

export const validateEmail = Yup.string().email(
  'Email must contain a period, @, and valid domain name.'
);

export const validateUsername = Yup.string().matches(
  /^[a-zA-Z0-9-_]{3,32}$/g,
  "Username must be 6-32 characters and only contain letters, numbers, '-' and '_' ."
);

export const validateAuthCode = Yup.string().matches(
  /^[a-zA-Z0-9]{4,}/g,
  'Code must be at least 4 characters long'
);

export const validateWebsite = Yup.string().required('Required');

export const validateRequiredString = Yup.string().required(
  'This field is required'
);

/**
 * Creates a FormData object from a given object, with the option to ignore a specified
 * property.
 * @param object - The object parameter.
 * @param [ignoreProp=null] - Optional parameter that allows you to specify a property name
 * that should be ignored when creating the FormData object from the input object.
 * @returns Returns a `FormData` object that contains the data from the input `object`.
 */
export const createFormDataFromObject = (object, ignoreProp = null) => {
  const formData = new FormData();

  for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (prop === ignoreProp) {
        continue;
      }

      const value = object[prop];

      if (value instanceof Object) {
        formData.append(prop, JSON.stringify(value));
        continue;
      }

      if (Array.isArray(value)) {
        if (value[0] instanceof File) {
          continue;
        } else {
          formData.append(prop + '[]', JSON.stringify(value));
        }
      } else {
        formData.append(prop, value);
      }
    }
  }

  return formData;
};

export const getGroupYears = (number) => {
  if (number <= 5) return yearGroups[0];
  if (number <= 10) return yearGroups[1];
  if (number <= 15) return yearGroups[2];
  if (number <= 20) return yearGroups[3];
  if (number <= 25) return yearGroups[4];
  if (number <= 30) return yearGroups[5];
  return yearGroups[6];
};
