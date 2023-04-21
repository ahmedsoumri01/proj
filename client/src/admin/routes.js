// Material Dashboard 2 React layouts
import Dashboard from "./layouts/dashboard";
import Tables from "./layouts/tables";
import Project from "./layouts/projectTable";
import Ticket from "./layouts/ticketTable.js";

import Billing from "./layouts/billing";

import Notifications from "./layouts/notifications";
import Profile from "./layouts/profile";
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";
import EditUser from "./layouts/tables/data/editUser";
import AddUser from "./layouts/tables/data/addUser";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Project",
    key: "project",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/project",
    component: <Project />,
  },
  {
    type: "collapse",
    name: "Ticket",
    key: "ticket",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/ticket",
    component: <Ticket />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "item",
    name: "EditUser",
    key: "editUser",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/editUser/:id",
    component: <EditUser />,
  },
  {
    type: "item",
    name: "AddUser",
    key: "addUser",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/addUser",
    component: <AddUser />,
  },
];

export default routes;
