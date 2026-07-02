import {
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
const filters = ["All", "Placement", "Result", "Event"];
export function NotificationFilter({
  value,
  onChange,
}) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, value) => onChange(value)}
      size="small"
      sx={{ mb: 3 }}
    >
      {filters.map((type) => (
        <ToggleButton
          key={type}
          value={type}
        >
          {type}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}