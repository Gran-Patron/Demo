
import React from 'react';
import { Song } from '../types';

interface SongListProps {
  songs: Song[];
  selectedSong: Song | null;
  onSelectSong: (song: Song) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, selectedSong, onSelectSong }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-4 backdrop-blur-md border border-gray-700/50 h-full max-h-[85vh] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-purple-300 font-orbitron tracking-wide">SONG QUEUE</h2>
      <ul className="space-y-2">
        {songs.map((song) => (
          <li key={song.track_id}>
            <button
              onClick={() => onSelectSong(song)}
              className={`w-full text-left p-3 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                selectedSong?.track_id === song.track_id
                  ? 'bg-purple-600/40 text-white shadow-md'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
            >
              <p className="font-semibold text-sm truncate text-gray-100">{song.track_name}</p>
              <p className="text-xs text-gray-400">{song.track_artist}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
