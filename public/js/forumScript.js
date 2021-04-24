function populateForum() {

    // delete all rows except header
    $("#forumTable").find("tr:gt(0)").remove();

    $.ajax({
        url: baseURL + "missions", 

        error: response => {
            console.log("ERROR: ", result);
        },

        success: response => {

            response.forEach(mission => {

                var date = $("<td></td>").text(mission.date);
                var skill = $("<td></td>").text(mission.skill);
                var location = $("<td></td>").text(mission.location);
        
                var viewMissionButton = $("<button></button>").text('View')
                                                            .addClass('btn btn-dark viewButton')
                                                            .attr('data', mission.id)
                                                            .attr('id', 'viewRequest-' + mission.id);
                var viewMissionCell = $("<td></td>").append(viewMissionButton);

                var row = $("<tr></tr>").append(date, skill, location, viewMissionCell).attr('data', mission.id);

                viewMissionButton.click( event => {
                    loadRequestInfo(event);
                });

                $('#forumTable').append(row);
            })
        }
    })
}
