import { FC, ReactNode } from "react";

interface Props {
  isActive?: boolean;
  activeComponent: ReactNode;
  inactiveComponent?: ReactNode;
}

const FeatureFlag: FC<Props> = ({
  isActive,
  activeComponent,
  inactiveComponent,
}: Props) => {
  return <>{isActive ? activeComponent : inactiveComponent}</>;
};

export default FeatureFlag;
