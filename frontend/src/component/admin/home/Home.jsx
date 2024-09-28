import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "./Home.css";
import "chart.js/auto";

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const [userPieStats, setUserPieStats] = useState([]);
  const [mediaStats, setMediaStats] = useState([]);
  const [genreStats, setGenreStats] = useState([]);
  const [typeStats, setTypeStats] = useState([]);
  const [roleStats, setRoleStats] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("http://localhost:5000/user-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userData = await userResponse.json();
        setUserStats(userData.bar);
        setUserPieStats(userData.pie);

        const total = userData.bar.reduce((sum, stat) => sum + stat.COUNT, 0);
        setTotalUsers(total);

        const mediaResponse = await fetch("http://localhost:5000/media-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const mediaData = await mediaResponse.json();
        setMediaStats(mediaData);

        const genreResponse = await fetch("http://localhost:5000/genre-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const genreData = await genreResponse.json();
        setGenreStats(genreData);

        const typeResponse = await fetch("http://localhost:5000/type-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const typeData = await typeResponse.json();
        setTypeStats(typeData);

        const roleResponse = await fetch("http://localhost:5000/role-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const roleData = await roleResponse.json();
        setRoleStats(roleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for charts
  const barData = {
    labels: userStats.map((stat) => stat.NAME),
    datasets: [
      {
        label: "Count",
        data: userStats.map((stat) => stat.COUNT),
        backgroundColor: "#ff640a",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: userStats.map((stat) => stat.NAME),
    datasets: [
      {
        label: "Users",
        data: userStats.map((stat) => stat.COUNT),
        backgroundColor: ["#ff900a", "#ff640a", "#ff220a"], // #fff4e1 #ffdd95 #e6c37e #ccaa68 #b39352
      },
    ],
  };

  const mediaData = {
    labels: mediaStats.map((stat) => stat.NAME),
    datasets: [
      {
        label: "Count",
        data: mediaStats.map((stat) => stat.COUNT),
        backgroundColor: "#ff640a",
        borderWidth: 1,
      },
    ],
  };

  const genreData = {
    labels: genreStats.map((stat) => stat.genre),
    datasets: [
      {
        label: "Count",
        data: genreStats.map((stat) => stat.count),
        backgroundColor: "#ff640a",
        borderWidth: 1,
      },
    ],
  };

  const typeData = {
    labels: typeStats.map((stat) => stat.TYPE),
    datasets: [
      {
        label: "Count",
        data: typeStats.map((stat) => stat.COUNT),
        backgroundColor: "#ff640a",
        borderWidth: 1,
      },
    ],
  };

  const roleData = {
    labels: roleStats.map((stat) => stat.ROLE),
    datasets: [
      {
        label: "Count",
        data: roleStats.map((stat) => stat.COUNT),
        backgroundColor: "#ff640a",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 2500,
      easing: "easeOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#4d5059", // Change this to your desired grid color
        },
      },
      x: {
        grid: {
          color: "#4d5059", // Change this to your desired grid color
        },
      },
    },
  };

  return (
    <div className="home-page">
      <div className="chart-container1-outer">
        <h2>User Statistics</h2>
        <div className="chart-container1">
          <div className="chart1">
            <Bar data={barData} options={chartOptions} />
          </div>

          <div className="chart1">
            <div className="chart-total">
              <p>Total Users</p>
              <h1>{totalUsers}</h1>
            </div>
          </div>

          <div className="chart1">
            <div className="pie-chart">
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart">
          <h2>Media Type Statistics</h2>
          <Bar data={typeData} options={chartOptions} />
        </div>

        <div className="chart">
          <h2>Media Genre Statistics</h2>
          <div className="genre-chart">
            <Bar data={genreData} options={chartOptions} />
          </div>
        </div>

        <div className="chart">
          <h2>Role Statistics</h2>
          <Bar data={roleData} options={chartOptions} />
        </div>
      </div>

      <div className="chart-container">
        <div className="chart">
          <h2>Media, Role, Product Statistics</h2>
          <Bar data={mediaData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Home;
