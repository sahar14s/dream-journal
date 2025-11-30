import React, { useState } from "react";
import "../styles/pages/_login.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import BackGif from "../assets/background login video.mp4";
import axios from "axios";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
const Login = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpNameErr, setSignUpNameErr] = useState(false);
  const [signUpEmailErr, setSignUpEmailErr] = useState(false);
  const [signUpPasswordErr, setSignUpPasswordErr] = useState(false);
  const [loginEmailErr, setLoginEmailErr] = useState(false);
  const [loginPasswordErr, setLoginPasswordErr] = useState(false);
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
    setSignUpEmail("");
    setSignUpPassword("");
    setSignUpName("");
    setSignUpEmailErr(false);
    setSignUpPasswordErr(false);
    setSignUpNameErr(false);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
    setLoginEmail("");
    setLoginPassword("");
    setLoginEmailErr(false);
    setLoginPasswordErr(false);
  };
  async function handleLogin() {
    if (!loginEmail || !loginPassword) {
      setLoginEmailErr(!loginEmail);
      setLoginPasswordErr(!loginPassword);
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
        { withCredentials: true }
      );
      setLoginEmail("");
      setLoginPassword("");
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  async function handleSignUp() {
    if (!signUpName || !signUpEmail || !signUpPassword) {
      setSignUpEmailErr(!signUpEmail);
      setSignUpNameErr(!signUpName);
      setSignUpPasswordErr(!signUpPassword);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          email: signUpEmail,
          password: signUpPassword,
          name: signUpName,
        }
      );
      setSignUpEmail("");
      setSignUpPassword("");
      setSignUpName("");
      console.log("Sign Up successful:", response.data);
    } catch (error) {
      console.error("Sign Up failed:", error);
    }
  }

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
        <h3>Track Your Dreams</h3>
        <div>
          <>
            <div className="login-page__buttons">
              <Button onClick={handleOpenLogin}>
                <p>Login</p>
              </Button>
              <Button onClick={handleOpenSignUp}>
                <p>Sign Up</p>
              </Button>
            </div>
          </>

          {/* login modal */}
          <Modal
            open={openLogin}
            onClose={handleCloseLogin}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
            BackdropProps={{ className: "login-backdrop" }}
          >
            <Box className="login-modal">
              <Typography id="login-modal-title" variant="h6" component="h2">
                <h1>Login</h1>
              </Typography>
              <TextField
                inputProps={{ sx: { color: "white" } }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                error={loginEmailErr}
              ></TextField>
              <TextField
                inputProps={{ sx: { color: "white" } }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                error={loginPasswordErr}
              ></TextField>
              <IconButton onClick={handleLogin}>
                <VpnKeyOutlinedIcon fontSize="large"/>
              </IconButton>
            </Box>
          </Modal>
          {/* end of login modal */}

          {/* sign up modal */}
          <Modal
            open={openSignUp}
            onClose={handleCloseSignUp}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
            BackdropProps={{ className: "login-backdrop" }}
          >
            <Box className="login-modal">
              <Typography id="login-modal-title" variant="h6" component="h2">
                <h1>Sign Up</h1>
              </Typography>
              <TextField
                inputProps={{ sx: { color: "white" } }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                required
                error={signUpNameErr}
              ></TextField>
              <TextField
                inputProps={{ sx: { color: "white" } }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
                error={signUpEmailErr}
              ></TextField>
              <TextField
                inputProps={{ sx: { color: "white" } }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
                error={signUpPasswordErr}
              ></TextField>
              <IconButton onClick={handleSignUp}>
                <PersonAddAlt1OutlinedIcon fontSize="large" />
              </IconButton>
            </Box>
          </Modal>
          {/* end of sign up modal */}
        </div>{" "}
      </div>
    </>
  );
};

export default Login;
