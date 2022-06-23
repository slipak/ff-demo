import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureFlag, FeatureFlagConfig } from "./types";
import { mergeAndValidateFeatureFlags } from "./utils";
import { FEATURE_NAMES } from "./constants";
import { RootState } from "../../app/store";

export type FeatureFlagState = {
  config: FeatureFlagConfig;
};

const initialState: FeatureFlagState = {
  config: {
    [FEATURE_NAMES.USERS]: false,
    [FEATURE_NAMES.FAVORITES]: false,
    [FEATURE_NAMES.EXPERIMENTAL_BEER_CARD]: false,
    [FEATURE_NAMES.HARD_CORE_EXPERIMENTS_MODE]: false,
  },
};

export const featureFlagSlice = createSlice({
  name: "featureFlags",
  initialState,
  reducers: {
    setConfig(state, { payload }: PayloadAction<FeatureFlag>) {
      state.config = mergeAndValidateFeatureFlags(state.config, payload);
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
      experimentalBeerCard:
        featureFlags[FEATURE_NAMES.EXPERIMENTAL_BEER_CARD] &&
        featureFlags[FEATURE_NAMES.HARD_CORE_EXPERIMENTS_MODE],
    };
  }
);
