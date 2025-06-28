import React, { Component } from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';

export class Employees extends Component {

  /**
   *
   */
  constructor(props) {
    super(props);
    this.state =
    {
      employees: [],
      addModalShow:false,
      editModalShow:false
    }

  }

  refreshList = () => {
    fetch('http://localhost:59742/api/employee')
      .then(res => res.json()).then(data =>
        this.setState({
          employees: data
        })
      )
  }

  deleteEmp = (empid) => {
    if (window.confirm('Are You Sure ?')) {
      fetch('http://localhost:59742/api/employee',
        {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            EmployeeID: empid
          })
        }
      ).then(res => {
      if (res.ok) {
        this.refreshList(); // silme başarılıysa tabloyu güncelle
      } else {
        alert("Silme işlemi başarısız oldu.");
      }
    })
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.addModalShow === true && this.state.addModalShow === false) {
      this.refreshList();
    }
    if (prevState.editModalShow === true && this.state.editModalShow === false) {
    this.refreshList();
  }
    //burada if koşulu koymazsam gelen veri aynı olsa da referansı farklı olacağından dolayı state bunu farklı bir state gibi algılar ve 
    //sonsuz döngü oluşur alert() blocking fonksiyonunun ardından program sonsuz döngüde çalışmaya devam eder o yüzden bu if koşulu önemlidir
  }


  render() {

    const { employees,empid,empname,empmail,empdoj,empdep } = this.state;
    var closeAddModal = () => {
      this.setState({ addModalShow: false });
    }

    var closeEditModal = () => {
      this.setState({ editModalShow: false })
    }

    return (
      <div className='container'>
        <Table className='mt-4' striped bordered hover>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Mail ID</th>
            <th>Date Of Join</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map(emp =>
              <tr>
                <td>{emp.EmployeeID}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.Department}</td>
                <td>{emp.MailID}</td>
                <td>{emp.DOJ}</td>
                <td>
                  <ButtonToolbar>
                    <Button variant='primary' onClick={() => this.setState({
                      editModalShow:true,
                      empid:emp.EmployeeID,
                      empname:emp.EmployeeName,
                      empdoj:emp.DOJ,
                      empdep:emp.Department,
                      empmail:emp.MailID
                    })}>
                      Edit
                    </Button>
                    <Button variant='danger' className='ms-2'
                    onClick={() => this.deleteEmp(emp.EmployeeID)}>
                      Delete
                    </Button>
                    <EditEmpModal
                    show={this.state.editModalShow}
                    onHide={closeEditModal}
                    empid={empid}
                    empname={empname}
                    empdoj={empdoj}
                    empmail={empmail}
                    empdep={empdep}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
      <ButtonToolbar>
          <Button onClick={() => this.setState({ addModalShow: true })}>
            Add Employee
          </Button>
        </ButtonToolbar>

        <AddEmpModal show={this.state.addModalShow} onHide={closeAddModal} />
      </div>
    )
  }
}
