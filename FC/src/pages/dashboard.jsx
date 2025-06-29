import React, { useEffect, useState } from "react";
import TournamentForm from "../components/tournamentForm";
import PlayerForm from "../components/teamOfPlayer/playerForm";
import FixturesResults from "../components/fixtureResults";
import "../styles/Dashboard.css";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  useMediaQuery,
  Fab,
  Paper,
  Zoom,
  Button,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// MUI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import TrophyIcon from "@mui/icons-material/EmojiEvents";
import StadiumIcon from "@mui/icons-material/Stadium";
import PlayerList from "../components/teamOfPlayer/playerList";

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showTournamentForm, setShowTournamentForm] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Use theme and responsive breakpoints
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  // Set sidebar to collapsed by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

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

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const openTournamentModal = () => {
    setModalTitle("Create Tournament");
    setShowTournamentForm(true);
  };

  const openTeamModal = () => {
    setModalTitle("Create Team");
    setShowPlayerForm(true);
  };

  const drawerWidth = isSidebarCollapsed ? 64 : 240;

  // Navigation items
  const navItems = [
    { id: "overview", icon: <DashboardIcon />, label: "Overview" },
    { id: "teams", icon: <GroupsIcon />, label: "Teams" },
    { id: "fixtures", icon: <EmojiEventsIcon />, label: "Fixtures" },
    { id: "tournament", icon: <SportsEsportsIcon />, label: "Tournament" },
  ];

  // Sidebar content component - reused for both desktop and mobile
  const sidebarContent = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isSidebarCollapsed ? "center" : "space-between",
          py: 2,
          px: isSidebarCollapsed ? 1 : 2,
        }}
      >
        {!isSidebarCollapsed && (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Club Admin
          </Typography>
        )}
        <IconButton onClick={handleSidebarToggle}>
          {isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ mt: 1 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            selected={activeTab === item.id}
            sx={{
              borderRadius: "8px",
              mx: 1,
              mb: 0.5,
              cursor: "pointer",
              "&.Mui-selected": {
                backgroundColor: "primary.light",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              },
            }}
          >
            <Tooltip
              title={isSidebarCollapsed ? item.label : ""}
              placement="right"
            >
              <ListItemIcon sx={{ minWidth: isSidebarCollapsed ? "auto" : 40 }}>
                {item.icon}
              </ListItemIcon>
            </Tooltip>
            {!isSidebarCollapsed && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>

      {isAdmin && !isSidebarCollapsed && (
        <Box sx={{ mt: "auto", p: 2 }}>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Admin User
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Full Access
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* App Bar - only visible on mobile */}
        <AppBar
          position="fixed"
          sx={{
            display: { sm: "none" },
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMobileDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              FC Club Admin
            </Typography>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          }}
        >
          {sidebarContent}
        </Drawer>

        {/* Desktop sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              overflowX: "hidden",
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            },
          }}
          open={!isSidebarCollapsed}
        >
          {sidebarContent}
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: "background.default",
            overflow: "auto",
            mt: { xs: 8, sm: 0 },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 3,
              pb: 2,
              fontWeight: 500,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Typography>

          <Box>
            {activeTab === "overview" && <OverviewSection />}
            {activeTab === "teams" && (
              <ManageTeams isAdmin={isAdmin} openTeamModal={openTeamModal} />
            )}
            {activeTab === "tournament" && (
              <CreateTournament
                isAdmin={isAdmin}
                openTournamentModal={openTournamentModal}
              />
            )}
            {activeTab === "fixtures" && <FixturesResults userRole="admin" />}
          </Box>
        </Box>
      </Box>

      {/* Floating Action Button */}
      {isAdmin && (activeTab === "tournament" || activeTab === "teams") && (
        <Zoom in={true}>
          <Fab
            color="primary"
            aria-label={
              activeTab === "tournament" ? "Create Tournament" : "Create Team"
            }
            onClick={
              activeTab === "tournament" ? openTournamentModal : openTeamModal
            }
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
          >
            <Tooltip
              title={
                activeTab === "tournament" ? "Create Tournament" : "Create Team"
              }
            >
              <AddIcon />
            </Tooltip>
          </Fab>
        </Zoom>
      )}

      {/* Tournament Form Dialog */}
      <Dialog
        open={showTournamentForm}
        onClose={() => setShowTournamentForm(false)}
        fullWidth
        maxWidth="md"
        scroll="paper"
        TransitionProps={{
          onExited: () => setModalTitle(""),
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TrophyIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">{modalTitle}</Typography>
          </Box>
          <IconButton
            edge="end"
            onClick={() => setShowTournamentForm(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TournamentForm
            onSubmitSuccess={() => setShowTournamentForm(false)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTournamentForm(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Player Form Dialog */}
      <Dialog
        open={showPlayerForm}
        onClose={() => setShowPlayerForm(false)}
        fullWidth
        maxWidth="md"
        scroll="paper"
        TransitionProps={{
          onExited: () => setModalTitle(""),
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmojiPeopleIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">{modalTitle}</Typography>
          </Box>
          <IconButton
            edge="end"
            onClick={() => setShowPlayerForm(false)}
            aria-label="close"
            Typography
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <PlayerForm
            onSubmitSuccess={() => setShowPlayerForm(false)}
            isAdmin={isAdmin}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPlayerForm(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

const OverviewSection = () => {
  const statCards = [
    {
      title: "Total Players",
      value: 24,
      icon: <EmojiPeopleIcon color="primary" fontSize="large" />,
    },
    {
      title: "Matches",
      value: 12,
      icon: <SportsSoccerIcon color="primary" fontSize="large" />,
    },
    {
      title: "Wins",
      value: 8,
      icon: <TrophyIcon color="primary" fontSize="large" />,
    },
    {
      title: "Tournaments",
      value: 3,
      icon: <StadiumIcon color="primary" fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Club Statistics
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {statCards.map((stat, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 4,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="h3" component="div" fontWeight="bold">
                {stat.value}
              </Typography>
              {stat.icon}
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              {stat.title}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const ManageTeams = ({ isAdmin, openTeamModal }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mb: 2,
        }}
      >
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <Typography variant="h5" gutterBottom>
            Manage Teams
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage teams for your club
          </Typography>
          <div></div>
        </Box>

        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openTeamModal}
          >
            Create New Player
          </Button>
        )}
      </Box>
      {/* Player List Section */}
      <div className="player-list-section">
        <PlayerList />
      </div>
    </Paper>
  );
};

const CreateTournament = ({ isAdmin, openTournamentModal }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mb: 2,
        }}
      >
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <Typography variant="h5" gutterBottom>
            Manage Tournaments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage tournaments for your club
          </Typography>
        </Box>

        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openTournamentModal}
          >
            Create New Tournament
          </Button>
        )}
      </Box>
    </Paper>
  );
};
