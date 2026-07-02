import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
export function NotificationCard({ notification }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Chip
            label={notification.Type}
            color={
              notification.Type === "Placement"
                ? "success"
                : notification.Type === "Result"
                ? "primary"
                : "warning"
            }
            sx={{ width: "fit-content" }}
          />
          <Typography variant="h6">
            {notification.Message}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {notification.Timestamp}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}