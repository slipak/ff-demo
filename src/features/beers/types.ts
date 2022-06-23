export interface Amount {
  value: number;
  unit: string;
}
export interface Malt {
  name: string;
  amount: Amount;
}
export interface Hop {
  add: string;
  amount: Amount;
  attribute: string;
  name: string;
}
export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: {
    value: number;
    unit: string;
  };
  boil_volume: {
    value: number;
    unit: string;
  };
  ingredients: {
    hops: Hop[];
    malt: Malt[];
    yeast: string;
  };
  method: {
    fermentation: {
      temp: Amount;
    };
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}
