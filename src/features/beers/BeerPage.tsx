import { Typography } from "@mui/material";
import { useGetBeerQuery } from "./api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";

const BeerPage = () => {
  const { id } = useParams();
  const { data } = useGetBeerQuery(id ? { id } : skipToken);
  const beer = data?.[0];

  return (
    <>
      <Typography>{beer?.name}</Typography>
      <Typography>{beer?.description}</Typography>
    </>
  );
};

export default BeerPage;
