import { Line } from 'react-chartjs-2';
import { useTheme } from '../ThemeContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function QuarterlyCommitChart({ data }) {
  const { theme } = useTheme();

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const isDark = theme === 'dark';
  const tickColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(226, 232, 240, 0.3)';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(241, 245, 249, 0.95)';
  const tooltipText = isDark ? '#f1f5f9' : '#1e293b';
  const textColor = isDark ? '#cbd5e1' : '#334155';
  const subTextColor = isDark ? '#64748b' : '#94a3b8';

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Commits',
        data: Object.values(data),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: isDark ? '#1e293b' : '#f1f5f9',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: tooltipBg,
        padding: 12,
        cornerRadius: 8,
        titleColor: tooltipText,
        bodyColor: tooltipText,
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: tickColor,
          font: { size: 11 },
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: tickColor,
          font: { size: 11 },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-800/30 border border-slate-300 dark:border-slate-700/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-300">Commits per Quarter</h3>
        <span className="text-xs text-slate-600 dark:text-slate-500">Based on top 20 repos</span>
      </div>
      <div style={{ height: '200px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
