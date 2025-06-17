import React, { useState } from 'react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Sarah', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
  { id: 2, name: 'Mike', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
  { id: 3, name: 'Emma', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
  { id: 4, name: 'John', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
  { id: 5, name: 'Lisa', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
  { id: 6, name: 'Alex', avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg' }
];

const mockData = {
  day: [
    { day: 'M', calories: 1800, carbs: 220, protein: 90, fat: 60 },
    { day: 'T', calories: 2100, carbs: 250, protein: 100, fat: 70 },
    { day: 'W', calories: 1950, carbs: 230, protein: 95, fat: 65 },
    { day: 'T', calories: 2000, carbs: 240, protein: 98, fat: 68 },
    { day: 'F', calories: 1900, carbs: 225, protein: 92, fat: 63 },
    { day: 'S', calories: 2200, carbs: 260, protein: 105, fat: 73 },
    { day: 'S', calories: 1850, carbs: 225, protein: 91, fat: 62 }
  ],
  week: [
    { day: 'Week 1', calories: 14000, carbs: 1680, protein: 670, fat: 460 },
    { day: 'Week 2', calories: 13500, carbs: 1620, protein: 650, fat: 445 },
    { day: 'Week 3', calories: 14500, carbs: 1740, protein: 690, fat: 475 },
    { day: 'Week 4', calories: 14200, carbs: 1700, protein: 680, fat: 465 }
  ],
  month: [
    { day: 'Jan', calories: 58000, carbs: 6960, protein: 2780, fat: 1910 },
    { day: 'Feb', calories: 54000, carbs: 6480, protein: 2590, fat: 1780 },
    { day: 'Mar', calories: 56000, carbs: 6720, protein: 2680, fat: 1840 }
  ]
};

type TimeRange = 'day' | 'week' | 'month';
type Metric = 'calories' | 'carbs' | 'protein' | 'fat';

const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [selectedMetric, setSelectedMetric] = useState<Metric>('calories');

  const metrics = {
    calories: { label: 'Calories', color: '#F97316' },
    carbs: { label: 'Carbs (g)', color: '#8B5CF6' },
    protein: { label: 'Protein (g)', color: '#10B981' },
    fat: { label: 'Fat (g)', color: '#F59E0B' }
  };

  const data = mockData[timeRange];
  const today = format(new Date(), 'EEEE');
  const todayIndex = data.findIndex(d => d.day === today[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      {/* User Avatars */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex gap-4">
          {mockUsers.map(user => (
            <div key={user.id} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-emerald-500 ring-offset-2">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm text-gray-600 mt-2">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Health Insight Banner */}
      <div className="bg-emerald-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Health Insight</h2>
        </div>
        <p className="text-emerald-50">
          You are burning 5% more calories than last week! Keep up the great work! 💪
        </p>
      </div>

      {/* Time Range Toggle */}
      <div className="bg-white rounded-xl p-2 flex gap-2 shadow-sm">
        {(['day', 'week', 'month'] as TimeRange[]).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-emerald-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Metric Selector */}
      <div className="grid grid-cols-2 gap-3">
        {(Object.entries(metrics) as [Metric, { label: string; color: string }][]).map(
          ([key, { label, color }]) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedMetric === key
                  ? 'bg-white shadow-md scale-[1.02]'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-sm text-gray-600">{label}</div>
              <div className="text-2xl font-bold mt-1" style={{ color }}>
                {data[todayIndex][key]}
              </div>
            </button>
          )
        )}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {metrics[selectedMetric].label} Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Bar
                dataKey={selectedMetric}
                fill={metrics[selectedMetric].color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;