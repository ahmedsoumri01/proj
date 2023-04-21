/*
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function data() {
  const Ticket = ({ titre }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" lineHeight={1}>
        {titre}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const [tickets, setTickets] = useState([]);
  const [ticketDetails, setTicketDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8050/tickets")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8050/ticketDetails")
      .then((response) => {
        setTicketDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const rows = tickets.map((ticket) => {
    const ticketDetail = ticketDetails.find(
      (detail) => detail.idTicket === ticket.id_ticket
    );

    return {
      ticket: <Ticket titre={ticketDetail.titreTicket} />,
      statut: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.status_ticket}
        </MDTypography>
      ),
      initiateur: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.id_initiateur_ticket}
        </MDTypography>
      ),
      validateur: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.id_validateur_ticket}
        </MDTypography>
      ),
      superviseur: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.id_superviseur_ticket}
        </MDTypography>
      ),
      departement: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.id_departement}
        </MDTypography>
      ),
      deadline: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.deadline_ticket}
        </MDTypography>
      ),
      date_creation: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {ticket.date_creation_ticket}
        </MDTypography>
        ),
        progress: <Progress color="info" value={ticketDetail.avancementTicket} />,
        };
        });
        
        const handleChange = (event) => {
        // logic for handling the select change
        };
        
        return (
        <MDBox>
        <MDBox display="flex" alignItems="center" justifyContent="space-between">
        <MDTypography variant="h4" fontWeight="bold">
        Tickets
        </MDTypography>
        <MDBox display="flex" alignItems="center">
        <MDTypography variant="caption" fontWeight="medium" color="text">
        Trier par:
        </MDTypography>
        <Select
        value={"date_creation"}
        onChange={handleChange}
        disableUnderline
        sx={{ ml: 1 }}
        >
        <MenuItem value={"date_creation"}>Date de création</MenuItem>
        <MenuItem value={"deadline"}>Date limite</MenuItem>
        <MenuItem value={"avancement"}>Avancement</MenuItem>
        <MenuItem value={"statut"}>Statut</MenuItem>
        </Select>
        </MDBox>
        </MDBox>
        <MDBox mt={3}>
        <MDDataTable
        columns={[
        { name: "Ticket", field: "ticket" },
        { name: "Statut", field: "statut" },
        { name: "Initiateur", field: "initiateur" },
        { name: "Validateur", field: "validateur" },
        { name: "Superviseur", field: "superviseur" },
        { name: "Département", field: "departement" },
        { name: "Date de création", field: "date_creation" },
        { name: "Deadline", field: "deadline" },
        { name: "Progression", field: "progress" },
        ]}
        rows={rows}
        rowKey="ticket"
        pageSize={10}
        sort={true}
        sortModel={[
        {
        field: "date_creation",
        sort: "desc",
        },
        ]}
        pagination
        />
        </MDBox>
        </MDBox>
        );
        }
*/


import Icon from "@mui/material/Icon";
/*
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const [tickets, setTickets] = useState([]);
  const [ticketDetails, setTicketDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8050/tickets")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8050/ticketDetails")
      .then((response) => {
        setTicketDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return {
    columns: [
      { Header: "project", accessor: "project", width: "30%", align: "left" },
      { Header: "budget", accessor: "budget", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        project: <Project image={LogoAsana} name="Asana" />,
        budget: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            $2,500
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            working
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoGithub} name="Github" />,
        budget: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            $5,000
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            done
          </MDTypography>
        ),
        completion: <Progress color="success" value={100} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoAtlassian} name="Atlassian" />,
        budget: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            $3,400
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            canceled
          </MDTypography>
        ),
        completion: <Progress color="error" value={30} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoSpotify} name="Spotify" />,
        budget: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            working
          </MDTypography>
        ),
        completion: <Progress color="info" value={80} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoSlack} name="Slack" />,
        budget: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            $1,000
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            canceled
          </MDTypography>
        ),
        completion: <Progress color="error" value={0} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoInvesion} name="Invesion" />,
        budget: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            $2,300
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            done
          </MDTypography>
        ),
        completion: <Progress color="success" value={100} />,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
*/

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import axios from "axios";


function Ticket({ id, superviseur, initiateur, validateur, nom_departement, projet, categorie }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox mr={2}>
        <MDBadge color="primary" variant="dot" />
      </MDBox>
      <MDBox flex={1}>
        <MDBox display="flex" alignItems="center" mb={1}>
          <MDBox mr={2} fontWeight="fontWeightBold">{id}</MDBox>
          <MDBadge color="secondary">{idd}</MDBadge>
        </MDBox>
        <MDBox>
          <MDTypography variant="body1">{superviseur}</MDTypography>
          <MDTypography variant="body2" color="textSecondary">{nom_departement}</MDTypography>
          <MDTypography variant="body2" color="textSecondary">{projet}</MDTypography>
          <MDTypography variant="body2" color="textSecondary">{categorie}</MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}


function deleteTicket(id) {
  axios.delete(`http://localhost:8050/ticket/${id}`)
    .then(response => {
      console.log('Ticket deleted successfully:', response.data);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error deleting Ticket:', error);
      
    });
}

Ticket.propTypes = {
  id: PropTypes.number.isRequired,
  idd: PropTypes.number.isRequired,
};

export default function TicketData() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8050/tickets")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return ({
    columns: [
      { Header: "ref_ticket", accessor: "id_ticket", width: "45%", align: "left" },
      { Header: "initiateur", accessor: "initiateur", align: "center" },
      
      { Header: "valdiateur", accessor: "valdiateur", align: "center" },
      { Header: "departement", accessor: "departement", align: "center" },
      { Header: "projet", accessor: "projet", align: "center" },
      { Header: "categorie", accessor: "categorie", align: "center" },
      { Header: "date_creation_ticket", accessor: "date_creation_ticket", align: "center" },
      { Header: "date_cloture_ticket", accessor: "date_cloture_ticket", align: "center" },
      { Header: "statut", accessor: "statut", align: "center" },
    ],
    rows: tickets.map((ticket) => ({
      id_ticket: ticket.id_ticket,
      initiateur: ticket.id_initiateur_ticket?.nom_utilisateur || "",
    
      validateur: ticket.id_validateur_ticket?.nom_utilisateur || "",
      departement: ticket.id_departement?.titre_departement || "",
      projet: ticket.id_projet?.titre_projet || "",
      categorie: ticket.id_categorie?.titre_categorie || "",
      date_creation_ticket: ticket.date_creation_ticket,
      date_cloture_ticket: ticket.date_cloture_ticket || "",
      statut: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={ticket.statut_ticket}
            color="success"
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
    })),
  });
}
