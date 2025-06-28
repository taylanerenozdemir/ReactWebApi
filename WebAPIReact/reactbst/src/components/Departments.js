import React, { Component } from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';

export class Departments extends Component {

  /**
   *
   */
  constructor(props) {
    super(props);

    this.state = {
      deps: [],
      addModalShow: false,
      editModalShow: false
    };

  }

  refreshList() {
    fetch('http://localhost:59742/api/department')
      .then((res) => {
        return res.json(); //json ile gelen ham json stringini js nesnesine çevirdik
      })
      .then((data) => {
        this.setState({
          deps: data
        })
      });
  }

  componentDidMount() {
    this.refreshList()
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.addModalShow === true && this.state.addModalShow === false) {
      this.refreshList();
      console.log("Veri Yenilendi");
    }
    if (prevState.editModalShow === true && this.state.editModalShow === false) {
      this.refreshList();
    }
    //burada if koşulu koymazsam gelen veri aynı olsa da referansı farklı olacağından dolayı state bunu farklı bir state gibi algılar ve 
    //sonsuz döngü oluşur alert() blocking fonksiyonunun ardından program sonsuz döngüde çalışmaya devam eder o yüzden bu if koşulu önemlidir
  }

  deleteDep = (depid) => {
    if (window.confirm('Are You Sure ?')) {
      fetch('http://localhost:59742/api/department',
        {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ID: depid
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





  render() {

    const { deps, depid, depname } = this.state;

    var closeAddModal = () => {
      this.setState({ addModalShow: false });
    }

    var closeEditModal = () => {
      this.setState({ editModalShow: false })
    }

    return (
      <div>
        <Table className='mt-4' striped bordered hover>
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {
              deps.map(dep =>
                <tr key={dep.ID}>
                  <td>{dep.ID}</td>
                  <td>{dep.DepartmentName}</td>
                  <td>
                    <ButtonToolbar>
                      <Button variant='primary' onClick={() => this.setState({
                        editModalShow: true,
                        depid: dep.ID,
                        depname: dep.DepartmentName
                      })}>
                        Edit
                      </Button>
                      <Button className='ms-2' variant='danger' onClick={() => {
                        this.deleteDep(dep.ID);
                      }}>
                        Delete
                      </Button>
                      <EditDepModal show={this.state.editModalShow}
                        onHide={closeEditModal}
                        depId={depid}
                        depName={depname} />
                    </ButtonToolbar>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button onClick={() => this.setState({ addModalShow: true })}>
            Add Department
          </Button>
        </ButtonToolbar>

        <AddDepModal show={this.state.addModalShow} onHide={closeAddModal} />
      </div>


    )
  }
}
