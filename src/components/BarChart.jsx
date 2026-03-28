import { Bar } from 'react-chartjs-2';
import { useTheme } from '../ThemeContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ title, data, color = 'rgb(59, 130, 246)' }) {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#334155';
  const gridColor = isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.5)';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(241, 245, 249, 0.95)';
  const tooltipText = isDark ? '#f1f5f9' : '#1e293b';
  const tickColor = isDark ? '#94a3b8' : '#64748b';
  const yTickColor = isDark ? '#cbd5e1' : '#475569';

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title.includes('Stars') ? 'Stars' : 'Count',
        data: Object.values(data),
        backgroundColor: color + '80',
        borderColor: color,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: { size: 14, weight: 'bold' },
        padding: { bottom: 15, top: 5 },
        color: textColor,
      },
      tooltip: {
        backgroundColor: tooltipBg,
        padding: 10,
        cornerRadius: 6,
        titleColor: tooltipText,
        bodyColor: tooltipText,
      },
    },
    scales: {
      x: {
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
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: yTickColor,
          font: { size: 11 },
          callback: function(value) {
            const label = this.getLabelForValue(value);
            return label.length > 20 ? label.substring(0, 20) + '...' : label;
          }
        },
      },
    },
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg p-4 hover:border-slate-400 dark:hover:border-slate-600 transition-colors">
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
