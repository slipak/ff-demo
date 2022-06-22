import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Beer } from "../features/beers/types";
import { useNavigate } from "react-router-dom";

type Props = {
  beer: Beer;
  addToFavoritesAvailable?: boolean;
  handleAddToFavorites?: () => void;
};

const BeerCard: FC<Props> = ({
  beer,
  addToFavoritesAvailable,
  handleAddToFavorites,
}) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={beer.image_url}
        alt={beer.name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {beer.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {beer.contributed_by}
        </Typography>
      </CardContent>
      <CardActions>
        {addToFavoritesAvailable && (
          <Button size="small" onClick={handleAddToFavorites}>
            Add To Favorite
          </Button>
        )}
        <Button
          size="small"
          onClick={() => navigate(`/beers/${beer.id}`, { replace: true })}
        >
          Go To Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default BeerCard;
