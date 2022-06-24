import { useEffect } from "react";
import { getUpdatedFeatureFlags } from "./utils";
import * as LDClient from "launchdarkly-js-client-sdk";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setFeatureFlagsConfig } from "./featureFlagsSlice";

const LAUNCH_DARKLY_ENV_ID = process.env.REACT_APP_LAUNCH_DARKLY_ENV_ID;

function useFeatureFlags() {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((store) => store.auth.user);

  useEffect(() => {
    if (!LAUNCH_DARKLY_ENV_ID) {
      throw Error("Please set up LAUNCH_DARKLY_ENV_ID");
    }
    let client: LDClient.LDClient;

    if (loggedUser) {
      client = LDClient.initialize(LAUNCH_DARKLY_ENV_ID, {
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
}

export default useFeatureFlags;
