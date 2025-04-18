"use client";

import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { dummyOwnerProfile } from '@/lib/dummy-data';

const { analytics } = dummyOwnerProfile;

const visitsData = [
  { name: 'Mon', visits: 120 },
  { name: 'Tue', visits: 150 },
  { name: 'Wed', visits: 180 },
  { name: 'Thu', visits: 190 },
  { name: 'Fri', visits: 240 },
  { name: 'Sat', visits: 280 },
  { name: 'Sun', visits: 260 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Visitor Traffic */}
        <div className="rounded-lg border p-4 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-lg font-medium">Weekly Visitor Traffic</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid hsl(var(--border))',
                    backgroundColor: 'hsl(var(--card))',
                    color: 'hsl(var(--card-foreground))'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Items */}
        <div className="rounded-lg border p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-medium">Top Menu Items</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.topItems}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {analytics.topItems.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid hsl(var(--border))',
                    backgroundColor: 'hsl(var(--card))',
                    color: 'hsl(var(--card-foreground))'
                  }} 
                  formatter={(value, name, props) => [`${value} orders`, props.payload.name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Ratings Over Time */}
      <div className="rounded-lg border p-4 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Ratings Over Time</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={analytics.ratingsByMonth}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis 
                domain={[0, 5]} 
                ticks={[0, 1, 2, 3, 4, 5]} 
                tick={{ fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid hsl(var(--border))',
                  backgroundColor: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))'
                }} 
                formatter={(value) => [`${value} stars`, 'Rating']}
              />
              <Bar 
                dataKey="rating" 
                fill="hsl(var(--chart-2))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;