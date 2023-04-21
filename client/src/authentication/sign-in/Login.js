import "../sign-up/HandleSignUp";
import "../reset-password/ForgotPassword";

//api function
import { loginUser } from "../userList";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
//import axios from 'axios';

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //const [showForgotPassword, setShowForgotPassword] = useState(false); // add state for showing forgot password form
  //const [forgotPasswordUsername, setForgotPasswordUsername] = useState(''); // add state for forgot password form

  const handleLogin = (e) => {
    e.preventDefault();
    //check correct format
    const validUsername = /^[a-zA-Z]+\.[a-zA-Z]+$/.test(username);
    if (!validUsername) {
      setPasswordError("");
      setUsernameError("Username must be in the 'prename.name' format.");
      return;
    }
    // call api function + set error msg
    loginUser("http://localhost:8050/login", username, password, "Username is incorrect").then(
      (response) => {
        if (response.success) {
          setUsernameError("");
          setPasswordError("");

          // Redirect user based on type
          if (response.userType === "admin") {
            // Redirect to dashboard
            window.location.href = "../adminInterface/dashboard";
          } else {
            // Redirect to homepage
            window.location.href = "/UserInterface_client";
          }
        } else {
          if (response.message1) {
            setUsernameError(response.message1);
            setPasswordError("");
          } else {
            setPasswordError(response.message2);
            setUsernameError("");
          }
        }
      }
    );
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
                    <h2 className="fw-bold mb-2 text-uppercase ">Albaraka Bank</h2>
                    <p className=" mb-5">Please enter your username and password!</p>
                    <div className="mb-3">
                      <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Username</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="username"
                            className="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            isInvalid={!!usernameError}
                          />

                          <Form.Control.Feedback type="invalid">
                            {usernameError}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            className="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!passwordError}
                          />
                          <Form.Control.Feedback type="invalid">
                            {passwordError}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <p className="small">
                            <Link to="/reset_password">
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
                          <Link to="/sign_up">
                            {" "}
                            <button>signup</button>
                          </Link>
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
