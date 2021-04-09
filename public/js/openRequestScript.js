function loadRequestInfo(event) {

    $('#openRequest').attr('hidden', true);
    $('#newRequestForm').attr('hidden', true);
    $('#myRequest').attr('hidden', true);

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

            $('#profileMissionToExecute').val($('#missionId').val());
            alert("You have successfully accepted a mission. Go QUIM!!");
            $('#openRequest').attr('hidden', true);
        }
    });
})