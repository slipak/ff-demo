import { useGetUserFavoritesQuery } from "./api";

import { useAppSelector } from "../../app/store";
import { skipToken } from "@reduxjs/toolkit/query";
import BeerCard from "../../components/BeerCard";
import { Box, CircularProgress, Typography } from "@mui/material";

const FavoritesPage = () => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { data, isLoading } = useGetUserFavoritesQuery(
    userId ? { userId } : skipToken
  );

  if (isLoading && !data) {
    return <CircularProgress />;
  }

  return (
    <>
      {data?.length! > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
            gridGap: 20,
          }}
        >
          {data?.map(({ beer }) => (
            <BeerCard key={`${beer.id}-${beer.name}`} beer={beer} />
          ))}
        </Box>
      ) : (
        <Typography variant="body1">You haven't added any item yet</Typography>
      )}
    </>
  );
};
export default FavoritesPage;
