/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ____Elisa Ng Li_________ Student ID: ____136265170_______ Date: ______September 26, 2019_______
*
*
********************************************************************************/

$(document).ready(function () {
    console.log("jQuery working");
    let employeesModel = [];

    function initializeEmployeesModel() {
        $.ajax({
            url: "https://shielded-temple-34936.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                employeesModel = _.take(data, 300);
                refreshEmployeeRows(employeesModel);
            })
            .fail(function (err) {
                showGenenericModal('Error', 'Unable to get Employees');
            });
    };

    function showGenericModal(title, message) {
        $("#genericModal .modal-title").empty().append(title);
        $("#genericModal .modal-body").empty().append(message);
        $("#genericModal").modal('toggle');
    };

    function refreshEmployeeRows(employees) {
        $("#employees-table").empty();
        let template = _.template('<% _.forEach(employees, function(employee){%>' +
            '<div class="row body-row" data-id="<%- employee._id %>">' +
            '<div class="col-xs-4 body-column"><%- _.escape(employee.FirstName) %></div>' +
            '<div class="col-xs-4 body-column"><%- _.escape(employee.LastName) %></div>' +
            '<div class="col-xs-4 body-column"><%- _.escape(employee.Position.PositionName) %></div>' +
            '</div>' +
            '<% }); %>');
        $("#employees-table").append(template({ 'employees': employees }));
    };

    function getFilteredEmployeesModel(filterString) {
        let filter = _.filter(employeesModel, function (employee) {
            if (employee.FirstName.toLowerCase().includes(filterString.toLowerCase())
                || employee.LastName.toLowerCase().includes(filterString.toLowerCase())
                || employee.Position.PositionName.toLowerCase().includes(filterString.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        });
        return filter;
    };

    function getEmployeeModelById(id){
        let findIdx = _.findIndex(employeesModel, function(employee) { 
            return employee._id === id; 
        });
        if (findIdx != -1) {
            return _.cloneDeep(employeesModel[findIdx]);
        } else null;
    };

    initializeEmployeesModel();

    $( "#employee-search").on("keyup", function(){
        let filtered = getFilteredEmployeesModel(this.value);
        refreshEmployeeRows(filtered);
    });
    $(document.body).on('click', '.body-row' ,function(){
        let employee = getEmployeeModelById($(this).attr("data-id"));
        if(employee != null){
            
            employee.HireDate = moment(employee.HireDate).format('LL');
            
            let modalTemplate = _.template(
                '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %>. <%- employee.AddressZip %></br>' + 
                '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %></br>' +
                '<strong>Hire Date:</strong> <%- employee.HireDate %>' 
              );
              let modalContent = modalTemplate({'employee':employee});
   
              showGenericModal(employee.FirstName + ' ' + employee.LastName, modalContent);
        }
    });
});
    