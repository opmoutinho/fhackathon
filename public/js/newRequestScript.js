function showNewResquestForm(event) {

    $('#myRequest').attr('hidden', true);
    $('#openRequest').attr('hidden', true);
    $('#newRequestForm').attr('hidden', false);
    $('#profileEditButton').attr('hidden', true);
    $('#profileCreateRequestButton').attr('hidden', true);


    $.ajax({
        url: baseURL + "skills", 

        error: response => {
            console.log("ERROR: ", response);
        },
    
        success: response => {

            $('#skillsDropdownMenu').find("li:gt(1)").remove();

            response.forEach( skill => {

                var skillItem = $("<li></li>").text(skill).attr('type', 'radio')
                                                            .attr('name', 'roleOptions')
                                                            .attr('data', skill)
                                                            .attr('id', "skill-" + skill)
                                                            .addClass('dropdown-item');
                
                skillItem.click( event => {
                    loadSkill(event);
                });                                          

                $('#skillsDropdownMenu').append(skillItem);
    
            });
        }
    });
}

$('#newRequestCancel').click( event => {

    $('#newRequestForm').attr('hidden', true);
    $('#profileCreateRequestButton').attr('hidden', false);
    $('#profileEditButton').attr('hidden', false);
    $('#requestSkill').val("");

});

function loadSkill(event) {

    $('#requestSkill').val(event.target.firstChild.data);

}

$('#newRequestSubmit').click( event => {

    if ($('#requestSkill').val().length == 0) {
        alert("You must choose a skill");
        return;
    }

    if ($('#requestDecription').val().length < 30) {
        alert("Please expand you description");
        return;
    }

    var mission = {
        description: $('#requestDecription').val(),
        location: $('#profileLocation').val(),
        skill: $('#requestSkill').val()
    }

    $.ajax({
        url: baseURL + "quim/" + $('#profileId').val(),
        type: 'POST',
        data: JSON.stringify(mission),
        async: true,
        contentType: 'application/json',
        error: response => {
            if (response.status == 400) {
                alert("Seems like you already have an open request");
            } else {
                alert("Sorry, something went wrong and your request was not submitted");
            }
            console.log("ERROR: ", response);
        },
        success: response => {
            // clears all rows from table except first
            $('#forumTable').find("tr:gt(0)").remove();
            populateForum();
            $('#profileMissionRequest').val(response.missionRequest);
            $('#checkMyRequestButton').attr('hidden', false);
            $('#newRequestForm').attr('hidden', true);
            $('#profileEditButton').attr('hidden', false);
            $('#profileCreateRequestButton').attr('hidden', true);
        }
    });
});


$('#profileCheckMyRequestButton').click( event => {

    $.ajax({
        url: baseURL + "missions/" + $('#profileMissionRequest').val(), 

        error: response => {
            console.log("ERROR: ", response);
        },

        success: (response) => {

            console.log(response);

            $('#myRequestDescription').val(response.description);

            if (response.helper != null) {

                $.ajax({
                    url: baseURL + "quim/" + response.helper,
                    success: (response) => {
                        $('#myRequestAcceptedBy').val(response.name);
                        $('#myRequestQuimContact').val(response.phone);
                    }
                });
            } 
        }
    })

    $('#openRequest').attr('hidden', true);
    $('#newRequestForm').attr('hidden', true);
    $('#myRequest').attr('hidden', false);

});

$('#myRequestIgnoreButton').click( event => {

    $('#myRequest').attr('hidden', true);

});


$('#myRequestFinishButton').click( event => {

    if ($('#myRequestAcceptedBy').val().length == 0) {

        $.ajax({
            url: baseURL + 'quim/' + $('#profileId').val() + '/executeMission/-1',
            type: 'POST',
            success: response => {
                $('#profileMissionRequest').val("");
                $('#myRequest').attr('hidden', true);
                alert("You have successfully ended you open request");
            }
        })

    } else {




    }

});