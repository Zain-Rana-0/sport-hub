import React, { useEffect, useState } from "react";
import TournamentForm from "../components/tournamentForm";
import PlayerForm from "../components/playerForm";
import FixturesResults from "../components/fixtureResults";
import "../styles/Dashboard.css";
// Import MUI icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
// ...existing code...
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import TargetIcon from '@mui/icons-material/GpsFixed'; // Corrected import
import TournamentIcon from '@mui/icons-material/EmojiEvents';
// ...existing code...

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!isSidebarCollapsed && (
            <h1 className="sidebar-title">Club Admin</h1>
          )}
          <button 
            onClick={handleSidebarToggle} 
            className="sidebar-toggle"
          >
            {isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {[
            { id: "overview", icon: <DashboardIcon />, label: "Overview" },
            { id: "teams", icon: <GroupsIcon />, label: "Teams" },
            { id: "fixtures", icon: <EmojiEventsIcon />, label: "Fixtures" },
            { id: "tournament", icon: <SportsEsportsIcon />, label: "Tournament" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isSidebarCollapsed && (
                <span className="nav-label">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
        
        {isAdmin && !isSidebarCollapsed && (
          <div className="admin-profile">
            <div className="profile-container">
              <div className="profile-avatar">
                <PersonIcon />
              </div>
              <div>
                <p className="profile-name">Admin User</p>
                <p className="profile-role">Full Access</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1 className="page-title">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="header-actions">
            {/* Header actions content */}
          </div>
        </header>
        
        <main className="main-area">
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "teams" && <PlayerForm isAdmin={isAdmin} />}
          {activeTab === "tournament" && (
            <CreateTournament 
              isAdmin={isAdmin} 
              // showForm={showForm} 
              // setShowForm={setShowForm} 
            />
          )}
          {activeTab === "fixtures" && <FixturesResults />}
        </main>
      </div>
      
      {/* Quick Actions Button */}
      {isAdmin && activeTab === "tournament" && (
        <button
          className="add-button"
          onClick={() => setShowForm(true)}
          aria-label="Create Tournament"
        >
          <AddIcon />
        </button>
      )}

      {/* Modal */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <TournamentForm onSubmitSuccess={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  );
}

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">Create Tournament</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

const OverviewSection = () => {
  const [stats, setStats] = useState({
    players: 24,
    matches: 12,
    wins: 8,
    tournaments: 3,
  });

  return (
    <div>
      <div>hello</div>
      


    </div>
  );
};

const CreateTournament = ({ isAdmin, showForm, setShowForm }) => {
  return (
    <>
      <div className="card">
        <div className="tournament-header">
          <div className="tournament-info">
            <h2>Manage Tournaments</h2>
            <p>
              Create and manage tournaments for your club
            </p>
          </div>
          
          {isAdmin && (
            <button
              className="create-button"
              onClick={() => setShowForm(true)}
            >
              Create New
            </button>
          )}
        </div>
      </div>

      {/* <div className="card">
        <h3 className="card-title">Upcoming Tournaments</h3>
        <div className="table-container">
          <table className="tournament-table">
            <thead className="table-header">
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Teams</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {[
                { name: "Summer League", date: "Jun 15 - Aug 20", teams: 8 },
                { name: "Youth Championship", date: "Jul 10 - Jul 25", teams: 6 }
              ].map((tournament, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell">
                    <span className="tournament-name">{tournament.name}</span>
                  </td>
                  <td className="table-cell">
                    <span className="tournament-date">{tournament.date}</span>
                  </td>
                  <td className="table-cell">
                    <span className="team-badge">
                      {tournament.teams} Teams
                    </span>
                  </td>
                  <td className="table-cell action-cell">
                    <button className="view-button">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};