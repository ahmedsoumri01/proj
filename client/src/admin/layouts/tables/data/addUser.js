import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

export default function HandleSignUp() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [prename, setPreName] = useState("");
  const [prenameError, setPreNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [departement, setDepartement] = useState("");
  const [departementError, setDepartementError] = useState("");
  ///const [superUtilisateur, setsuperUtilisateur] = useState("");
  //const [superUtilisateurError, setsuperUtilisateurError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  

  const validateName = () => {
    if (!name) {
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
      setPreNameError("Prename must be at least 3 characters.");
    } else {
      setPreNameError("");
    }
  };

 /* const validatesuperUtilisateur = () => {
    if (!superUtilisateur) {
      setsuperUtilisateurError("superutilisateur is required.");
    } else if (superUtilisateur.length < 3) {
      setsuperUtilisateurError("superutilisateur must be at least 3 characters.");
    } else {
      setsuperUtilisateurError("");
    }
  };*/

  const validatePassword = () => {
    if (!password) {
      console.log('lmdppp')
      setPasswordError("Password is required.");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
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
    if (!departement) {
      setDepartementError("Choose a departement!");
    } else {
      setDepartementError("");
    }
  };
  const d = "IT"
  const handleSubmit = (event) => {
    event.preventDefault();
    validateName();
    validatePreName();
    validateEmail();
    validateDepartement();
 //   validatesuperUtilisateur();
    validatePassword();
   
    if (!nameError && !prenameError && !emailError && !departementError  && !passwordError) {
        console.log(departement)     
           axios.post('http://localhost:8050/users', { 
            nom_util: `${name}`, 
            prenom_util: `${prename}`, 
            email_util: `${email}`, 
            mdp_util:`${password}`,
           departement_util:`${departement}`
          })
        .then((response) => {
          console.log(response);
          window.location.href = "/";
        })
        .catch((error) => console.log(error , "errror posst !! " , departement));
    }
    };
    
    return (
    <Container>
    <Row className="justify-content-md-center">
    <Col md="6">
    <Card className="shadow-sm">
    <Card.Body>
    <h3 className="mb-4">ajouter un utilisateur</h3>
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="name">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} onBlur={validateName} />
    {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}
    </Form.Group>
    <Form.Group controlId="prename">
    <Form.Label>Prename</Form.Label>
    <Form.Control type="text" placeholder="Enter prename" value={prename} onChange={(e) => setPreName(e.target.value)} onBlur={validatePreName} />
    {prenameError && <Form.Text className="text-danger">{prenameError}</Form.Text>}
    </Form.Group>
    <Form.Group controlId="email">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
    {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
    </Form.Group>
    <Form.Group controlId="departement">
    <Form.Label>Departement</Form.Label>
    <Form.Control as="select" value={departement} onChange={(e) => setDepartement(e.target.value)} onBlur={validateDepartement}>
    <option value="">Choose a departement</option>
    <option value="recherche et developement"> recherche et developement</option>
    <option value="IT">IT</option>
    <option value="systeme information"> systeme information</option>
    <option value="HR">HR</option>
    </Form.Control>
    {departementError && <Form.Text className="text-danger">{departementError}</Form.Text>}
    </Form.Group>
    
    <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >                                                        
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  value={password}  onChange={ (e) =>setPassword(e.target.value)}
                         onBlur={validatePassword} isInvalid={!!passwordError}/>
                       <Form.Control.Feedback type="invalid">
                          {passwordError}
                        </Form.Control.Feedback>

                      </Form.Group>

    <Button variant="primary" type="submit">
    Submit
    </Button>
    </Form>
    </Card.Body>
    </Card>
    </Col>
    </Row>
    </Container>
    );
    }
