
import React, { useState, useCallback } from 'react';
import { Song, AnalysisResult } from './types';
import { songData } from './data/songData';
import { analyzeSongGenre } from './services/geminiService';
import Header from './components/Header';
import SongList from './components/SongList';
import AnalysisDashboard from './components/AnalysisDashboard';

const App: React.FC = () => {
  const [songs] = useState<Song[]>(songData);
  const [selectedSong, setSelectedSong] = useState<Song | null>(songs[0] || null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectSong = useCallback(async (song: Song) => {
    setSelectedSong(song);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(true);
    try {
      const result = await analyzeSongGenre(song);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Error analyzing song:", err);
      setError("Failed to get analysis from AI. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  React.useEffect(() => {
    if (selectedSong) {
      handleSelectSong(selectedSong);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SongList songs={songs} selectedSong={selectedSong} onSelectSong={handleSelectSong} />
          </div>
          <div className="lg:col-span-2">
            <AnalysisDashboard 
              song={selectedSong} 
              analysis={analysisResult} 
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
