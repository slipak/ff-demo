import { FeatureFlagConfig } from "./types";
import { IFlags } from "flagsmith/types";

export const mergeFeatureFlags = (config: FeatureFlagConfig, flags: IFlags) => {
  return Object.keys(config).reduce(
    (acc: FeatureFlagConfig, flagName) =>
      flags[flagName]
        ? {
            ...acc,
            [flagName]: flags[flagName].enabled,
          }
        : acc,
    Object.assign({}, config)
  );
};
