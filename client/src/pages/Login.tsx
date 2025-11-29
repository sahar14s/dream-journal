import React, { useState } from "react";
import "../styles/pages/_login.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import BackGif from '../assets/background login video.mp4'
const Login = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="login-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="login-background-video"
        >
          <source src={BackGif} type="video/mp4" />
        </video>
      </div>

      <div className="page  login-page">
        <div>
          {!open && <Button onClick={handleOpen}><h1>Login</h1></Button>}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
            BackdropProps={{ className: "login-backdrop" }}
          >
            <Box className="login-modal">
              <Typography id="login-modal-title" variant="h6" component="h2">
                <h1>Login</h1>
              </Typography>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
              ></TextField>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
              ></TextField>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
              ></TextField>
            </Box>
          </Modal>
        </div>{" "}
      </div>
    </>
  );
};

export default Login;
