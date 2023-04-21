var key;
var amount;
var reason;
var operation;

function initialize_fields() {
    key = ($("#key").val()).trim();
    amount = ($("#transaction-amount").val()).trim();
    reason = $("#transaction-reason").val();
    operation = $("#transaction-type option:selected").val();
    console.log(key, amount, reason, operation)
}

function clear_fields() {
    $("#transaction-amount").val("");
    $("#transaction-reason").val("");
}

function Validate_fields() {
    let msg = "Add value for ";
    let show_alert = false;

    if (key.trim() == "") {
        msg = msg + "Registration Code";
        show_alert = true;
    }
    if (amount.trim() == "") {
        msg = msg + ", amount";
        show_alert = true;
    }
    if (reason.trim() == "") {
        msg = msg + " and reason";
        show_alert = true;
    }
    // if (operation.trim() == "") {
    //     msg = msg + " and Tranction type"
    // }
    msg = msg + " fields.";
    if (show_alert) {
        alert(msg);
    } else {
        return true;
    }
}

$("#report").click(function () {
    key = ($("#key").val()).trim();
    if (key.trim() == "") {
        alert('Add value for Registration Code field.')
    } else {
        let base_url = "https://society-manager-jj9z.onrender.com";
        $.ajax({
            url: base_url + "/report?key=" + key,
            method: 'GET',
            dataType: 'json',
            headers: {"Access-Control-Allow-Origin": "*"},
            success: function (succes_data) {
                alert('Report has been sent to Email ids.')
            },
            error: function (error_data) {
                alert(error_data['responseJSON']['message'])
            }

        });
    }
});

$("#submit").click(function () {
    initialize_fields();

    if (Validate_fields()) {
        let base_url = "https://society-manager-jj9z.onrender.com";
        data = {}
        data["updated_by"] = key;
        data["reason"] = reason;
        data["amount"] = amount;
        data["operation"] = operation;


        $.ajax({
            url: base_url + "/add",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (succes_data) {
                console.log('succes: ' + succes_data);
                clear_fields()
                alert(succes_data['message'])
            },
            error: function (error_data) {
                console.log('error', error_data);
                alert(error_data['responseJSON']['message'])
            }

        });

        // $.post(base_url + "/add",
        //     {
        //         updated_by: key,
        //         reason: reason,
        //         amount: amount,
        //         operation: operation
        //     },
        //     Headers
        //     function (data, status) {
        //         alert("Data: " + data + "\nStatus: " + status);
        //     });

    }
});

$('.js-select-simple').each(function () {
    var that = $(this);
    var selectBox = that.find('select');
    var selectDropdown = that.find('.select-dropdown');
    selectBox.select2({
        dropdownParent: selectDropdown
    });
});
