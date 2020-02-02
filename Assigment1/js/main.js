/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ____Elisa Ng Li_________ Student ID: ____136265170_______ Date: ______September 13, 2019_______
*
*
********************************************************************************/

$(document).ready(function () {
    console.log("jQuery working");
    $('#teams-menu').on("click", function (event) {
        event.preventDefault();
        $("#data").empty();
        $("#data").append("<h3>Teams</h3>");
        $.ajax({
            url: "https://shielded-temple-34936.herokuapp.com/teams",
            method: "GET",
            success: function (result) {
                let prePretty = document.createElement('PRE');
                prePretty.innerHTML = prettyPrintJson.toHtml(result);
                $("#data").append(prePretty);
                
            }
        })
    });

    $('#employees-menu').on("click", function (event) {
        event.preventDefault();
        $("#data").empty();
        $("#data").append("<h3>Employees</h3>");
        $.ajax({
            url: "https://shielded-temple-34936.herokuapp.com/employees",
            method: "GET",
            success: function (result) {
                let prePretty = document.createElement('PRE');
                prePretty.innerHTML = prettyPrintJson.toHtml(result);
               $("#data").append(prePretty);
            }
        })
    });

    $('#projects-menu').on("click", function (event) {
        event.preventDefault();
        $("#data").empty();
        $("#data").append("<h3>Projects</h3>");
        $.ajax({
            url: "https://shielded-temple-34936.herokuapp.com/projects",
            method: "GET",
            success: function (result) {
                let prePretty = document.createElement('PRE');
                prePretty.innerHTML = prettyPrintJson.toHtml(result);
                $("#data").append(prePretty);
            }
        })
    });

    $('#positions-menu').on("click", function (event) {
        event.preventDefault();
        $("#data").empty();
        $("#data").append("<h3>Positions</h3>");
        $.ajax({
            url: "https://shielded-temple-34936.herokuapp.com/positions",
            method: "GET",
            success: function (result) {
                let prePretty = document.createElement('PRE');
                prePretty.innerHTML = prettyPrintJson.toHtml(result);
                $("#data").append(prePretty);
            }
        })
    });

});