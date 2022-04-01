import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';



const UserDirecciones = () => {

    return (
        <>
            <div className='row'>
                <div className='col-12' style={{ padding: 30 }}>
                    <Form>
                        <h2 style={{ borderLeft: "solid", borderWidth: 10, borderColor: "#C4C4C4" }}><b>&nbsp; Direccion</b></h2>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col}>
                                <Form.Label>Calle</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="text" name="" />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Avenida</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="" />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Colonia</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="" />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col} >
                                <Form.Label>Numero de calle:</Form.Label>*
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="" />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Codigo postal:</Form.Label>*
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="" />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                            <Form.Group as={Col}>
                                <Form.Label>Ciudad:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="" />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} required type="password" name="" />
                            </Form.Group>
                        </Row>
                        <Row style={{ marginBottom: 5 }}>

                            <Form.Group as={Col}>
                                <Form.Label>Referencias:</Form.Label>
                                <Form.Control style={{ backgroundColor: "#A1C4CE", borderRadius: 0 }} as='textarea' required type="password" name="" />
                            </Form.Group>
                        </Row>
                        <Button style={{ marginTop: 20, background: "#C12C30", borderRadius: 0, border: "none", float: "right" }} type="button">
                            <b>CAMBIAR</b>
                        </Button>
                    </Form>
                </div>

            </div>



        </>
    )

}
export default UserDirecciones;