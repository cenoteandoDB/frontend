import React from 'react';

import axios, { AxiosError, RawAxiosRequestHeaders } from 'axios';
import { ApiContext } from './api-instance-provider';


//TODO implement interceptors
export const useApi = (
  url: string,
  method: string,
  params: unknown = {},
  headers: RawAxiosRequestHeaders = {}
) => {
  const [data, setData] = React.useState<any>(null);
  const [status, setStatus] = React.useState(0);
  const [error, setError] = React.useState<AxiosError | null>(null);
  const [loading, setLoading] = React.useState(false);
  const contextInstance = React.useContext(ApiContext);
  const instance = React.useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = React.useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const fetch = async (payload?: object) => {
    try {
      setLoading(true);
      const response = await instance.request({
        data: payload,
        signal: controllerRef.current.signal,
        method,
        url,
        params,
        headers,
      });
      setStatus(response.status);
      setData(response.data);
    } catch (error: unknown) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { cancel, data, status, error, loading, fetch };
};
