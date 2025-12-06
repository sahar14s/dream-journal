import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Divider, IconButton, Modal, Zoom } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddDream from "../pages/AddDream";

const Footer = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ bottom: 0, height: "60px", top: "auto", left: 0 }}
      >
        <Container maxWidth="xl">
          <IconButton
            onClick={handleOpen}
            sx={{
              color: "white",
              display: "flex",
              position: "fixed",
              right: "2%",
              bottom: "2%",
            }}
          >
            <AddOutlinedIcon />
          </IconButton>
        </Container>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-dream-title"
        BackdropProps={{ className: "login-backdrop" }}
        closeAfterTransition
      >
        <Zoom in={open}>
          <div style={{ height: "100%", overflowY: "auto" }}>
            <AddDream onClose={handleClose} />
          </div>
        </Zoom>
      </Modal>
    </>
  );
};

export default Footer;
