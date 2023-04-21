/*import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

EditUser.propTypes = {
  location: PropTypes.object,
};

export default function EditUser({ location }) {
  const user = location?.state?.user || {};
  const [firstName, setFirstName] = useState(user.prenom_util);
  const [lastName, setLastName] = useState(user.nom_util);
  const [email, setEmail] = useState(user.email_util);
  const [phone, setPhone] = useState(user.telephone_util);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      id: user.id,
      prenom_util: firstName,
      nom_util: lastName,
      email_util: email,
      telephone_util: phone,
    };
    try {
      const res = await axios.put(
        `http://localhost:8000/api/users/${user.id}/`,
        updatedUser
      );
      navigate("/");
    } catch (error) {
      setError("Error updating user");
    }
  };

  return (
    <MDBox>
      <MDTypography variant="h4" gutterBottom>
        Edit User
      </MDTypography>
      {error && <MDTypography color="error">{error}</MDTypography>}
      <form onSubmit={handleUpdateUser}>
        <MDBox mb={3}>
          <MDTypography variant="h6">First Name</MDTypography>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </MDBox>
        <MDBox mb={3}>
          <MDTypography variant="h6">Last Name</MDTypography>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </MDBox>
        <MDBox mb={3}>
          <MDTypography variant="h6">Email</MDTypography>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </MDBox>
        <MDBox mb={3}>
          <MDTypography variant="h6">Phone</MDTypography>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3}>
          <button type="submit">Update User</button>
        </MDBox>
      </form>
    </MDBox>
  );
}


*/
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

//import {useParams} from 'react-router-dom'

export default function HandleSignUp(props) {
//const {idd} = useParams(); 
const [id, setId] = useState("");
const [name, setName] = useState("");
const [nameError, setNameError] = useState("");
const [prename, setPreName] = useState("");
const [prenameError, setPreNameError] = useState("");
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState("");
const [departement, setDepartement] = useState("");
const [departementError, setDepartementError] = useState("");
const [superUtilisateur, setsuperUtilisateur] = useState("");
const [superUtilisateurError, setsuperUtilisateurError] = useState("");


/*useEffect(() => {
  axios.get(`http://localhost:8050/users/${idd}`)
    .then(response => {
      setId(response.data.id_util);
      setName(response.data.nom_util);
      setPreName(response.data.prenom_util);
      setEmail(response.data.email_util);
    //setDepartement(response.data.id_departement.titre_departement);
    })
    .catch(error => console.log(error));
}, [idd]);*/

useEffect(() => {
  axios.get("http://localhost:8050/users/3")
  //axios.get(`http:/localhost:8050/users/${props.match.params.id}`)
  .then(response => {
  setId(response.data.id_util);
  setName(response.data.nom_util);
  setPreName(response.data.prenom_util);
  setEmail(response.data.email_util);
  //setDepartement(response.data.id_departement.titre_departement);
  })
  .catch(error => console.log(error));
  }, []);
  
/**/   


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

const validatesuperUtilisateur = () => {
  if (!superUtilisateur) {
  setsuperUtilisateurError("superutilisateur is required.");
  } else if (superUtilisateur.length < 3) {
  setsuperUtilisateurError("superutilisateur must be at least 3 characters.");
  } else {
    setsuperUtilisateurError("");
  }
  };

const validateEmail = () => {
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
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

const handleSubmit = (event) => {
event.preventDefault();
validateName();
validatePreName();
validateEmail();
validateDepartement();
validatesuperUtilisateur();
if (!nameError && !prenameError && !emailError && !departementError ) {
axios.put(`http://localhost:8050/users/${id}`, { nom_util: `${name}`, 
            prenom_util: `${prename}`, 
            email_util: `${email}`, 
           departement_util:`${departement}` })
.then(response => {
console.log(response);
props.history.push("/");
})
.catch(error => console.log(error));
}
};

return (
<Container className="mt-5">
<Row className="justify-content-center">

<Col md={8}>
<Card>
<Card.Body>
<Card.Title>Edit User</Card.Title>
<Form onSubmit={handleSubmit}>
<Form.Group controlId="formName">
<Form.Label>Name</Form.Label>
<Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} onBlur={validateName} />
{ nameError && <Form.Text className="text-danger">{nameError}</Form.Text> }
</Form.Group>
<Form.Group controlId="formPreName">
<Form.Label>Prename</Form.Label>
<Form.Control type="text" placeholder="Enter prename" value={prename} onChange={(e) => setPreName(e.target.value)} onBlur={validatePreName} />
{ prenameError && <Form.Text className="text-danger">{prenameError}</Form.Text> }
</Form.Group>

<Form.Group controlId="formEmail">
<Form.Label>Email</Form.Label>
<Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
{ emailError && <Form.Text className="text-danger">{emailError}</Form.Text> }
</Form.Group>

<Form.Group controlId="formDepartement">
<Form.Label>Departement</Form.Label>
<Form.Control as="select" value={departement} onChange={(e) => setDepartement(e.target.value)} onBlur={validateDepartement}>

<option value="">Choose a departement</option>
<option value="IT">IT</option>
<option value="HR">HR</option>
<option value="Finance">Finance</option>
</Form.Control>
{ departementError && <Form.Text className="text-danger">{departementError}</Form.Text> }
</Form.Group>
<Form.Group controlId="formPreName">
<Form.Label>super utilisateur</Form.Label>
<Form.Control type="text" placeholder="Enter prename" value={superUtilisateur} onChange={(e) => setsuperUtilisateur(e.target.value)} onBlur={validatesuperUtilisateur} />
{ superUtilisateurError && <Form.Text className="text-danger">{superUtilisateurError}</Form.Text> }
</Form.Group>

<Button variant="primary" type="submit">
Submit
</Button>
<Link to="/" className="btn btn-danger ml-2">Cancel</Link>
</Form>
</Card.Body>
</Card>
</Col>
</Row>
</Container>
);
}