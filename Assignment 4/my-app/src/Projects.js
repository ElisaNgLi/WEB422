import React, { Component } from 'react'
import MainContainer from './MainContainer'
import moment from 'moment'
import { sortBy } from 'lodash'

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        fetch("https://shielded-temple-34936.herokuapp.com/projects")
            .then(res => res.json())
            .then(returnedData => {
                this.setState({
                    projects: sortBy(returnedData, [
                        function (project) {
                            return parseInt(project.ProjectName.match(/\d+/))
                        }
                    ])
                });
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <MainContainer sidebar="Projects">
                <h1 className="page-header">Projects</h1>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.projects.map((project) => {
                                    return (
                                        <tr key={project._id}>
                                            <td>{project.ProjectName}</td>
                                            <td>{project.ProjectDescription}</td>
                                            <td>{moment(project.ProjectStartDate).utc().format("LL")}</td>
                                            <td>{project.ProjectEndDate === null ? 'n/a' : moment(project.ProjectEndDate).format("LL")}</td>
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

export default Projects;