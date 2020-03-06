import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./IssueList.css";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";

function IssueList(props) {
  return (
    <ListGroup className="issue-list">
      {props.issues && props.issues.map(i => {
        return (
          <ListGroup.Item key={i.id}>
            <h6><Link to={`${props.match.url}/${i.id}`}>{i.titulo}</Link></h6>
            <div className="issue-subheader">
              #{i.id} {i.estado === "open" ? "abierto" : "cerrado"} {moment.unix(i.estado === "open" ? i.fecha : i.modificado).fromNow()} por {i.usuario}
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default withRouter(IssueList);