import { useAppSelector } from "./store";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "../components";
import LoginPage from "../features/auth/LoginPage";
import { Box, ThemeProvider } from "@mui/material";
import BeersPage from "../features/beers/BeersPage";
import { featureFlagSelector } from "../features/featureFlags/featureFlagsSlice";
import UsersPage from "../features/users/UsersPage";
import FavoritesPage from "../features/favorites";
import { Snackbars } from "../features/snackbar/Snackbars";

import BeerPage from "../features/beers/BeerPage";
import useFeatureFlags from "../features/featureFlags/useFeatureFlags";
import theme from "./theme";

function App() {
  const loggedUser = useAppSelector((store) => store.auth.user);
  const { usersFeatureAvailable, favoriteBeersFeatureAvailable } =
    useAppSelector(featureFlagSelector);

  useFeatureFlags();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={loggedUser ? <PageLayout /> : <Navigate to="/login" />}
        >
          <Route path="beers" element={<BeersPage />} />
          <Route path="/beers/:id" element={<BeerPage />} />
          {usersFeatureAvailable && (
            <Route path="/users" element={<UsersPage />} />
          )}

          {favoriteBeersFeatureAvailable && (
            <Route path="/favorites" element={<FavoritesPage />} />
          )}
          <Route path="*" element={<Box>Page not Found</Box>} />
        </Route>
        <Route
          path="/login"
          element={!loggedUser ? <LoginPage /> : <Navigate to="/beers" />}
        />
        <Route path="*" element={<Box>Page not Found</Box>} />
      </Routes>
      <Snackbars />
    </ThemeProvider>
  );
}

export default App;
