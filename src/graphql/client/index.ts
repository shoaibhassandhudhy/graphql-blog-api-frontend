import { ROUTES_PATH } from "../../constants";
import { getToken, removeToken } from "../../utility_Func";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: process.env.REACT_APP_API_URL });

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    alert(`[Network error]:` + networkError);
    console.log(`[Network error]:`, networkError);
  }
});
const logoutOnTokenExpire = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (
      response &&
      response.errors &&
      response.errors[0].message.includes("Forbidden")
    ) {
      removeToken();
      window.location.replace(ROUTES_PATH.signin);
    }
    return response;
  });
});
export const client = new ApolloClient({
  link: authLink.concat(logoutOnTokenExpire).concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});
