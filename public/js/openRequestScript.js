function loadRequestInfo(event) {

    $('#openRequest').attr('hidden', true);
    $('#newRequestForm').attr('hidden', true);
    $('#myRequest').attr('hidden', true);
    $('#requestInExecution').attr('hidden', true);
    
    var missionId = event.target.attributes[1].value;
    $('#missionId').val(missionId);
    
    $.ajax({
        url: baseURL + "missions/" + missionId, 

        error: response => {
            console.log("ERROR: ", response);
        },

        success: (response) => {
            $('#requesterRequest').val(response.description);
        }

    })

    $.ajax({
        url: baseURL + "missions/" + missionId + "/quim", 

        error: response => {
            console.log("ERROR: ", response);
        },

        success: (response) => {

            $('#requesterId').val(response.id);
            $('#requesterName').val(response.name);
            $('#requesterEmail').val(response.email);
            $('#requesterPhone').val(response.phone);
            $('#requesterLocation').val(response.location);
            $('#requesterAboutMe').val(response.aboutMe);
        }
    });

    $('#openRequest').attr('hidden', false);

}

$('#openRequestIgnoreButton').click( event => {
    $('#openRequest').attr('hidden', true);
})

$('#openRequestAcceptButton').click( event => {

    if ($('#profileMissionToExecute').val().length != 0) {
        alert("Sorry! Seems like you already have a mission in execution");
        return;
    }

    if ($('#missionId').val() == $('#profileMissionRequest').val()) {
        alert("Sorry! Seems like you are the owner of this mission");
        return;
    }

    $.ajax({
        url: baseURL + "quim/" + $('#profileId').val() + "/requestmission/" + $('#missionId').val(), 
        type: 'POST',
        error: response => {
            console.log("ERROR: ", response);
        },

        success: (response) => {
            alert("You have successfully accepted a mission. Go QUIM!!");
            $('#openRequest').attr('hidden', true);
            populateForum();
            populateProfile($('#profileId').val());
        }
    });
})

function loadMissionInExecution(event) {

    if ($('#profileMissionToExecute').val().length == 0)  {
        alert("You have not accepted any mission yet");
        return;
    }

    $('#openRequest').attr('hidden', true);
    $('#newRequestForm').attr('hidden', true);
    $('#myRequest').attr('hidden', true);

    $.ajax({
        url: baseURL + "missions/" + $('#profileMissionToExecute').val(), 
        error: response => {
            console.log("ERROR: ", response);
        },
        success: (response) => {
            $('#requestInExecutionDescription').val(response.description);
            $.ajax({
                url: baseURL + "quim/" + response.owner, 
                error: response => {
                    console.log("ERROR: ", response);
                },
                success: (response) => {
                    $('#inExecutionRequesterName').val(response.name);
                    $('#inExecutionRequesterContact').val(response.phone);
                }
            });
        }
    });

    $('#requestInExecution').attr('hidden', false);
};