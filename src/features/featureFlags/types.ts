import { FEATURE_NAMES } from "./constants";

export type FeatureFlag = Record<string, any>;
export type UpdatedFeatureFlag = {
  current: any;
  previous: any;
};

export type FeatureFlagConfig = Record<FEATURE_NAMES, boolean>;
