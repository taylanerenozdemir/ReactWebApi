import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export class AddEmpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps: [],
            showSnackbar: false,
            snackbarMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = () => {
        this.setState({
            showSnackbar: false
        })
    }

    componentDidMount()  {
      fetch('http://localhost:59742/api/department')
      .then(res => res.json()).then(data => 
      {
        this.setState({
            deps:data
        })
      }
      )
    }
    


    handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:59742/api/employee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: null,
                EmployeeName: e.target.EmployeeName.value,
                Department: e.target.Department.value,
                MailID: e.target.MailID.value,
                DOJ: e.target.DOJ.value
            })
        }).then(res => res.json()).then((result) => {
            this.setState({ showSnackbar: true, snackbarMessage: result })
        }, (error) => { this.setState({ showSnackbar: true, snackbarMessage: error })});
    }

    render() {
        return (
            <div className='container'>
                <Snackbar anchorOrigin={{ vertical: 'center', horizontal: 'center' }} open={this.state.showSnackbar}
                    autoHideDuration={3000} onClose={this.snackbarClose} message={<span id='messageId'>{this.state.snackbarMessage}</span>}
                    action={<IconButton key='close' aria-label='close' sx={{ color: 'white' }}
                        onClick={this.snackbarClose}><CloseIcon /></IconButton>} />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add New Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='container'>
                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId='EmployeeName'>
                                            <Form.Label>Employee Name</Form.Label>
                                            <Form.Control type="text" name="EmployeeName" required placeholder="Employee Name" />
                                        </Form.Group>
                                        <Form.Group controlId='Department'>
                                            <Form.Label>Department</Form.Label>
                                            <Form.Control as='select'>
                                                {this.state.deps.map(dep =>
                                                    <option key={dep.ID} value={dep.DepartmentName}>
                                                        {dep.DepartmentName}
                                                    </option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label controlId='MailID'>Mail</Form.Label>
                                            <Form.Control type="text" name="MailID" required placeholder="example@example.com" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label controlId='DOJ'>Date Of Join</Form.Label>
                                            <Form.Control type="date" name="DOJ" required placeholder="Date Of Join" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button className='mt-2' variant='primary' type='submit'>Add</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}