const baseURL = "https://helperz.herokuapp.com/api/";

$(document).ready( () => {

    $.ajax({
        url: baseURL + "quim/",
        error: response => {
            console.log("ERROR: ", response);
        },
        success: (response) => {
            let arrOfUsersIds = [];
            for (user of response) { arrOfUsersIds.push(user.id); }
            let loginUser = Math.floor(Math.random() * 7) + Math.min(...arrOfUsersIds);
            populateProfile(loginUser);
        }
    });

    populateForum();
});


function populateProfile(loginUser) {

    $.ajax({
        url: baseURL + "quim/" + loginUser,

        error: response => {
            console.log("ERROR: ", response);
        },

        success: (response) => {

            $('#profileId').val(response.id);
            $('#profileName').val(response.name);
            $('#profileEmail').val(response.email);
            $('#profilePhone').val(response.phone);
            $('#profileLocation').val(response.location);
            $('#profileAboutMe').val(response.aboutMe);
            $('#profilePoints').text(response.points);
            $('#profileRating').val(response.rating);
            $('#profileMissionRequest').val(response.missionRequest);
            $('#profileMissionToExecute').val(response.missionToExecute);

            if ($('#profileMissionRequest').val() > 0) {
                $('#profileCreateRequestButton').attr('hidden', true);
                $('#profileCheckMyRequestButton').attr('hidden', false);
            } else {
                $('#profileCheckMyRequestButton').attr('hidden', true);
                $('#profileCreateRequestButton').attr('hidden', false);
            }

            if ($('#profileMissionToExecute').val() > 0) {
                $('#profileCheckMissionExecuteButton').attr('hidden', false);
            } else {
                $('#profileCheckMissionExecuteButton').attr('hidden', true);
            }
            
            $('#profileCreateRequestButton').click( event => {
                showNewResquestForm(event);                    
            });

            $('#profileEditButton').click( event => {
                editProfile(event);
            });

            $('#profileCancelEditButton').click( event => {
                cancelEditProfile(event);
            });

            $('#profileConfirmEditButton').click( event => {
                confirmEditProfile(event);
            });

            $('#profileCheckMissionExecuteButton').click( event => {
                loadMissionInExecution(event);
            });
        }
    });
}

function disableEditProfile() {

    $('#profileName').attr('disabled', true);
    $('#profileEmail').attr('disabled', true);
    $('#profilePhone').attr('disabled', true);
    $('#profileLocation').attr('disabled', true);
    $('#profileAboutMe').attr('disabled', true);
}



function editProfile(event) {

    $('#profileName').attr('disabled', false);
    $('#profileEmail').attr('disabled', false);
    $('#profilePhone').attr('disabled', false);
    $('#profileLocation').attr('disabled', false);
    $('#profileAboutMe').attr('disabled', false);

    $('#profileCreateRequestButton').attr('hidden', true);
    $('#profileEditButton').attr('hidden', true);
    $('#profileCancelEditButton').attr('hidden', false);
    $('#profileConfirmEditButton').attr('hidden', false);
    $('#profileCheckMyRequestButton').attr('hidden', true);
}

function cancelEditProfile(event) {

    populateProfile();

    $('#profileCreateRequestButton').attr('hidden', false);
    $('#profileEditButton').attr('hidden', false);
    $('#profileCancelEditButton').attr('hidden', true);
    $('#profileConfirmEditButton').attr('hidden', true);
    $('#profileCheckMyRequestButton').attr('hidden', false);

    disableEditProfile();
}

function confirmEditProfile(event) {

    var quim = {
        id: $('#profileId').val(),
        name: $('#profileName').val(),
        email: $('#profileEmail').val(),
        phone: $('#profilePhone').val(),
        location: $('#profileLocation').val(),
        aboutMe: $('#profileAboutMe').val()
    }

    $.ajax({
        url: baseURL + "quim/" + $('#profileId').val(),
        type: 'PUT',
        data: JSON.stringify(quim),
        async: true,
        contentType: 'application/json',
        error: response => {
            console.log("ERROR: ", response);
        },
        success: response => {
            console.log(response);
            // clears all rows from table except first
            $('#forumTable').find("tr:gt(0)").remove();
            populateForum();
            disableEditProfile();
            $('#profileEditButton').attr('hidden', false);
            $('#profileCancelEditButton').attr('hidden', true);
            $('#profileConfirmEditButton').attr('hidden', true);

            if ($('#profileMissionRequest').val() > 0) {
                $('#profileCheckMyRequestButton').attr('hidden', false);
            } else {
                $('#profileCreateRequestButton').attr('hidden', false);
            }
        }
    });
}
