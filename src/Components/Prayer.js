import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function MediaCard({ name, time, image }) {
  return (
    <Card sx={{ width: "17vw" }}>
      <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      <CardContent>
        <h2>{name}</h2>

        <Typography
          variant="h1"
          color="text.secondary"
          style={{ fontWieght: "100" }}
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
