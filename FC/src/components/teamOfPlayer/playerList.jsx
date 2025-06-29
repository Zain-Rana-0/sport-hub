import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spin, Alert, Button } from "antd";
// import "./playerList.css";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get("/api/getPlayerData");
      setPlayers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch players data");
      setLoading(false);
      console.error("Error fetching players:", err);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      filters: [
        { text: "Goalkeeper", value: "Goalkeeper" },
        { text: "Defender", value: "Defender" },
        { text: "Midfielder", value: "Midfielder" },
        { text: "Forward", value: "Forward" },
      ],
      onFilter: (value, record) => record.position === value,
    },
    {
      title: "Jersey Number",
      dataIndex: "jerseyNumber",
      key: "jerseyNumber",
      sorter: (a, b) => a.jerseyNumber - b.jerseyNumber,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-buttons">
          <Button type="primary" size="small" onClick={() => handleViewPlayer(record.id)}>
            View
          </Button>
          <Button type="default" size="small" onClick={() => handleEditPlayer(record.id)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const handleViewPlayer = (playerId) => {
    // Implement view player details functionality
    console.log("Viewing player:", playerId);
  };

  const handleEditPlayer = (playerId) => {
    // Implement edit player functionality
    console.log("Editing player:", playerId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Loading players...</p>
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="player-list-container">
      <h2>Team Players</h2>
      <Button
        type="primary"
        onClick={fetchPlayers}
        className="refresh-button"
      >
        Refresh Data
      </Button>
      <Table
        dataSource={players}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="players-table"
      />
    </div>
  );
};

export default PlayerList;