import React, { Component } from 'react'
import Nav from "react-bootstrap/Nav"
import IssueList from './IssueList'
import IssueDetail from "./IssueDetail";
import IssueFIlter from "./IssueFilter";
import { Switch, Route, withRouter } from "react-router-dom";
import IssueFilter from './IssueFilter';
import NewIssue from './NewIssue';

class EjemploIssueApi extends Component {


    constructor(props) {
        super(props)
        this.state = {
            issue: [], 
            filtro:'',
            issuesFIlter:[]
        };
        this.onFiltroChanged = this.onFiltroChanged.bind(this);
        
    }
    
     

    cargarArray() {
        
        const urlApi='http://beta-api.sitrack.io/edna/Issue';
        const headers= {
            'content-type': 'application/json',
            Authorization: 'basic Z3VpbGhlcm1lLmJldGE6YmV0YQ==',
            'Accept': 'application/json'
        }
        fetch( urlApi, {
            method: 'GET',
            headers: headers
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
                    datos.id= issue.id;
                    data.push(datos);
                }
                console.log(data);
                this.setState({
                    issue: data,
                    issuesFIlter:data
                })
            })

    }

    componentDidMount() {
        this.cargarArray();
        console.log(this.state.data);
        
    }
    onFiltroChanged(e) {
        const f = this.state.filtro.toUpperCase();
          const filtrados = (this.state.issues &&
           this.state.issues.filter(i => (
            i.titulo.toUpperCase().indexOf(f) !== -1 || 
            i.contenido.toUpperCase().indexOf(f) !== -1 || 
            i.usuario.toUpperCase().indexOf(f) !== -1))) || [];
    
        this.setState({
          filtro: e.target.value,
          issuesFIlter: filtrados
        });
        console.log(this.state.issue)
      }


    render() {
       
     
        console.log(this.state.issue)
        return (
            <React.Fragment>
                <Nav variant="tabs" defaultActiveKey="/" className="Nav">
                    <Nav.Item>
                        <h4><Nav.Link href="/">Issues</Nav.Link></h4>
                    </Nav.Item>
                </Nav>
                <Switch>
                    <Route path={`${this.props.match.path}/new`}>
                        <NewIssue/>
                    </Route>
                    <Route path={`${this.props.match.path}/:issueId`}>
                        <IssueDetail/>
                    </Route>
                    <Route exact path={this.props.match.path}>
                        <IssueFilter filtro={this.state.filtro}
                            onFiltroChanged={this.onFiltroChanged} />
                        <IssueList issues={this.state.issuesFIlter} />
                    </Route>

                </Switch>
                    
               

            </React.Fragment>
           
        )
    }
}
export default withRouter(EjemploIssueApi);