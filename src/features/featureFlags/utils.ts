import { FeatureFlag, FeatureFlagConfig, UpdatedFeatureFlag } from "./types";

export const getUpdatedFeatureFlags = (flags: UpdatedFeatureFlag) =>
  Object.keys(flags).reduce(
    (acc, f) => ({ [f]: flags[f as keyof typeof flags].current }),
    {}
  );

export const mergeAndValidateFeatureFlags = (
  config: FeatureFlagConfig,
  flags: FeatureFlag
) =>
  Object.keys(config).reduce(
    (acc: FeatureFlagConfig, flagName) =>
      typeof flags[flagName as keyof typeof flags] === "boolean"
        ? {
            ...acc,
            [flagName]: flags[flagName as keyof typeof flags],
          }
        : acc,
    Object.assign({}, config)
  );
