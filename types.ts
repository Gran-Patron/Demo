
export interface Song {
  track_id: string;
  track_name: string;
  track_artist: string;
  track_popularity: number;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
}

export interface AnalysisResult {
  primaryGenre: string;
  secondaryGenres: string[];
  reasoning: string;
  mood: string;
  scores: {
    popAppeal: number;
    danceFloorEnergy: number;
    chillVibe: number;
  };
}
