/*
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function Cover() {
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput type="email" label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                reset
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
*/

import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import axios from 'axios';


export default function ForgotPassword(props){ 
   
  const [email,setEmail] = useState(''); 
const [errorMessage , setErrorMessage] = useState('');

  const Submit = (e)=>{
   
      e.preventDefault();
      try {
        const response = axios.post('http://localhost:8050/forgotPassword', { email });
        console.log(response.data);
        
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage('user not found ')
      }
    }  
    return(
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
                      <Form onSubmit={Submit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Username
                          </Form.Label>
                          <Form.Control type="email" placeholder="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                       
                        {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* render error message if there is an error */}
                       
                       
                        <div className="d-grid">
                          <Button variant="danger" type="submit">
                            submit
                          </Button>
                        </div>
                      </Form>
                     
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