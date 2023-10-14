import { ApolloProvider } from "@apollo/client";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context";
import { client } from "./graphql/client";
import { authRoutes, protectedRoutes } from "./routes";
import { MainLayout, PublicLayout } from "./layout";
import { NotFound } from "./pages";
import { theme } from "./theme";
import { RouteProps } from "react-router-dom";
import { PostProvider } from "./context/post";
function App() {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <PostProvider>
          <ThemeProvider theme={theme}>
            <StyledEngineProvider>
              <CssBaseline>
                <BrowserRouter>
                  <Routes>
                    <Route element={<PublicLayout />}>
                      {authRoutes.map((route: RouteProps, index: number) => (
                        <Route
                          path={route.path}
                          element={route.element}
                          key={index}
                        />
                      ))}
                    </Route>
                    <Route element={<MainLayout />}>
                      {protectedRoutes.map((route: RouteProps, key: number) => (
                        <Route
                          path={route.path}
                          element={route.element}
                          key={key}
                        ></Route>
                      ))}
                    </Route>
                    <Route path="/*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </CssBaseline>
            </StyledEngineProvider>
          </ThemeProvider>
        </PostProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

export default App;
