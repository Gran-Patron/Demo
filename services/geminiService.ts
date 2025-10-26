
import { GoogleGenAI, Type } from "@google/genai";
import { Song, AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    primaryGenre: {
      type: Type.STRING,
      description: "The most likely primary genre of the song."
    },
    secondaryGenres: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of one or two possible secondary genres."
    },
    reasoning: {
      type: Type.STRING,
      description: "A detailed explanation connecting the song's audio features to the characteristics of the suggested genres."
    },
    mood: {
      type: Type.STRING,
      description: "A description of the overall mood and feeling of the song (e.g., 'energetic and happy', 'somber and reflective')."
    },
    scores: {
      type: Type.OBJECT,
      properties: {
        popAppeal: {
          type: Type.NUMBER,
          description: "A score from -1 (low) to 1 (high) indicating mainstream pop appeal."
        },
        danceFloorEnergy: {
          type: Type.NUMBER,
          description: "A score from -1 (low) to 1 (high) for how suitable the track is for a high-energy dance floor."
        },
        chillVibe: {
          type: Type.NUMBER,
          description: "A score from -1 (low) to 1 (high) representing how suitable the song is for relaxing or chilling."
        }
      },
      required: ["popAppeal", "danceFloorEnergy", "chillVibe"]
    }
  },
  required: ["primaryGenre", "secondaryGenres", "reasoning", "mood", "scores"]
};


export const analyzeSongGenre = async (song: Song): Promise<AnalysisResult> => {
  const prompt = `
    You are an expert musicologist. Based on the following audio feature data for a song, provide a detailed genre analysis.
    The song is "${song.track_name}" by ${song.track_artist}.

    Audio Feature Data:
    - Danceability: ${song.danceability.toFixed(3)} (A value from 0.0 to 1.0 describing how suitable a track is for dancing.)
    - Energy: ${song.energy.toFixed(3)} (A measure from 0.0 to 1.0 representing a perceptual measure of intensity and activity.)
    - Valence: ${song.valence.toFixed(3)} (A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. High valence sounds more positive (e.g. happy, cheerful), low valence sounds more negative (e.g. sad, angry).)
    - Tempo: ${song.tempo.toFixed(0)} BPM
    - Acousticness: ${song.acousticness.toFixed(3)} (A confidence measure from 0.0 to 1.0 of whether the track is acoustic.)
    - Instrumentalness: ${song.instrumentalness.toFixed(3)} (Predicts whether a track contains no vocals. The closer to 1.0, the greater likelihood the track contains no vocal content.)
    - Liveness: ${song.liveness.toFixed(3)} (Detects the presence of an audience in the recording.)
    - Speechiness: ${song.speechiness.toFixed(3)} (Detects the presence of spoken words in a track.)
    - Loudness: ${song.loudness.toFixed(1)} dB

    Your analysis must be returned as a JSON object matching the provided schema.
    Analyze the data to:
    1. Suggest the most likely primary genre and one or two possible secondary genres.
    2. Explain your reasoning, connecting the specific data points to genre characteristics.
    3. Describe the overall mood and feeling of the song.
    4. Provide a "Genre Score" from -1 to 1 for Pop Appeal, Dance Floor Energy, and Chill / Relax Vibe.
  `;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.5,
    }
  });

  try {
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", response.text);
    throw new Error("AI response was not valid JSON.");
  }
};
