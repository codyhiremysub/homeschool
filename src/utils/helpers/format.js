/**
 * The function formats a number by adding commas to separate groups of three digits.
 * @param number - The parameter `number` is a numerical value that needs to be formatted with commas.
 * @returns The function `formatNumberWithCommas` takes a number as input and returns a string
 * representation of that number with commas separating every three digits. For example, if the input
 * is `1000000`, the function will return `"1,000,000"`.
 */
export const formatNumberWithCommas = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * The function formatDate formats a given date value based on the specified option.
 * @param value - The date value that needs to be formatted. It can be a string or a Date object.
 * @param option - The `option` parameter is a string that determines the format of the date to be
 * returned. It can have one of the following values: 'short', 'long', 'long-hour', or 'short-hour'.
 * @returns The function `formatDate` returns a formatted date string based on the `value` and `option`
 * parameters passed to it. The format of the returned string depends on the value of the `option`
 * parameter. If `option` is `'short'`, the function returns a short date string in the format
 * `MM/DD/YYYY`, etc.
 */
export const formatDate = (value, option = 'short') => {
  switch (option) {
    case 'short':
      return new Date(value).toLocaleString([], {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
    case 'long':
      return new Date(value).toLocaleString([], {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    case 'long-hour':
      return new Date(value).toLocaleString([], {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    case 'short-hour':
      return new Date(value).toLocaleString([], {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    default:
      return new Date(value).toLocaleString([], {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
  }
};

/**
 * The function formats a given value as a USD currency with an optional inclusion of fractional
 * digits.
 * @param value - The numerical value that needs to be formatted as USD currency.
 * @param [includeFraction=true] - includeFraction is a boolean parameter that determines whether or
 * not to include fractional digits in the formatted currency value. If it is set to true, the maximum
 * number of fractional digits will be 2. If it is set to false, there will be no fractional digits in
 * the formatted value.
 */
export const formatUSD = (value, includeFraction = true) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: includeFraction ? 2 : 0,
  }).format(value);

/**
 * The function formats a given string value to a URL-friendly format by converting it to lowercase and
 * replacing spaces with underscores.
 * @param value - The input string that needs to be formatted as a URL.
 */
export const formatURL = (value) => value.toLowerCase().replace(/\s/g, '_');

/**
 * The function formats a string by truncating it to a maximum length and adding ellipsis if necessary.
 * @param value - The string value that needs to be truncated if it exceeds the maximum length.
 * @param max - The "max" parameter in the "formatTruncate" function is a number that represents the
 * maximum length of the string "value". If the length of "value" is greater than "max", the function
 * will truncate the string and add "..." at the end.
 */
export const formatTruncate = (value = '', max) =>
  value.length > max ? value.slice(0, max) + '...' : value;

/**
 * This function sorts an array of objects by a specified property in descending order.
 * @param array - The array of objects that needs to be sorted.
 * @param prop - prop is a string representing the property of the objects in the array that the
 * function will use to sort the array.
 */
export const sortObjectBy = (array, prop) =>
  array.sort((a, b) =>
    a[prop] && b[prop] ? b[prop].localeCompare(a[prop]) : a
  );

export const format24Time = (time) => {
  const [hours, minutes] = time.split(':');
  const fHours = hours % 12;

  return `${fHours}:${minutes} ${hours / 12 > 1 ? 'PM' : 'AM'}`;
};

/**
 * The function formats an address object into a string with the address lines, city, state, and zip
 * code.
 * @param address - The `address` parameter is an object that contains the following properties: address_one, address_two, city, state, zip_code
 * @returns The function `formatAddress` returns a formatted address string based on the input
 * `address` object.
 */
export const formatAddress = (address) =>
  address
    ? `${address?.address_one}${
        address?.address_two ? ' ' + address?.address_two + ',' : ','
      } ${address?.city}, ${address?.state} ${address?.zip_code}`
    : undefined;

/**
 * Formats an object of query parameters into a URL-encoded string.
 * @param params - The `params` parameter is an object that contains key-value pairs representing the
 * query parameters to be formatted.
 * @returns Returns a string that contains a URL-encoded query string
 * generated from the `params` object passed as an argument.
 */
export const formatQuery = (params) => {
  const query = [];
  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      query.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
    }
  }
  return query.join('&');
};
