import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Typography from "@material-ui/core/Typography";
import { Route, MemoryRouter } from "react-router";
import { Link as RouterLink, Switch } from "react-router-dom";

//
import Add from "./Add.js";
import Manage from "./Manage.js";
import View from "./View.js";
//

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function ListRouter() {
  return (<div>
    <div class="mx-2">
    <button class="btn btn-light font-weight-bold" onClick = {(e) => {location.href = "/dashboard"}}>Back to Dashboard</button>
    </div>
    <MemoryRouter>
      <div className="row">
        <div className="col-4">
          <Paper elevation={0}>
            <List>
              <ListItemLink to="/add" primary="Add New Product" />
              <ListItemLink to="/manage" primary="Manage Product" />
              <ListItemLink to="/view" primary="View Past Purchases" />
            </List>
          </Paper>
        </div>

        <div className="col-8">
          <Switch>
            <Route path="/add">
              <Add />
            </Route>
            <Route path="/manage">
              <Manage />
            </Route>
            <Route path="/view">
              <View />
            </Route>
          </Switch>
        </div>
      </div>
    </MemoryRouter>
  </div>);
}
