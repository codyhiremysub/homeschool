import authorization from '../../api/authorization';
import axios from '../../api/config';

/**
 * It sends a POST request to the server with the session ID and the user's token
 * @param sessionId - The session ID of the Checkout Session to cancel.
 * @param token - The token you received from the server when you logged in.
 */
export const cancelCheckoutSession = (sessionId, token) => {
  try {
    axios.post(
      '/portal/cancel-checkout',
      { session_id: sessionId },
      authorization(token)
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

/**
 * It takes in a url, cart, and headers, and returns a promise that resolves to an object containing a
 * checkout url and session id
 * @param url - The url to send the request to.
 * @param cart - The cart object that we created earlier.
 * @param headers - {
 * @returns A promise that resolves to an object with a url and id property.
 */
export const startCheckoutSession = (url, cart, headers) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(url, cart, headers);

      resolve({ url: res.data.checkout_url, id: res.data.session_id });
    } catch (error) {
      reject(
        error?.response?.data?.error?.toString() ||
          'Cannot get checkout session'
      );
    }
  });
