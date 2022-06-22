import { FEATURE_NAMES } from "./constants";
import { ReactNode } from "react";
import { featureFlagConfigSelector } from "./featureFlagsSlice";
import { useAppSelector } from "../../app/store";

interface Props {
  name: FEATURE_NAMES;
  children?: JSX.Element;
  activeComponent: ReactNode;
  inactiveComponent?: ReactNode;
}

const FeatureFlag = ({
  name,
  activeComponent: ActiveComponent,
  inactiveComponent: InactiveComponent,
}: Props) => {
  const features = useAppSelector(featureFlagConfigSelector);
  const featureIsAvailable = features[name];

  return featureIsAvailable ? ActiveComponent : InactiveComponent;
};

export default FeatureFlag;
