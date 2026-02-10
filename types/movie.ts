export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  rating: number;
  duration: string;
  genres?: { name: string }[];
  poster: string;
  backdrop?: string;
  director?: string;
  cast?: string[];
  trailer?: string;
  featured?: boolean;
}
