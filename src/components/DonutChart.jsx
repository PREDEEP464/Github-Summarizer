import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../ThemeContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ title, data }) {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#334155';
  const borderColor = isDark ? '#1e293b' : '#f1f5f9';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(241, 245, 249, 0.95)';
  const tooltipText = isDark ? '#f1f5f9' : '#1e293b';
  const legendColor = isDark ? '#cbd5e1' : '#475569';

  const defaultColors = [
    'rgb(59, 130, 246)',
    'rgb(168, 85, 247)',
    'rgb(236, 72, 153)',
    'rgb(34, 197, 94)',
    'rgb(249, 115, 22)',
  ];

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: defaultColors,
        borderColor: borderColor,
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 11, weight: '500' },
          padding: 12,
          color: legendColor,
          boxWidth: 10,
          boxHeight: 10,
        },
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
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `  ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg p-4 hover:border-slate-400 dark:hover:border-slate-600 transition-colors">
      <div className="h-56 flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
