import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const {
    notifications,
    totalPages,
    loading,
    error,
  } = useNotifications(page, filter);
  const unreadCount = notifications.length;
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter || "All");
    setPage(1);
  };
  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };
  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" spacing={1} alignItems="center" mb={3}>
        <Badge badgeContent={unreadCount} color="primary">
          <NotificationsIcon />
        </Badge>
        <Typography variant="h4">
          Notifications
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />
      <NotificationFilter
        value={filter}
        onChange={handleFilterChange}
      />
      <Box mt={3} />
      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {!loading && error && (
        <Alert severity="error">
          Failed to load notifications: {error}
        </Alert>
      )}
      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">
          No notifications found.
        </Alert>
      )}
      {!loading && !error && notifications.length > 0 && (
        <Stack spacing={2}>
          {notifications.map((n) => (
            <NotificationCard
              key={n.ID}
              notification={n}
            />
          ))}
        </Stack>
      )}
      {!loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}