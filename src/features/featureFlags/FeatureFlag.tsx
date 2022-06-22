import { FEATURE_NAMES } from "./constants";
import { ReactNode } from "react";
import { featureFlagConfigSelector } from "./featureFlagsSlice";
import { useAppSelector } from "../../app/store";

interface Props {
  name: FEATURE_NAMES;
  activeComponent: ReactNode;
  inactiveComponent?: ReactNode;
}

const FeatureFlag = ({ name, activeComponent, inactiveComponent }: Props) => {
  const features = useAppSelector(featureFlagConfigSelector);
  const featureIsAvailable = features[name];

  return <>{featureIsAvailable ? activeComponent : inactiveComponent}</>;
};

export default FeatureFlag;
