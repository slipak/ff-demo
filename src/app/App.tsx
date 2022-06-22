import { useAppDispatch, useAppSelector } from "./store";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "../components";
import LoginPage from "../features/auth/LoginPage";
import { Box } from "@mui/material";
import BeersPage from "../features/beers/BeersPage";
import { useEffect } from "react";
import {
  featureFlagSelector,
  setFeatureFlagsConfig,
} from "../features/featureFlags/featureFlagsSlice";
import UsersPage from "../features/users/UsersPage";
import FavoritesPage from "../features/favorites";
import { Snackbars } from "../features/snackbar/Snackbars";
import flagsmith from "flagsmith";
import BeerPage from "../features/beers/BeerPage";

function App() {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((store) => store.auth.user);
  const { usersFeatureAvailable, favoriteBeersFeatureAvailable } =
    useAppSelector(featureFlagSelector);

  useEffect(() => {
    if (!loggedUser?.id || !process.env.REACT_APP_FLAGSMITH_ENV_ID) {
      return;
    }

    flagsmith.init({
      environmentID: process.env.REACT_APP_FLAGSMITH_ENV_ID,
      identity: loggedUser.id,
      onChange: (flags, params) => {
        dispatch(setFeatureFlagsConfig(flags));
      },
    });
  }, [dispatch, loggedUser?.id]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={loggedUser ? <PageLayout /> : <Navigate to="/login" />}
        >
          {usersFeatureAvailable && (
            <Route path="/users" element={<UsersPage />} />
          )}

          {favoriteBeersFeatureAvailable && (
            <Route path="/favorites" element={<FavoritesPage />} />
          )}
          <Route path="beers" element={<BeersPage />} />
          <Route path="/beers/:id" element={<BeerPage />} />
          <Route path="*" element={<Box>Page not Found</Box>} />
        </Route>
        <Route
          path="/login"
          element={!loggedUser ? <LoginPage /> : <Navigate to="/beers" />}
        />
        <Route path="*" element={<Box>Page not Found</Box>} />
      </Routes>
      <Snackbars />
    </>
  );
}

export default App;
