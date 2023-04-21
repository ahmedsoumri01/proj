/*

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
*/

import { loginUser } from "../userList";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";

export default function HandleSignUp(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [prename, setPreName] = useState("");
  const [prenameError, setPreNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [departement, setDepartement] = useState("");
  const [departementError, setDepartementError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");

  //check data validation
  const validateName = () => {
    if (!name) {
      console.log("lnaameee");
      setNameError("Name is required.");
    } else if (name.length < 3) {
      setNameError("Name must be at least 3 characters.");
    } else {
      setNameError("");
    }
  };

  const validatePreName = () => {
    if (!prename) {
      setPreNameError("Prename is required.");
    } else if (prename.length < 3) {
      setPreNameError("prename must be at least 3 characters.");
    } else {
      setPreNameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  const validateDepartement = () => {
    if (departement === 0) setDepartementError("choose a departement !");
  };

  const validatePassword = () => {
    if (!password) {
      console.log("lmdppp");
      setPasswordError("Password is required.");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  const validatePass = () => {
    if (!passwordError) {
      if (!pass) {
        console.log("lmdppp2");
        setPassError("Password is required.");
      } else if (pass !== password) {
        setPassError("Password is incorrect.");
      } else {
        setPassError("");
      }
    } else setPassError("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    validateName();
    validatePreName();
    validateEmail();
    validateDepartement();
    validatePassword();
    validatePass();

    //api

    loginUser("http://localhost:8050/signup", name, prename, "username already exist ! ").then(
      (response) => {
        if (response.success) {
          setNameError("");
          setPreNameError("");
        } else {
          if (response.message1) {
            setNameError(response.message1);
            setPreNameError("");
          } else {
            setPreNameError(response.message2);
            setNameError("");
          }
        }
      }
    );

    // Submit form if all fields are valid
    if (
      !nameError &&
      !prenameError &&
      !emailError &&
      !departementError &&
      !passwordError &&
      !passError
    ) {
      console.log("submitted to admin! ");
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-danger"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Logo</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSignUp}>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onBlur={validateName}
                          isInvalid={!!nameError}
                        />
                        <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="text-center">Prename</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Prename"
                          value={prename}
                          onChange={(e) => setPreName(e.target.value)}
                          onBlur={validatePreName}
                          isInvalid={!!prenameError}
                        />
                        <Form.Control.Feedback type="invalid">{prenameError}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="text-center">Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={validateEmail}
                          isInvalid={!!emailError}
                        />
                        <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">departement</Form.Label>

                        <Form.Select
                          aria-label="Default select example"
                          value={departement}
                          onChange={(e) => setDepartement(e.target.value)}
                          onBlur={validateDepartement}
                          isInvalid={!!departementError}
                        >
                          <option hidden value="0">
                            select your departement
                          </option>
                          <option value="1">informatique</option>
                          <option value="2">reseau</option>
                          <option value="3">securité</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {departementError}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={validatePassword}
                          isInvalid={!!passwordError}
                        />
                        <Form.Control.Feedback type="invalid">
                          {passwordError}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                          onBlur={validatePass}
                          isInvalid={!!passError}
                        />
                        <Form.Control.Feedback type="invalid">{passError}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                      <div className="d-grid">
                        <Button variant="danger" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <Link to="/">
                          {" "}
                          <button>login</button>
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
  );
}

//<button onClick={() => props.onFormSwitch('login')}>login</button>
