const API_TIMEOUT = 5000;

const API_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  FORM_DATA: {
    'Content-Type': 'multipart/form-data',
  },
};

export { API_HEADERS, API_TIMEOUT };
