import React from "react";
import { FormControl, InputGroup, Container, Form, Button, Row, Col } from "react-bootstrap";


const AgregarDireccion = () => {
    return (
        <>
            <div>
                <br></br>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="col-md-6">
                            <Form.Label htmlFor="basic-url">Calle</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    aria-label="calle"
                                    aria-describedby="basic-addon1"
                                    style={{ backgroundColor:"#A1C4CE", borderStyle:"none" }}
                                />
                            </InputGroup>
                        </Col>
                        <Col className="col-md-3">
                            <Form.Label htmlFor="basic-url">Num. exterior</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="number"
                                    aria-label="numExterior"
                                    aria-describedby="basic-addon1"
                                    style={{ backgroundColor:"#A1C4CE", borderStyle:"none" }}
                                />
                            </InputGroup>
                        </Col>
                        <Col className="col-md-3">
                            <Form.Label htmlFor="basic-url">Num. interior</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="number"
                                    aria-label="numInterior"
                                    aria-describedby="basic-addon1"
                                    style={{ backgroundColor:"#A1C4CE", borderStyle:"none" }}
                                />
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-6">
                            <Form.Label htmlFor="basic-url">Colonia</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    aria-label="colonia"
                                    aria-describedby="basic-addon2"
                                    style={{ backgroundColor:"#A1C4CE", borderStyle:"none" }}
                                />
                            </InputGroup>
                        </Col>
                        <Col className="col-md-3">
                            <Form.Label htmlFor="basic-url">Estado</Form.Label>
                            <Form.Select aria-label="Default select example" style={{ backgroundColor:"#A1C4CE", borderStyle:"none" }}>
                                <option>Seleccionar</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-6">
                            <Form.Label htmlFor="basic-url">Municipio</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl aria-label="municipio" aria-describedby="basic-addon3" style={{ backgroundColor:"#A1C4CE", borderStyle:"none" }}/>
                            </InputGroup>
                        </Col>

                        <Col className="col-md-3">
                            <Form.Label htmlFor="basic-url">C.P</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl required type="number" aria-label="cp" aria-describedby="basic-addon3" style={{ backgroundColor:"#A1C4CE", borderStyle:"none" }}/>
                            </InputGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col className="col-md-9">
                            <Form.Label htmlFor="basic-url">Datos adicionales</Form.Label>
                            <InputGroup>
                                <FormControl as="textarea" aria-label="With textarea" style={{ backgroundColor:"#A1C4CE", borderStyle:"none" }}/>
                            </InputGroup>
                        </Col>
                        <Col className="col-md-3">
                            <br></br><br></br>
                            <Button variant="danger">GUARDAR</Button>
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    )
}

export default AgregarDireccion