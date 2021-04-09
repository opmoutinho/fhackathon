function populateForum() {

    $.ajax({
        url: baseURL + "missions", 

        error: response => {
            console.log("ERROR: ", result);
        },

        success: response => {

            response.forEach(mission => {

                console.log(response);

                var date = $("<td></td>").text(mission.date);
                var skill = $("<td></td>").text(mission.skill);
                var location = $("<td></td>").text(mission.location);
        
                var viewMissionButton = $("<button></button>").text('View')
                                                            .addClass('btn btn-dark viewButton')
                                                            .attr('data', mission.id)
                                                            .attr('id', 'viewRequest' + mission.id);
                var viewMissionCell = $("<td></td>").append(viewMissionButton);

                var row = $("<tr></tr>").append(date, skill, location, viewMissionCell).attr('data', mission.id);

                viewMissionButton.click( event => {
                    loadRequestInfo();
                });

                $('#forumTable').append(row);
            })
        }
    })
}

$('#newRequestCancel').click( event => {

    $('#newRequestForm').attr('hidden', true);
    $('#profileCreateRequestButton').attr('hidden', false);
    $('#profileEditButton').attr('hidden', false);

});

$('#newRequestSubmit').click( event => {

    $('#newRequestForm').attr('hidden', true);
    $('#profileCreateRequestButton').attr('hidden', false);
    $('#profileEditButton').attr('hidden', false);

});


function loadRequestInfo() {

    $('#openRequest').attr('hidden', false);

}