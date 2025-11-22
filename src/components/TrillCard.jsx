import React from "react";
import { Box, Typography } from "@mui/material";
import "./TrillCard.css";

const TrillCard = ({ tril }) => {
  return (
    <Box className="tril-card">
      <img src={tril.thumbnail} alt={tril.title} className="tril-thumbnail" />
      <Typography className="tril-title">{tril.title}</Typography>
      <Typography className="tril-views">{tril.views} views</Typography>
    </Box>
  );
};

export default TrillCard;
