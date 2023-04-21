import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import axios from "axios";
import "./editUser";

function User({ name, email }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default function UserData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8050/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return ({
    columns: [
      { Header: "Utilisateur", accessor: "user", width: "45%", align: "left" },
      { Header: "Dernier Login", accessor: "last_login", align: "center" },
      { Header: "Departement", accessor: "departement", align: "center" },
      { Header: "statut", accessor: "statut", align: "center" },
      { Header: "super utilisateur", accessor: "supUser", align: "center" },
      { Header: "Action", accessor: "action", align: "right" },
    ],
    rows: users.map((user) => ({
      user: (
        <User
          name={`${user.prenom_util} ${user.nom_util}`}
          email={user.email_util}
        />
      ),
      departement: user.id_departement?.titre_departement || "",
      statut: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={user.statut_util}
            color="success"
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      last_login: user.dernier_login_util,
      supUser : user.id_super_util,
      action: (
        <MDTypography
          component={Link}
          to={{
            pathname: `./editUser/${user.id}`,
            state: { user: user }
          }}
          color="primary"
          underline="hover"
        >
          Edit
        </MDTypography>
      ),
    })),
  });
}
  
  /*

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function User({ name, email }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default function Data() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8050/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Utilisateur</TableCell>
            <TableCell align="center">Dernier Login</TableCell>
            <TableCell align="center">Departement</TableCell>
            <TableCell align="center">statut</TableCell>
            <TableCell align="center">super utilisateur</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <User
                  name={`${user.prenom_util} ${user.nom_util}`}
                  email={user.email_util}
                />
              </TableCell>
              <TableCell align="center">{user.dernier_login_util}</TableCell>
              <TableCell align="center">
                {user.id_departement?.titre_departement || ""}
              </TableCell>
              <TableCell align="center">
                <MDBox ml={-1}>
                  <MDBadge
                    badgeContent={user.statut_util}
                    color="success"
                    variant="gradient"
                    size="sm"
                  />
                </MDBox>
              </TableCell>
              <TableCell align="center">{user.id_super_util}</TableCell>
              <TableCell align="right">
                <MDTypography
                  component={Link}
                  to={`./editUser/${user.id}`}
                  color="primary"
                  underline="hover"
                >
                  Edit
                </MDTypography>
              </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
*/