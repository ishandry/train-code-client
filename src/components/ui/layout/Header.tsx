import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Train Code
        </Typography>
        <nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white" }}>Login</Button>
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
