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
// import FeatureFlag from "../features/featureFlags/FeatureFlag";

export type BeerProps = {
  beer: Beer;
  addToFavoritesAvailable?: boolean;
  handleAddToFavorites?: () => void;
};

const BeerCard: FC<BeerProps> = ({
  beer,
  addToFavoritesAvailable,
  handleAddToFavorites,
}) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ p: 1, display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="150"
        image={beer.image_url}
        alt={beer.name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography gutterBottom variant="subtitle1" component="div">
          {beer.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {beer.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" onClick={() => navigate(`/beers/${beer.id}`)}>
          Go To Details
        </Button>
        {addToFavoritesAvailable && (
          <Button size="small" onClick={handleAddToFavorites}>
            Add To Favorite
          </Button>
        )}
        {/*<FeatureFlag*/}
        {/*  isActive={addToFavoritesAvailable}*/}
        {/*  activeComponent={*/}
        {/*    <Button size="small" onClick={handleAddToFavorites}>*/}
        {/*      Add To Favorite*/}
        {/*    </Button>*/}
        {/*  }*/}
        {/*/>*/}
      </CardActions>
    </Card>
  );
};

export default BeerCard;
