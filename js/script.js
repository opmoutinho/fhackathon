const baseURL = "http://helperz.herokuapp.com/api/"

$(document).ready( () => {
    populateProfile();
    populateForum();
});


function populateProfile() {

    $.ajax({url: baseURL + "quim/" + "1", success: (response) => {

            $('#profileId').val(response.id);
            $('#profileName').val(response.name);
            $('#profileEmail').val(response.email);
            $('#profilePhone').val(response.phone);
            $('#profileLocation').val(response.location);
            $('#profileAboutMe').val(response.aboutMe);
            $('#profilePoints').val(response.points);
            $('#profileRating').val(response.rating);
            
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

function showNewResquestForm(event) {

    $('#newRequestForm').attr('hidden', false);
    $('#profileEditButton').attr('hidden', true);
    $('#profileCreateRequestButton').attr('hidden', true);

    $.ajax({url: baseURL + "skills", success: (response) => {

        /* response.forEach() {

        } */
    }
});

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
}

function cancelEditProfile(event) {

    populateProfile();

    $('#profileCreateRequestButton').attr('hidden', false);
    $('#profileEditButton').attr('hidden', false);
    $('#profileCancelEditButton').attr('hidden', true);
    $('#profileConfirmEditButton').attr('hidden', true);

    disableEditProfile();
}

function confirmEditProfile(event) {

    var quim = {
        id: $('#profileId').val(),
        name: $('#firstNameInput').val(),
        email: $('#profileEmail').val(),
        phone: $('#profilePhone').val(),
        location: $('#profileLocation').val(),
        aboutMe: $('#profileAboutMe').val()
    }

    $.ajax({
        url: baseURL + $('#idInput').val(),
        type: 'PUT',
        data: JSON.stringify(quim),
        async: true,
        contentType: 'application/json',
        error: result => {
            console.log("ERROR: ", result);
        },
        success: result => {
            console.log(result);
            // clears all rows from table except first
            $('#forumTable').find("tr:gt(0)").remove();
            populateForum();
            disableEditProfile();
        }
    });
}


function populateForum() {

    $.ajax({
        url: baseURL + "missions", 

        error: response => {
            console.log("ERROR: ", result);
        },

        success: (response) => {

        response.forEach(mission => {

            console.log(misson.location)
            var date = $("<td></td>").text(mission.date);
            var role = $("<td></td>").text(mission.role);
            var location = $("<td></td>").text(mission.location);
    
            var viewMissionButton = $("<button></button>").text('View').addClass('btn btn-light').attr('data', mission.id);
            var viewMissionCell = $("<td></td>").append(viewMissionButton);

            var row = $("<tr></tr>").append(date, role, location, viewMissionCell).attr('data', mission.id);
    
            $('#forumTable').append(row);

        });
    }});

}