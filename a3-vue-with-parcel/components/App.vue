<template>
  <div class="wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand">  Elisa Ng Li's Assignment 3 - Team Details</a>
    </nav>
    <div class="container">
      <div class="row">
        <TeamCard
          v-for="(team, index) in teams"
          :key="`team-${index}`"
          :employees="employees"
          :team="team"
          :projects="projects"          
          @team-updated="showModalWindow">
        </TeamCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col-sm-4 {
  margin-top: 2em;
}
</style>

<script>
import TeamCard from "./TeamCard.vue";
import { map, pick, filter, shuffle, chunk, sortBy } from "lodash-es";
const teamsApiUrl = "https://shielded-temple-34936.herokuapp.com";

export default {
  name: "App",
  components: {
    TeamCard
  },
  data: function() {
    return {
      teams: [],
      employees: [],
      projects: []
    };
  },
  methods: {
    loadTeams: function() {
      fetch(`${teamsApiUrl}/teams`)
        .then(res => res.json())
        .then(teams => {
          this.teams = sortBy(teams,[
            function(team){
              return  parseInt(team.TeamName.match(/\d+/))
            }
          ]);
        })
        .catch(() => {
          console.log("Error loading the team data");
        });
    },
    loadEmployees: function() {
      fetch(`${teamsApiUrl}/employees`)
        .then(res => res.json())
        .then(employees => {
          this.employees = map(employees, employee =>
            pick(employee, ["_id", "FirstName", "LastName"])
          );
          this.employees.forEach(employee => {
            employee.FullName = employee.FirstName + " " + employee.LastName;
          });
        })
        .catch(err => {
          console.log("Error loading the employees data");
        });
    },
    loadProjects: function() {
      fetch(`${teamsApiUrl}/projects`)
        .then(res => res.json())
        .then(projects => {
          this.projects = projects;
        })
        .catch(() => {
          console.log("Error loading the projects data");
        });
    },
    showModalWindow: function(message) {
      this.$bvModal.msgBoxOk(message);
    }
  },
  created: function() {
    this.loadTeams();
    this.loadEmployees();
    this.loadProjects();    
  }
};
</script>