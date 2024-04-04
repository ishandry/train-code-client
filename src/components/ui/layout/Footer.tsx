import { Typography } from "@mui/material";

function Footer() {
  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '1rem', textAlign: 'center' }}>
      <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
        © 2024 Train Code. All rights reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
