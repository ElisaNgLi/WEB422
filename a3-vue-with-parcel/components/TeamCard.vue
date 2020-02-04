<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-header">
        <strong>{{this.team.TeamName}}</strong>
        <button class="btn btn-primary btn-sm float-right" @click="saveTeam">Save</button>
      </div>
      <div class="card-body">
        <h5>Team Lead</h5>
        <multiselect
          class="single"
          v-model="team.TeamLead"
          :options="employees"
          :custom-label="teamCustomLabel"
          placeholder="Select one"
          label="fullName"
          track-by="LastName"
        ></multiselect>
        <h5>Team Members</h5>
        <multiselect
          class="multiple"
          v-model="team.Employees"
          :options="employees"
          :custom-label="employeeCustomLabel"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="fullName"
          track-by="LastName"
          :preselect-first="true" >
          <template slot="selection" slot-scope="{ values, search, isOpen }"> <span class="multiselect__single"  v-if="values.length &amp;&amp; !isOpen"  >{{ values.length }} options selected</span> </template>
        </multiselect>
        <h5>Projects</h5>
        <multiselect
          class="multiple"
          v-model="team.Projects"
          :options="projects"
          :custom-label="projectCustomLabel"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="projectName"
          track-by="ProjectName"
          :preselect-first="true">
          <template slot="selection" slot-scope="{ values, search, isOpen }"> <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen" >{{ values.length }} options selected</span> </template>
        </multiselect>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>


<script>
import Multiselect from "vue-multiselect"; // https://vue-multiselect.js.org/
import "../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

export default {
  name: "TeamCard",
  props: ["team", "employees", "projects"],
  components: {
    Multiselect
  },
  methods: {
    saveTeam() {
      let currentTeam = {};
      currentTeam.Projects = this.team.Projects; 
      currentTeam.Employees = this.team.Employees;
      currentTeam.TeamLead = this.team.TeamLead;
      currentTeam._id = this.team._id;
      fetch( "https://shielded-temple-34936.herokuapp.com/team/" + currentTeam._id,
        {
          method: "PUT",
          body: JSON.stringify({
            Projects: currentTeam.Projects,
            Employees: currentTeam.Employees,
            TeamLead: currentTeam.TeamLead,
            _id: currentTeam._id
          }),
          headers: { "Content-Type": "application/json" }
        }
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.$emit( "team-updated", this.team.TeamName + " updated successfully.");
        })
        .catch(err => {
          console.log(err);
          this.$emit( "team-updated", this.team.TeamName + " updated unsuccessful." + error);
        });
    },
    teamCustomLabel({ FirstName, LastName }) {
      return `${FirstName} ${LastName}`;
    },
    employeeCustomLabel({ FirstName, LastName }) {
      return `${FirstName} ${LastName}`;
    },
    projectCustomLabel({ ProjectName }) {
      return `${ProjectName}`;
    }
  }
};
</script>