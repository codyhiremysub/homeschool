const authorization = (token) => ({
  headers: {
    Authorization: 'Bearer ' + token,
  },
});

export default authorization;
