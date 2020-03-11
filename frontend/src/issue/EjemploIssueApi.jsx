import React, { Component } from 'react'
import Nav from "react-bootstrap/Nav"
import IssueList from './IssueList'
import IssueDetail from "./IssueDetail";
import { Switch, Route, withRouter } from "react-router-dom";
class EjemploIssueApi extends Component {


    constructor(props) {
        super(props)
        this.state = {
            issues: []
        };
    }

    cargarArray() {
        fetch('http://beta-api.sitrack.io/edna/Issue', {
            headers: {
                'content-type': 'application/json',
                Authorization: 'basic Z3VpbGhlcm1lLmJldGE6YmV0YQ==',
                'Accept': 'application/json'
            }
        })

            .then(res => res.json())
            .then(res => { 
                const data = [];
                for (var i = 0; i < res.length; i++) {
                    const issue = res[i];
                    const datos = {};
                    // llenar el objeto d con dia, max, min e icono
                    datos.fecha = issue.fecha;
                    datos.contenido = issue.contenido;
                    datos.estado = issue.estado;
                    datos.titulo = issue.titulo;
                    datos.modificado = issue.modificado;
                    datos.usuario = issue.usuario;
                    data.push(datos);
                }
                console.log(data);
                this.setState({
                    issues: data
                })
            })

    }

    componentDidMount() {
        this.cargarArray();
        console.log(this.state.data);
        
    }


    render() {
        console.log('match', this.props.match);
        return (
            <React.Fragment>
                <Nav variant="tabs" defaultActiveKey="/" className="Nav">
                    <Nav.Item>
                        <h4><Nav.Link href="/">Issues</Nav.Link></h4>
                    </Nav.Item>
                </Nav>
                <Switch>

                    <Route path={`${this.props.match.path}/:issueId`}>
                        <IssueDetail />
                    </Route>
                    <Route>
                      <IssueList issues={this.state.issues} />
                    </Route>
                
                </Switch>
                    
               

            </React.Fragment>
           
        )
    }
}
export default withRouter(EjemploIssueApi);