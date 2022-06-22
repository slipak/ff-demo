import { useGetUserFavoritesQuery } from "./api";

import { useAppSelector } from "../../app/store";
import { skipToken } from "@reduxjs/toolkit/query";
import BeerCard from "../../components/BeerCard";
import { Grid } from "@mui/material";

const FavoritesPage = () => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { data } = useGetUserFavoritesQuery(userId ? { userId } : skipToken);

  return (
    <Grid
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(350px, 1fr))",
        gridGap: 20,
      }}
    >
      {data?.map(({ beer }) => (
        <BeerCard key={`${beer.id}-${beer.name}`} beer={beer} />
      ))}
    </Grid>
  );
};
export default FavoritesPage;
