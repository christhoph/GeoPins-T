import { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "<insert-production-url>"
    : "http://localhost:4000/graphql";

const useGraphqlClient = token => {
  const [idToken, setIdToken] = useState(token || "");

  useEffect(() => {
    if (!token) {
      const getToken = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse().id_token;
      setIdToken(getToken);
    }
  }, []);

  return new GraphQLClient(BASE_URL, {
    headers: { authorization: idToken }
  });
};

export default useGraphqlClient;
