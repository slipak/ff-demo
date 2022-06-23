import { FC } from "react";
import FeatureFlag from "../features/featureFlags/FeatureFlag";
import BeerCard, { BeerProps } from "./BeerCard";
import { useAppSelector } from "../app/store";
import { featureFlagSelector } from "../features/featureFlags/featureFlagsSlice";
import NewBeerCard from "./NewBeerCard";

const BeerCardExperiment: FC<BeerProps> = ({ beer, handleAddToFavorites }) => {
  const { experimentalBeerCard, favoriteBeersFeatureAvailable } =
    useAppSelector(featureFlagSelector);

  return (
    <FeatureFlag
      isActive={experimentalBeerCard}
      activeComponent={
        <BeerCard
          beer={beer}
          addToFavoritesAvailable={favoriteBeersFeatureAvailable}
          handleAddToFavorites={handleAddToFavorites}
        />
      }
      inactiveComponent={
        <NewBeerCard
          beer={beer}
          addToFavoritesAvailable={favoriteBeersFeatureAvailable}
          handleAddToFavorites={handleAddToFavorites}
        />
      }
    />
  );
};

export default BeerCardExperiment;
