import { Box, Typography } from "@mui/material";
import { useGetBeerQuery } from "./api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";

const BeerPage = () => {
  const { id } = useParams();
  const { data: beer } = useGetBeerQuery(id ? { id } : skipToken);

  return (
    <>
      <Box
        sx={{ maxHeight: "400px", float: "right" }}
        component="img"
        src={beer?.image_url}
        alt={beer?.name}
      />
      <Typography variant="h4">{beer?.name}</Typography>
      <Typography>{beer?.description}</Typography>
      <br />
      <Typography>Ingredients</Typography>
      <ul>
        {beer?.ingredients.hops.map((hop) => (
          <li>
            {hop.name} - ({hop.amount.value} {hop.amount.unit})
          </li>
        ))}
        {beer?.ingredients.malt.map((malt) => (
          <li>
            {malt.name} - ({malt.amount.value} {malt.amount.unit})
          </li>
        ))}
      </ul>
      <Typography>{beer?.ingredients.yeast}</Typography>
      <br />
      <Typography>First Brewed: {beer?.first_brewed}</Typography>
      <Typography>Tips: {beer?.brewers_tips}</Typography>
      <Typography>Contributed By: {beer?.contributed_by}</Typography>
    </>
  );
};

export default BeerPage;
