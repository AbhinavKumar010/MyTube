import { Box, Typography } from "@mui/material";
import "./TrillCard.css";

const TrillCard = ({ tril }) => {
  return (
    <Box className="tril-card" sx={{ width: 120,height: 200, m: 1 }}>
      <img src={tril.thumbnail} alt={tril.title} className="tril-thumbnail" />
      <Typography className="tril-title">{tril.title}</Typography>
      <Typography className="tril-views">{tril.views} views</Typography>
    </Box>
  );
};

export default TrillCard;
