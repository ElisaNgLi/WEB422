import React, { Component } from 'react'
import MainContainer from './MainContainer'
import moment from 'moment'
import { sortBy } from 'lodash'

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        fetch("https://shielded-temple-34936.herokuapp.com/employees")
            .then(res => res.json())
            .then(returnedData => {
                this.setState({
                    employees: sortBy(
                        returnedData, [
                        function (employee) {
                            return employee.Extension;
                        }
                    ]
                    )
                });
            }).catch(err => {
                console.log(err);
            });
    }


    render() {
        return (
            <MainContainer sidebar="Employees">
                <h1 className="page-header">Employees</h1>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Name & Position</th>
                                    <th>Adress</th>
                                    <th>Phone Num</th>
                                    <th>Hire Date</th>
                                    <th>Salary Bonus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.employees.map((employee) => {
                                    return (
                                        <tr key={employee._id}>
                                            <td>{employee.FirstName} {employee.LastName} - {employee.Position.PositionName}</td>
                                            <td>{employee.AddressStreet}. {employee.AddressCity} {employee.AddressState}, {employee.AddressZip}</td>
                                            <td>{employee.PhoneNum} ex: {employee.Extension}</td>
                                            <td>{moment(employee.HireDate).utc().format("LL")}</td>
                                            <td>$ {employee.SalaryBonus}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                </div>
            </MainContainer>
        )
    }
}

export default Employees;