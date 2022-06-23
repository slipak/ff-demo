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
import * as LDClient from "launchdarkly-js-client-sdk";
import BeerPage from "../features/beers/BeerPage";
import { getUpdatedFeatureFlags } from "../features/featureFlags/utils";

function App() {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((store) => store.auth.user);
  const { usersFeatureAvailable, favoriteBeersFeatureAvailable } =
    useAppSelector(featureFlagSelector);

  useEffect(() => {
    let client: LDClient.LDClient;

    if (loggedUser) {
      client = LDClient.initialize("62a84c2c5b537515441dd03a", {
        key: loggedUser.id,
        email: loggedUser.email,
      });

      client.on("ready", () => {
        dispatch(setFeatureFlagsConfig(client.allFlags()));
      });
      client.on("change", (settings) => {
        dispatch(setFeatureFlagsConfig(getUpdatedFeatureFlags(settings)));
      });
    }
  }, [dispatch, loggedUser]);

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
