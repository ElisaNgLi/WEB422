import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { sortBy } from 'lodash'

class ProjectsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
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
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Projects</h3>
                </div>
                <div className="panel-body">
                    <div className="table-responsive overview-table">
                        <table className="table table-striped table-bordered">
                            <tbody>
                                {this.state.projects.map((project) => {
                                    return (
                                        <tr>
                                            <td key={project._id}>{project.ProjectName}</td>
                                            <td>Active {moment().diff(project.ProjectStartDate, 'days')} Days</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/projects" className="btn btn-primary form-control">View All Project Data</Link>
                </div>
            </div>
        )
    }

}

export default ProjectsPanel;
