var ajaxForm = new ajaxProxy("/api/select")

document.addEventListener("DOMContentLoaded", function(event) {
    ajaxForm.PopulateTable (jsonToTable, handleError);
});

function handleError (data) {
    $("#ajax-error-box").modal('show');
    $("#ajax-error").text("Errorcode:" + data.status + ", Message:" + data.statusText);
    console.log(data);
}

function jsonToTable (data) {

    // Clear table
    $('#employeeTable tr').slice(1).remove();

    //if no tbody just select your table
    var tbody = $('#employeeTable').children('tbody');
    var table = tbody.length ? tbody : $('#employeeTable');

    var tableString = "";

    for(var i in data) {
        var employee = data[i];

        tableString += "<tr><td>" + employee.EmployeeID
                    + "</td><td>" + employee.Name
                    + "</td><td>" + employee.WorkingSite
                    + "</td><td>" + employee.Address
                    + "</td><td>" + employee.Phone
                    + "</td></tr>";
    }

    table.append(tableString);
}


// Form event handlers
$('#refresh').click(function(){
    $("#ajax-error-box").hide();
    ajaxForm.PopulateTable (jsonToTable, handleError);
});
