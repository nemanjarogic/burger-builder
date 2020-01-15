import { useState, useEffect } from "react";

// This can be used anywhere we make a http request to get the error.
const useHttpErrorHandler = httpClient => {
  const [error, setError] = useState(null);

  // reqInterceptor and resInterceptor are ran before we return any JSX
  // this simulates componentWillMount
  const reqInterceptor = httpClient.interceptors.request.use(request => {
    setError(null);
    return request;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    response => response,
    err => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      // run after the component is unmounted
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [httpClient, reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};

export default useHttpErrorHandler;
