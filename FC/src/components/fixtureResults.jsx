import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FixtureResults() {
  const [fixtures, setFixtures] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFixtureId, setEditingFixtureId] = useState(null);
  const [editedFixture, setEditedFixture] = useState({});
  // Add new state variables
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFixture, setNewFixture] = useState({
    date: "",
    type: "bilateral",
    homeTeam: "",
    awayTeam: "",
    score: "",
  });

  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setIsAdmin(user?.role === "admin");
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    };
    checkAdminStatus();
  }, []);

  useEffect(() => {
    // Fetch fixtures from API
    const fetchFixtures = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/fixtures");
        setFixtures(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch fixtures:", err);
        setError("Failed to load fixtures. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  // Add function to handle creating a new fixture
  const handleCreateFixture = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/fixtures",
        newFixture
      );
      setFixtures([...fixtures, response.data]);
      setShowAddForm(false);
      setNewFixture({
        date: "",
        type: "bilateral",
        homeTeam: "",
        awayTeam: "",
        score: "",
      });
    } catch (error) {
      console.error("Failed to create fixture:", error);
      setError("Failed to create fixture. Please try again.");
    }
  };

  // Add function to handle form input changes for new fixture
  const handleNewFixtureChange = (e) => {
    const { name, value } = e.target;
    setNewFixture({ ...newFixture, [name]: value });
  };

  // Add function to handle fixture deletion
  const handleDeleteFixture = async (fixtureId) => {
    if (window.confirm("Are you sure you want to delete this fixture?")) {
      try {
        await axios.delete(`http://localhost:8000/api/fixtures/${fixtureId}`);
        setFixtures(
          fixtures.filter(
            (fixture) => (fixture._id || fixture.id) !== fixtureId
          )
        );
      } catch (error) {
        console.error("Failed to delete fixture:", error);
        setError("Failed to delete fixture. Please try again.");
      }
    }
  };

  // Function to handle edit click
  const handleEditClick = (fixture) => {
    setEditingFixtureId(fixture._id || fixture.id);
    setEditedFixture({ ...fixture });
  };

  // Function to handle save click
  const handleSaveClick = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/fixtures/${editingFixtureId}`,
        editedFixture
      );
      setFixtures(
        fixtures.map((fixture) =>
          (fixture._id || fixture.id) === editingFixtureId
            ? editedFixture
            : fixture
        )
      );
      setEditingFixtureId(null);
    } catch (error) {
      console.error("Failed to update fixture:", error);
      setError("Failed to update fixture. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Fixtures & Results</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Create Fixture Button and Form */}
      {isAdmin && (
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
          >
            {showAddForm ? "Cancel" : "Create New Fixture"}
          </button>

          {showAddForm && (
            <form
              onSubmit={handleCreateFixture}
              className="bg-gray-50 p-4 rounded border mb-6"
            >
              <h3 className="text-xl font-semibold mb-4">Add New Fixture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newFixture.date}
                    onChange={handleNewFixtureChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Type</label>
                  <select
                    name="type"
                    value={newFixture.type}
                    onChange={handleNewFixtureChange}
                    className="border rounded p-2 w-full"
                    required
                  >
                    <option value="bilateral">Bilateral</option>
                    <option value="group">Group League</option>
                    <option value="tournament">Tournament</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Home Team</label>
                  <input
                    type="text"
                    name="homeTeam"
                    value={newFixture.homeTeam}
                    onChange={handleNewFixtureChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Away Team</label>
                  <input
                    type="text"
                    name="awayTeam"
                    value={newFixture.awayTeam}
                    onChange={handleNewFixtureChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Score (optional)</label>
                  <input
                    type="text"
                    name="score"
                    value={newFixture.score}
                    onChange={handleNewFixtureChange}
                    className="border rounded p-2 w-full"
                    placeholder="e.g., 2-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Fixture
              </button>
            </form>
          )}
        </div>
      )}

      {loading ? (
        <p>Loading fixtures...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Home Team</th>
              <th className="p-2 text-left">Away Team</th>
              <th className="p-2 text-left">Score</th>
              {isAdmin && <th className="p-2 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {fixtures && fixtures.length > 0 ? (
              fixtures.map((fixture) => (
                <tr key={fixture._id || fixture.id} className="border-t">
                  {editingFixtureId === (fixture._id || fixture.id) ? (
                    <>
                      <td className="p-2">
                        <input
                          type="date"
                          value={
                            editedFixture.date
                              ? editedFixture.date.slice(0, 10)
                              : ""
                          }
                          onChange={(e) =>
                            setEditedFixture({
                              ...editedFixture,
                              date: e.target.value,
                            })
                          }
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={editedFixture.type}
                          onChange={(e) =>
                            setEditedFixture({
                              ...editedFixture,
                              type: e.target.value,
                            })
                          }
                          className="border rounded p-1 w-full"
                        >
                          <option value="bilateral">Bilateral</option>
                          <option value="group">Group League</option>
                          <option value="tournament">Tournament</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editedFixture.homeTeam}
                          onChange={(e) =>
                            setEditedFixture({
                              ...editedFixture,
                              homeTeam: e.target.value,
                            })
                          }
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editedFixture.awayTeam}
                          onChange={(e) =>
                            setEditedFixture({
                              ...editedFixture,
                              awayTeam: e.target.value,
                            })
                          }
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editedFixture.score}
                          onChange={(e) =>
                            setEditedFixture({
                              ...editedFixture,
                              score: e.target.value,
                            })
                          }
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      {isAdmin && (
                        <td className="p-2">
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                            onClick={() => setEditingFixtureId(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      <td className="p-2">
                        {fixture.date
                          ? new Date(fixture.date).toLocaleDateString()
                          : ""}
                      </td>
                      <td className="p-2">{fixture.type}</td>
                      <td className="p-2">{fixture.homeTeam}</td>
                      <td className="p-2">{fixture.awayTeam}</td>
                      <td className="p-2">{fixture.score || "TBD"}</td>
                      {isAdmin && (
                        <td className="p-2">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                            onClick={() => handleEditClick(fixture)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() =>
                              handleDeleteFixture(fixture._id || fixture.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="p-4 text-center">
                  No fixtures available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
