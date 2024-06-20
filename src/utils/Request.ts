import axios from "axios";

const HOST_API = `http://Localhost:3001/api/v1`;

interface RequestParams {
  endpoint: string;
  payload?: any;
}

export const postRequest = async ({ endpoint, payload }: RequestParams): Promise<any> => {
  console.log('endpoint ', HOST_API, endpoint, payload);
  const response = await axios.post(`${HOST_API}${endpoint}`, payload);
  return response;
};

export const getRequest = async ({ endpoint }: { endpoint: string }): Promise<any> => {
  console.log('endpoint ', HOST_API, endpoint);
  const response = await axios.get(`${HOST_API}${endpoint}`);
  console.log('response',response)
  return response;
};

export const putRequest = async ({ endpoint, payload }: RequestParams): Promise<any> => {
  console.log('endpoint ', HOST_API, endpoint);
  const response = await axios.put(`${HOST_API}${endpoint}`, payload);
  return response;
};

export const patchRequest = async ({ endpoint, payload }: RequestParams): Promise<any> => {
  const response = await axios.patch(`${HOST_API}${endpoint}`, payload);
  return response;
};

export const deleteRequest = async ({ endpoint }: { endpoint: string }): Promise<any> => {
  const response = await axios.delete(`${HOST_API}${endpoint}`);
  return response;
};

export const putFormRequest = async ({ endpoint, payload }: RequestParams): Promise<any> => {
  const response = await axios.put(`${HOST_API}${endpoint}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const postFormRequest = async ({ endpoint, payload }: RequestParams): Promise<any> => {
  const response = await axios.post(`${HOST_API}${endpoint}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
