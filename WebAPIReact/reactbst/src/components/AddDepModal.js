import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import {Row,Col} from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



export class AddDepModal extends Component {

    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            showSnackbar:false,
            snackbarMessage:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    snackbarClose = () =>
    {
        this.setState({
            showSnackbar:false
        })
    }

    handleSubmit(e)
    {
        e.preventDefault();
        fetch('http://localhost:59742/api/department',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ID:null,
                DepartmentName:e.target.DepartmentName.value
            })
        }).then(res => res.json()).then((result) =>{
            this.setState({showSnackbar:true,snackbarMessage:result})
        },(error) => {this.setState({showSnackbar:true,snackbarMessage:error})});
    }

    render() {
        return (
            <div className='container'>
                <Snackbar anchorOrigin={{vertical:'center',horizontal:'center'}} open={this.state.showSnackbar}
                autoHideDuration={3000} onClose={this.snackbarClose} message={<span id='messageId'>{this.state.snackbarMessage}</span>}
                action={<IconButton key='close' aria-label='close' sx={{ color: 'white' } }
                onClick={this.snackbarClose}><CloseIcon/></IconButton>}/>
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Department
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <div className='container'>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Department Name</Form.Label>
                                    <Form.Control type="text" name="DepartmentName" required placeholder="Department Name"/>
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
