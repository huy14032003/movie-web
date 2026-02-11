export interface Movie {
  id: string | number;
  title: string;
  description: string;
  year: number;
  rating: number;
  duration: string;
  genres?: { id: number; name: string }[];
  poster: string;
  backdrop?: string;
  director?: string;
  actors?: (string | { id: number; name: string })[];
  trailer?: string;
  featured?: boolean;
  totalEpisodes?: number;
  episodes?: {
    id: number;
    title: string;
    url: string;
  }[];
}
