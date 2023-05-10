export type NasaApiResponse = {
  links: Links;
  element_count: number;
  near_earth_objects: Nearearthobjects;
};
type Nearearthobjects = Record<string, AsteroidData[]>;

export type AsteroidData = {
  links: Pick<Links, 'self'>;
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: Estimateddiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Closeapproachdatum[];
  is_sentry_object: boolean;
};
type Closeapproachdatum = {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: Relativevelocity;
  miss_distance: Missdistance;
  orbiting_body: string;
};
type Missdistance = {
  astronomical: string;
  lunar: string;
  kilometers: string;
  miles: string;
};
type Relativevelocity = {
  kilometers_per_second: string;
  kilometers_per_hour: string;
  miles_per_hour: string;
};
type Estimateddiameter = {
  kilometers: Kilometers;
  meters: Kilometers;
  miles: Kilometers;
  feet: Kilometers;
};
type Kilometers = {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
};
type Links = {
  next: string;
  previous: string;
  self: string;
};
