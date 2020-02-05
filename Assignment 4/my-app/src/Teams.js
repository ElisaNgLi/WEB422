import React, { Component } from 'react'
import MainContainer from './MainContainer'
import { sortBy } from 'lodash'

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        fetch("https://shielded-temple-34936.herokuapp.com/teams")
            .then(res => res.json())
            .then(returnedData => {
                this.setState({
                    teams: sortBy(returnedData, [
                        function (team) {
                            return parseInt(team.TeamName.match(/\d+/))
                        }
                    ])
                });
            }).catch(err => {
                console.log(err);
            });
    }


    getProjects(currentTeam) {

        let projects = currentTeam.Projects.map((project, index) =>
            <li key={index}>{project.ProjectName}</li>
        );
        return <ul>{projects}</ul>;
    }

    render() {
        return (
            <MainContainer sidebar="Teams">
                <h1 className="page-header">Teams</h1>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Projects</th>
                                    <th>Employees</th>
                                    <th>TeamLead</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.teams.map((team) =>{
                                return (
                                    <tr key={team._id}>
                                        <td>{team.TeamName}</td>
                                        <td>{team.Projects.map((project) => {
                                            return (
                                                <li key={team._id}>{project.ProjectName}</li>
                                            )
                                        })}
                                        </td>
                                        <td>{team.Employees.length}</td>
                                        <td>{team.TeamLead.FirstName} {team.TeamLead.LastName}</td>
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

export default Teams;