import { Favorite as FavoriteIcon } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { BeerProps } from "./BeerCard";
import { useNavigate } from "react-router-dom";

const NewBeerCard: FC<BeerProps> = ({
  beer,
  addToFavoritesAvailable,
  handleAddToFavorites,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "end",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        {addToFavoritesAvailable && (
          <IconButton
            aria-label="add to favorites"
            onClick={handleAddToFavorites}
          >
            <FavoriteIcon />
          </IconButton>
        )}
      </CardActions>
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", flex: 1 }}
        onClick={() => navigate(`/beers/${beer.id}`)}
      >
        <CardMedia
          component="img"
          height="150"
          image={beer.image_url}
          alt={beer.name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {beer.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewBeerCard;
