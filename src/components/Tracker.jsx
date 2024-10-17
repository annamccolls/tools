import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/Tracker.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Tracker() {
  const [bingeData, setBingeData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [urgeData, setUrgeData] = useState([]);

  useEffect(() => {
    // Load binge data from localStorage
    const storedBingeData = JSON.parse(localStorage.getItem('bingeData')) || [];
    setBingeData(storedBingeData);

    // Load mood data from localStorage
    const storedMoodData = JSON.parse(localStorage.getItem('moodData')) || [];
    setMoodData(storedMoodData);

    // Load urge data from localStorage
    const storedUrgeData = JSON.parse(localStorage.getItem('urgeData')) || [];
    setUrgeData(storedUrgeData);
  }, []);

  const combinedData = [...bingeData, ...moodData, ...urgeData].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const chartData = {
    labels: combinedData.map(data => new Date(data.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'Binge Events',
        data: combinedData.map(data => data.type === 'binge' ? 10 : null),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Mood Intensity',
        data: combinedData.map(data => data.type === 'mood' ? data.intensity : null),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Urge Intensity',
        data: combinedData.map(data => data.type === 'urge' ? data.intensity : null),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        tension: 0.1,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Binge Events, Mood, and Urge Intensity Over Time',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const dataPoint = combinedData[context.dataIndex];
            if (dataPoint.type === 'binge') {
              return `Binge: ${dataPoint.meal}`;
            } else if (dataPoint.type === 'mood') {
              return `Mood: ${dataPoint.emotion} (Intensity: ${dataPoint.intensity}) at ${dataPoint.place}`;
            } else if (dataPoint.type === 'urge') {
              return `Urge: Intensity ${dataPoint.intensity}`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date and Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Intensity / Event'
        },
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    }
  };

  return (
    <div className="tracker-page">
      <h2>Binge, Mood, and Urge Tracker</h2>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Tracker;