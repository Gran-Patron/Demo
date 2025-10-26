
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Song } from '../types';

interface FeatureRadarChartProps {
  song: Song;
}

const FeatureRadarChart: React.FC<FeatureRadarChartProps> = ({ song }) => {
  const data = [
    { subject: 'Danceability', value: song.danceability, fullMark: 1 },
    { subject: 'Energy', value: song.energy, fullMark: 1 },
    { subject: 'Speechiness', value: song.speechiness, fullMark: 1 },
    { subject: 'Acousticness', value: song.acousticness, fullMark: 1 },
    { subject: 'Liveness', value: song.liveness, fullMark: 1 },
    { subject: 'Valence', value: song.valence, fullMark: 1 },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#4A5568" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#A0AEC0', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 1]} tick={{ fill: 'transparent' }} />
        <Radar name={song.track_name} dataKey="value" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
        <Tooltip
            contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4A5568',
                borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#E5E7EB' }}
        />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#CBD5E0' }} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default FeatureRadarChart;
