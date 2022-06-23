import { Box } from "@mui/material";
import { useGetBeersQuery } from "./api";
import BeerCard from "../../components/BeerCard";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { FEATURE_NAMES } from "../featureFlags/constants";
import {
  useGetUserFavoritesQuery,
  usePostFavoritesMutation,
} from "../favorites/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { Beer } from "./types";
import { showSnackbar } from "../snackbar/snackbarsSlice";
import FeatureFlag from "../featureFlags/FeatureFlag";
import { featureFlagSelector } from "../featureFlags/featureFlagsSlice";
import NewBeerCard from "../../components/NewBeerCard";

const BeersPage = () => {
  const dispatch = useAppDispatch();

  const favoriteBeersFlagOn = useAppSelector(
    (store) => store.featureFlags.config[FEATURE_NAMES.FAVORITES]
  );

  const { experimentalBeerCard } = useAppSelector(featureFlagSelector);

  const loggedUser = useAppSelector((state) => state.auth.user);
  const { data: beers } = useGetBeersQuery();
  const { data: favoritesBeers } = useGetUserFavoritesQuery(
    loggedUser?.id ? { userId: loggedUser.id } : skipToken
  );
  const [addToFavorites] = usePostFavoritesMutation();

  const handleAddToFavorites = async (beer: Beer) => {
    if (
      favoritesBeers?.some((favoriteBeer) => favoriteBeer.beer.id === beer.id)
    ) {
      dispatch(
        showSnackbar({
          title: "Item has already been added!",
        })
      );
      return;
    }
    await addToFavorites({
      beer,
      userId: loggedUser?.id,
    });
    dispatch(
      showSnackbar({
        title: "Item has been added!",
      })
    );
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
        gridGap: 20,
      }}
    >
      {beers?.map((beer, index) => (
        <FeatureFlag
          key={`${beer.id}-${beer.name}-${index}`}
          isActive={experimentalBeerCard}
          activeComponent={
            <NewBeerCard
              beer={beer}
              addToFavoritesAvailable={favoriteBeersFlagOn}
              handleAddToFavorites={() => handleAddToFavorites(beer)}
            />
          }
          inactiveComponent={
            <BeerCard
              beer={beer}
              addToFavoritesAvailable={favoriteBeersFlagOn}
              handleAddToFavorites={() => handleAddToFavorites(beer)}
            />
          }
        />
      ))}
    </Box>
  );
};

export default BeersPage;
