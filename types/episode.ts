export interface Episode {
  id: number;
  movieId: number;
  title: string;
  episodeNumber: number;
  videoUrl: string;
  serverName: string;
  quality: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type EpisodeListResponse = ApiResponse<Episode[]>;
