import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function TicketData() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("/tickets")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return {
    columns: [
      { Header: "Titre", accessor: "title", width: "45%", align: "left" },
      { Header: "Description", accessor: "description", align: "center" },
      { Header: "Statut", accessor: "status", align: "center" },
      { Header: "", accessor: "action", align: "right" },
    ],
    rows: tickets.map((ticket) => ({
      title: (
        <Ticket
          title={ticket.title}
          description={ticket.description}
        />
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={ticket.status}
            color="success"
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      description: ticket.description,
      action: (
        <MDTypography
          component="button"
          onClick={() => deleteTicket(ticket.id)}
          color="error"
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#dc3545',
          }}
        >
          &times;
        </MDTypography>
      ),
    })),
  };
}
