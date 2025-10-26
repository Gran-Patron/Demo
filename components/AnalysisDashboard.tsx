
import React from 'react';
import { Song, AnalysisResult } from '../types';
import FeatureRadarChart from './FeatureRadarChart';
import Loader from './Loader';

interface AnalysisDashboardProps {
  song: Song | null;
  analysis: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const ScoreBar: React.FC<{ label: string; score: number }> = ({ label, score }) => {
    const widthPercentage = ((score + 1) / 2) * 100;
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-300">{label}</span>
                <span className="text-sm font-bold text-purple-300">{score.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${widthPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ song, analysis, isLoading, error }) => {
  if (!song) {
    return (
      <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 flex items-center justify-center h-full backdrop-blur-md border border-gray-700/50">
        <p className="text-gray-400">Select a song to begin analysis.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 backdrop-blur-md border border-gray-700/50 space-y-6">
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-white font-orbitron truncate">{song.track_name}</h2>
        <p className="text-md text-purple-300">{song.track_artist}</p>
      </div>

      {isLoading && <div className="flex justify-center items-center py-10"><Loader /></div>}
      {error && <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-md">{error}</div>}
      
      {analysis && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-purple-300 font-orbitron mb-2">AI Genre Analysis</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{analysis.reasoning}</p>
            </div>
             <div>
                <h3 className="text-lg font-bold text-purple-300 font-orbitron mb-2">Mood & Vibe</h3>
                <p className="text-sm text-gray-300 italic">"{analysis.mood}"</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-300 font-orbitron mb-2">Genre Profile</h3>
              <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-500 text-white px-3 py-1 text-sm rounded-full font-semibold">{analysis.primaryGenre}</span>
                  {analysis.secondaryGenres.map(g => <span key={g} className="bg-gray-700 text-gray-300 px-3 py-1 text-sm rounded-full">{g}</span>)}
              </div>
            </div>
            <div className="pt-4 space-y-4">
                <h3 className="text-lg font-bold text-purple-300 font-orbitron mb-2">Attribute Scores</h3>
                <ScoreBar label="Pop Appeal" score={analysis.scores.popAppeal} />
                <ScoreBar label="Dance Floor Energy" score={analysis.scores.danceFloorEnergy} />
                <ScoreBar label="Chill Vibe" score={analysis.scores.chillVibe} />
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-center min-h-[300px]">
            <FeatureRadarChart song={song} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisDashboard;
