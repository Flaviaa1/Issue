import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Form as FormikForm, Field } from "formik";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import Conteiner from "react-bootstrap/Container"
import "./Issue.css"

class NewIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values, { setSubmitting }) {

    fetch('http://beta-api.sitrack.io/edna/Issue', {
      method: 'post',
      headers: {
         'content-type': 'application/json',
         Authorization: 'basic Z3VpbGhlcm1lLmJldGE6YmV0YQ=='
     },
      body: JSON.stringify(values)
    
    })
    .then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response));
  }
  
 
  render(){
    const initialValues = {
      titulo: '', contenido: '', usuario: ''
    };
  
    return (
      <Conteiner className="NewIssue">
         <Formik initialValues={initialValues}
              onSubmit={this.onSubmit}>
        {({ isSubmitting }) => (
          <Form as={FormikForm}>
            <Form.Group as={Row}>
              <Form.Label column sm="2" lg="1">
                Titulo
              </Form.Label>
              <Col sm="10" lg="11">
                <Form.Control name="titulo" required as={Field} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2" lg="1">
                Contenido
              </Form.Label>
              <Col sm="10" lg="11">
                <Form.Control name="contenido" component="textarea" rows="10" as={Field} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2" lg="1">
                Usuario
              </Form.Label>
              <Col sm="10" lg="11">
                <Form.Control name="usuario" required as={Field} />
              </Col>
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>Guardar</Button>
          </Form>
        )}
      </Formik>
      </Conteiner>
     
    );
  }
  }


export default withRouter(NewIssue);

