/*
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
*/
import  "../sign-up/index";
import "../reset-password/cover/index"

//api function
import { loginUser } from '../userList';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
//import axios from 'axios';

export default function Login(props) {
  const [username, setUsername] = useState(''); 
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
 //const [showForgotPassword, setShowForgotPassword] = useState(false); // add state for showing forgot password form
  //const [forgotPasswordUsername, setForgotPasswordUsername] = useState(''); // add state for forgot password form

  const handleLogin = (e) => {
    e.preventDefault();
//check correct format 
    const validUsername = /^[a-zA-Z]+\.[a-zA-Z]+$/.test(username);
    if (!validUsername) {
      setPasswordError('');
      setUsernameError("Username must be in the 'prename.name' format.");
      return;
    }
    // call api function + set error msg 
    loginUser('http://localhost:8050/login',username, password,'Username is incorrect').then((response) => {
      if (response.success) {
        setUsernameError('');
        setPasswordError('');

         // Redirect user based on type
         if (response.userType === 'admin') {
          // Redirect to dashboard
          window.location.href = '../adminInterface/dashboard';
        } else {
          // Redirect to homepage
          window.location.href = '../userInterface/homePage';
        }

      } else {
        if (response.message1) {
          setUsernameError(response.message1);
          setPasswordError('');
        } else {
          setPasswordError(response.message2);
          setUsernameError('');
        }
      }
    });
  };









 /* const handleForgotPassword = (e) => {
    e.preventDefault();

    const validUsername = /^[a-zA-Z]+\.[a-zA-Z]+$/.test(forgotPasswordUsername);
    if (!validUsername) {
      setErrorMessage("Username must be in the 'prename.name' format.");
      return;
    }
    
    axios.post('http://localhost:8050/forgot-password', { username: forgotPasswordUsername })
      .then((response) => {
        setErrorMessage('');
        console.log('forgot password success', response);
        // TODO: show success message to user
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
          console.log('response error' ,error.response , error.response.data.message )
        } else if (error.request) {
          setErrorMessage('Unable to reach server. Please try again later.');
          console.log('no response')
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };

 /* const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleHideForgotPassword = () => {
    setShowForgotPassword(false);
  };*/


  return (
    <div className="cover">
      <div>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center ">
            <Col md={8} lg={6} xs={12}>
              <div className="border border-3 border-danger"></div>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase "> logo</h2>
                    <p className=" mb-5">Please enter your username and password!</p>
                    <div className="mb-3">
                      <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Username
                          </Form.Label>
                          <Form.Control type="text" placeholder="username" className="username" value={username} 
                          onChange={(e) => setUsername(e.target.value)}
                          isInvalid={!!usernameError} />
                          
                          <Form.Control.Feedback type="invalid">
                          {usernameError}
                        </Form.Control.Feedback>

                        </Form.Group>
                       
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" className="pass" value={password} 
                          onChange={(e) => setPassword(e.target.value)}
                          isInvalid={!!passwordError} />
                               <Form.Control.Feedback type="invalid">
                          {passwordError}
                        </Form.Control.Feedback>

                        </Form.Group>
                       
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <p className="small">
                            <Link to='./ForgotPassword'>
                            <a className="text-danger" href="#!">
                             Forgot password? 
                            </a>
                            </Link>
                          </p>
                        </Form.Group>
                        <div className="d-grid">
                          <Button variant="danger" type="submit">
                            Login
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0 text-center">
                          Don't have an account?
                         <Link to='../sign-up/index'>  <button >signup</button></Link> 
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
