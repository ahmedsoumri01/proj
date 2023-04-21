import { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import axios from "axios";

export default function EditUser({ user }) {
  const [formData, setFormData] = useState({
    prenom_util: user.prenom_util,
    nom_util: user.nom_util,
    email_util: user.email_util,
    statut_util: user.statut_util,
    departement: user.departement.id,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8050/users/${user.id}`, formData)
      .then((response) => {
        // handle success
        console.log(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleDeleteClick = () => {
    axios
      .delete(`http://localhost:8050/users/${user.id}`)
      .then((response) => {
        // handle success
        console.log(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar name={`${formData.prenom_util} ${formData.nom_util}`} size="sm" />
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {formData.prenom_util} {formData.nom_util}
          </MDTypography>
          <MDTypography variant="caption">{formData.email_util}</MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mt={2}>
        <MDBox mr={2}>
          <MDTypography variant="subtitle1">Status:</MDTypography>
        </MDBox>
        <MDBadge
          badgeContent={formData.statut_util}
          color="success"
          variant="gradient"
          size="sm"
        />
      </MDBox>
      <MDBox display="flex" alignItems="center" mt={2}>
        <MDBox mr={2}>
          <MDTypography variant="subtitle1">Department:</MDTypography>
        </MDBox>
        <select name="departement" value={formData.departement} onChange={handleInputChange}>
          <option value="1">Department 1</option>
          <option value="2">Department 2</option>
          <option value="3">Department 3</option>
        </select>
      </MDBox>
      <MDBox display="flex" alignItems="center" justifyContent="flex-end" mt={3}>
        <MDBox mr={2}>
          <button type="button" onClick={handleDeleteClick}>
            Delete
          </button>
        </MDBox>
        <button type="submit">Save</button>
      </MDBox>
    </form>
  );
}/*
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

EditUserForm.propTypes = {
  userId: PropTypes.number.isRequired,
};

const EditUserForm = (props) => {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8050/users/${props.userId}`)
      .then((response) => {
        setUser(response.data);
        setFirstName(response.data.prenom_util);
        setLastName(response.data.nom_util);
        setEmail(response.data.email_util);
        setDepartmentId(response.data.id_departement);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8050/users/${user.id}`, {
        prenom_util: firstName,
        nom_util: lastName,
        email_util: email,
        id_departement: departmentId,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBox display="flex" flexDirection="column">
        <label>Prénom</label>
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label>Nom</label>
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Département</label>
        <input
          type="text"
          value={departmentId}
          onChange={(event) => setDepartmentId(event.target.value)}
        />
        <MDButton variant="contained" color="primary" type="submit">
          Modifier
        </MDButton>
      </MDBox>
    </form>
  );
};

*/