import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureFlagConfig } from "./types";
import { IFlags } from "flagsmith/types";
import { mergeFeatureFlags } from "./utils";
import { FEATURE_NAMES } from "./constants";
import { RootState } from "../../app/store";

export type FeatureFlagState = {
  config: FeatureFlagConfig;
};

const initialState: FeatureFlagState = {
  config: {
    [FEATURE_NAMES.USERS]: false,
    [FEATURE_NAMES.FAVORITES]: false,
  },
};

export const featureFlagSlice = createSlice({
  name: "featureFlags",
  initialState,
  reducers: {
    setConfig(state, { payload }: PayloadAction<IFlags>) {
      state.config = mergeFeatureFlags(state.config, payload);
    },
  },
});

export const { setConfig: setFeatureFlagsConfig } = featureFlagSlice.actions;

export default featureFlagSlice.reducer;

export const featureFlagConfigSelector = createSelector(
  (store: RootState) => store.featureFlags.config,
  (featureFlags) => {
    return featureFlags;
  }
);

export const featureFlagSelector = createSelector(
  (store: RootState) => store.featureFlags.config,
  (featureFlags) => {
    return {
      usersFeatureAvailable: featureFlags[FEATURE_NAMES.USERS],
      favoriteBeersFeatureAvailable: featureFlags[FEATURE_NAMES.FAVORITES],
    };
  }
);
