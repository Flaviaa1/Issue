import React from "react";
import { withRouter, Link } from "react-router-dom";
import { get, close, reopen, putIssue } from "../Api";
import "./IssueDetail.css";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import moment from "moment";
import {getIssue} from '../Api';
import ReactMarkdown from "react-markdown";

let id=null;

class IssueDetail extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      issue:[]
    };
  
    id=this.props.match.params.issueId
    
  }


  componentDidMount() {
    this.getIssueId();

  
  }

  getIssueId() {
    getIssue(id)
    
    .then(issueFiltrado => {console.log("get result: ", issueFiltrado); 
      this.setState({
        issue: issueFiltrado
      })

    })
  }

  onCerrar() {
    
  }

  onReabrir() {
    
  }


  render() {

    const { issue } = this.state;

    return (
    <div className="issue-detail">
      {issue &&
        <div>
          <h3>{issue.titulo} <span className="issue-id">{`#${issue.id}`}</span></h3>
          {issue.estado === 'open' && <Badge variant="success">Abierto</Badge>}
          {issue.estado === 'closed' && <Badge variant="danger">Cerrado</Badge>}

         <h5>{issue.usuario} {moment.unix(issue.fecha).fromNow()}</h5>
          <div>
            
            <Card>
              <Card.Body>
                <ReactMarkdown source={issue.contenido}/>
              </Card.Body>
            </Card>
            
          </div>
          {issue.estado === 'closed' &&
            <div className="issue-estado">
              <Button onClick={this.onReabrir.bind(this)}>Reabrir</Button>
              <span title={moment.unix(issue.modificado).format('LLLL')}>
                Cerrado {moment.unix(issue.modificado).fromNow()}
              </span>
            </div>
          }
          {issue.estado === 'open' &&
            <div className="issue-estado">
              <Button onClick={this.onCerrar.bind(this)}>Cerrar</Button>
              {issue.modificado &&
                <span title={moment.unix(issue.modificado).format('LLLL')}>
                  Reabierto {moment.unix(issue.modificado).fromNow()}
                </span>
               }
               </div>
             }
           </div>
         }
         
       </div>
       );
     }
   
   }
   

export default withRouter(IssueDetail);