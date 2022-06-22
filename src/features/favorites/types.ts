import { Beer } from "../beers/types";

export interface Favorite {
  id: number;
  beer: Beer;
  userId: string;
}
