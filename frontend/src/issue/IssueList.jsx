import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Conteiner from "react-bootstrap/Container";
import "./IssueList.css";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";

function IssueList(props) {
  return (
    <Conteiner>
    <ListGroup className="issue-list">
      { props.issues && props.issues.map(i => {
        
        return (

          <ListGroup.Item key={i.id}>
          
            <h4><Link to={`${props.match.url}/${i.id}`}>{i.titulo}</Link></h4>


            <div>
              #{i.id} {i.estado === "open" ? "abierto" : "cerrado"} {moment.unix(i.estado === "open" ? i.fecha : i.modificado).fromNow()} por {i.usuario}
            </div>
          </ListGroup.Item>

        );
      })}
    </ListGroup>
    </Conteiner>
  );
}

export default withRouter(IssueList);
