/**
 * Backend Referrers javasript namespace. Contains the main functionality 
 * of the backend referrers page. If you need to use this namespace in a 
 * different page, do not bind the default event handlers during initialization.
 *
 * @namespace BackendReferrers
 */
var BackendReferrers = {
    /**
     * The page helper contains methods that implement each record type functionality 
     * (for now there is only the ReferrersHelper).
     * 
     * @type {object{
     */
    helper: {},
            
	/**
	 * This method initializes the backend referrers page. If you use this namespace
	 * in a different page do not use this method. 
	 * 
	 * @param {bool} defaultEventHandlers (OPTIONAL = false) Whether to bind the default 
	 * event handlers or not.  
	 */
	initialize: function(defaultEventHandlers) {
		if (defaultEventHandlers == undefined) defaultEventHandlers = false; 
		
        /************************************************** 
         * WARNING: NOT SURE IF THE CONSTRUCTOR IS RIGHT! 
         **************************************************/
        BackendReferrers.helper = new ReferrersHelper();
		BackendReferrers.helper.resetForm();
		BackendReferrers.helper.filter('');
        
        $('#filter-referrers .results').jScrollPane();
        $('#clients-referred').jScrollPane();
        
		if (defaultEventHandlers) {
			BackendReferrers.bindEventHandlers();
		}
	},
    
    /**
     * Default event handlers declaration for backend referrers page.
     */
	bindEventHandlers: function() {
        ReferrersHelper.prototype.bindEventHandlers();
	}
};

/**
 * This class contains the methods that are used in the backend referrers page.
 * 
 * @class ReferrersHelper
 */
var ReferrersHelper = function() {
    this.filterResults = {};
};

/**
 * Binds the default event handlers of the backend referrers page.
 */
ReferrersHelper.prototype.bindEventHandlers = function() {
    /**
     * Event: Filter Referrers Form "Submit"
     */
    $('#filter-referrers form').submit(function(event) {
        var key = $('#filter-referrers .key').val();
        $('#filter-referrers .selected-row').removeClass('selected-row');
        BackendReferrers.helper.resetForm();
        BackendReferrers.helper.filter(key);
        return false;
    });
    
    /**
     * Event: Filter Referrers Clear Button "Click"
     */
    $('#filter-referrers .clear').click(function() {
        $('#filter-referrers .key').val('');
        BackendReferrers.helper.filter('');
    });
    
    /**
     * Event: Referrers Row "Click"
     * 
     * Display the referrer data of the selected row.
     */
    $(document).on('click', '.referrer-row', function() {
        if ($('#filter-referrers .filter').prop('disabled')) {
            return; // Do nothing when user edits a referrer record.
        }
        
        /***************************************************************************
         * WARNING! Is this the right way to obtain referrerID? If so, how to implement?
         ***************************************************************************/
        var referrerId = $(this).attr('data-id');
        var referrer = {};
        $.each(BackendReferrers.helper.filterResults, function(index, item) {
            if (item.id == referrerId) {
                referrer = item;
                return false;
            }
        });
        
        BackendReferrers.helper.display(referrer);
        $('#filter-referrers .selected-row').removeClass('selected-row');
        $(this).addClass('selected-row');
        $('#edit-referrer, #delete-referrer').prop('disabled', false);
    });

    /*******************************************************************************
     * TODO:: NOT SURE HOW TO IMPLEMENT THIS YET. WILL COME BACK LATER.
     *******************************************************************************/
    /**
     * Event: Clients Referred Row "Click"
     * 
     * Display client data of the selected row.
     */
    $(document).on('click', '.clients-referred-row', function() {
        $('#clients-referred .selected-row').removeClass('selected-row');
        $(this).addClass('selected-row');

        var Id = $('#filter-referrers .selected-row').attr('data-id');
        var appointmentId = $(this).attr('data-id');
        var appointment = {};

        $.each(BackendCustomers.helper.filterResults, function(index, c) {
            if (c.id === referrerId) {
                $.each(c.appointments, function(index, a) {
                    if (a.id == appointmentId) {
                        appointment = a;
                        return false;
                    }
                });
                return false;
            }
        });

        BackendCustomers.helper.displayAppointment(appointment);
    });

    /*******************************************************************************
     * TODO:: NOT SURE HOW TO IMPLEMENT THIS YET. WILL COME BACK LATER.
     *******************************************************************************/
    /**
     * Event: Appointment Row "Click"
     * 
     * Display appointment data of the selected row.
     */
    $(document).on('click', '.appointment-row-noshow', function () {
        $('#referrer-appointments .selected-row').removeClass('selected-row');
        $(this).addClass('selected-row');

        var referrerId = $('#filter-referrers .selected-row').attr('data-id');
        var appointmentId = $(this).attr('data-id');
        var appointment = {};

        $.each(BackendCustomers.helper.filterResults, function (index, c) {
            if (c.id === referrerId) {
                $.each(c.appointments, function (index, a) {
                    if (a.id == appointmentId) {
                        appointment = a;
                        return false;
                    }
                });
                return false;
            }
        });

        BackendCustomers.helper.displayAppointment(appointment);
    });

    /**
     * Event: Add Referrer Button "Click"
     */
    $('#add-referrer').click(function() {
        BackendReferrers.helper.resetForm();
        $('#add-edit-delete-group').hide();
        $('#save-cancel-group').show();
        $('.details').find('input, textarea').prop('readonly', false);

        $('#filter-referrers button').prop('disabled', true);
        $('#filter-referrers .results').css('color', '#AAA');
    });

    /**
     * Event: Edit Referrer Button "Click"
     */
    $('#edit-referrer').click(function() {
        $('.details').find('input, textarea').prop('readonly', false);
        $('#add-edit-delete-group').hide();
        $('#save-cancel-group').show();

        $('#filter-referrers button').prop('disabled', true);
        $('#filter-referrers .results').css('color', '#AAA');
    });

    /**
     * Event: Cancel Referrer Add/Edit Operation Button "Click"
     */
    $('#cancel-referrer').click(function() {
        var id = $('#referrer-id').val();
        BackendReferrers.helper.resetForm();
        if (id != '') {
            BackendReferrers.helper.select(id, true);
        }
    });

    /**
     * Event: Save Add/Edit Referrer Operation "Click"
     Left is database value, right is the form label
     */
    $('#save-referrer').click(function() {
        var referrer = {
            'name': $('#name').val(),
            'agency' : $('#agency').val(),
            'email': $('#email').val(),
            'phone_number': $('#phone-number').val(),
            'notes': $('#notes').val()
        };

        if ($('#referrer-id').val() != '') {
            referrer.id = $('#referrer-id').val();
        }
        
        if (!BackendReferrers.helper.validate(referrer)) return;
            
        BackendReferrers.helper.save(referrer);
    });

    /**
     * Event: Delete Customer Button "Click"
     */
    $('#delete-referrer').click(function() {
        var referrerId = $('#referrer-id').val();
        
        var messageBtns = {};
        messageBtns[EALang['delete']] = function() {        
            BackendReferrers.helper.delete(referrerId);
            $('#message_box').dialog('close');
        };
        messageBtns[EALang['cancel']] = function() {
            $('#message_box').dialog('close');
        };

        GeneralFunctions.displayMessageBox(EALang['delete_referrer'], 
                EALang['delete_record_prompt'], messageBtns);
    });
};

/**
 * Save a referrer record to the database (via ajax post).
 * 
 * @param {object} referrer Contains the referrer data.
 */
ReferrersHelper.prototype.save = function(referrer) {
    /****************************************************************
     * WARNING: NOT SURE IF CAN USE THE SAME AJAX TO SAVE REFERRERS.
     ****************************************************************/
    var postUrl = GlobalVariables.baseUrl + 'backend_api/ajax_save_referrer';
    var postData = { 'referrer': JSON.stringify(referrer) };
    
    $.post(postUrl, postData, function(response) {
        ///////////////////////////////////////////////////////////
        console.log('Save Referrer Response:', response);
        ///////////////////////////////////////////////////////////
        
        if (!GeneralFunctions.handleAjaxExceptions(response)) return;
        
        Backend.displayNotification(EALang['referrer_saved']);
        BackendReferrers.helper.resetForm();
        $('#filter-referrers .key').val('');
        BackendReferrers.helper.filter('', response.id, true);
    }, 'json');
};

/**
 * Delete a referrer record from database.
 * 
 * @param {numeric} id Record id to be deleted. 
 */
ReferrersHelper.prototype.delete = function(id) {
    /****************************************************************
     * WARNING: NOT SURE IF CAN USE THE SAME AJAX TO DELETE REFERRERS.
     ****************************************************************/
    var postUrl = GlobalVariables.baseUrl + 'backend_api/ajax_delete_referrer';
    var postData = { 'referrer_id': id };
    
    $.post(postUrl, postData, function(response) {
        ////////////////////////////////////////////////////
        //console.log('Delete referrer response:', response);
        ////////////////////////////////////////////////////
        
        if (!GeneralFunctions.handleAjaxExceptions(response)) return;

        Backend.displayNotification(EALang['referrer_deleted']);
        BackendCustomers.helper.resetForm();
        BackendCustomers.helper.filter($('#filter-referrers .key').val());
    }, 'json');
};

/**
 * Validate referrer data before save (insert or update).
 * 
 * @param {object} referrer Contains the referrer data.
 */
ReferrersHelper.prototype.validate = function(referrer) {
    $('#form-message').hide();
    $('.required').css('border', '');
    
    try {
        // Validate required fields.
        var missingRequired = false;
        $('.required').each(function() {
            if ($(this).val() == '') {
                $(this).css('border', '2px solid red');
                missingRequired = true;
            }
        });
        if (missingRequired) {
            throw EALang['fields_are_required'];
        }

        /****************************************************************
         * TODO:: MIGHT DELETE THIS FUNCTION. ASK ROBERTA IF EMAIL ADD OF
         *        REFERRERS ARE REQUIRED.
         ****************************************************************/
        // Validate email address.
        if (!GeneralFunctions.validateEmail($('#email').val())) {
            $('#email').css('border', '2px solid red');
            throw EALang['invalid_email'];
        }

        return true;

    } catch(exc) {
        $('#form-message').text(exc).show();
        return false;
    }
};

/**
 * Bring the referrer form back to its initial state.
 */
ReferrersHelper.prototype.resetForm = function() {
    $('.details').find('input, textarea').val(''); 
    $('.details').find('input, textarea').prop('readonly', true); 
    
    // NEED TO IMPLEMENT LIST OF CLIENTS
    //$('#referrer-appointments').html('');
    //$('#appointment-details').html('');
    $('#edit-referrer, #delete-referrer').prop('disabled', true);
    $('#add-edit-delete-group').show();
    $('#save-cancel-group').hide();
    
    $('.details .required').css('border', '');
    $('.details #form-message').hide();
    
    $('#filter-referrers button').prop('disabled', false);

    /** Note: .removeClass is a jQuery method that removes the class name argument from all
     *        the calling elements.
     */
    $('#filter-referrers .selected-row').removeClass('selected-row');
    $('#filter-referrers .results').css('color', '');
};

/**
 * Display a referrer record into the form.
 * 
 * @param {object} referrer Contains the referrer record data.
 */
ReferrersHelper.prototype.display = function(referrer) {
    $('#referrer-id').val(referrer.id);
    $('#name').val(referrer.name);
    $('#email').val(referrer.email);
    $('#phone-number').val(referrer.phone_number);
    $('#notes').val(referrer.notes);
    $('#agency').val(referrer.agency);

    /*******************************************************************************
     * TODO:: NOT SURE HOW TO IMPLEMENT THIS YET. WILL COME BACK LATER.
     * 
     * This is supposed to display client details into the form.
     *******************************************************************************/
    /*$('#referrer-appointments').data('jsp').destroy();
    $('#referrer-appointments').empty();
    $.each(referrer.appointments, function(index, appointment) {
        var start = Date.parse(appointment.start_datetime).toString('MM/dd/yyyy HH:mm');
        var end = Date.parse(appointment.end_datetime).toString('MM/dd/yyyy HH:mm');
        if (appointment.no_show_flag == 1) {
            var html =
                    '<div class="appointment-row-noshow" data-id="' + appointment.id + '">' +
                        start + ' - ' + end + '<br>' +
                        appointment.service.name + ', ' +
                        appointment.provider.first_name + ' ' + appointment.provider.last_name +
                    '</div>';
        }
        else {
            var html =
                    '<div class="appointment-row" data-id="' + appointment.id + '">' +
                        start + ' - ' + end + '<br>' +
                        appointment.service.name + ', ' +
                        appointment.provider.first_name + ' ' + appointment.provider.last_name +
                    '</div>';
        }
        $('#referrer-appointments').append(html);
    });
    $('#referrer-appointments').jScrollPane({ mouseWheelSpeed: 70 });
    
    $('#appointment-details').empty(); */
};

/**
 * Filter referrer records.
 * 
 * @param {string} key This key string is used to filter the referrer records.
 * @param {numeric} selectId (OPTIONAL = undefined) If set then after the filter 
 * operation the record with the given id will be selected (but not displayed).
 * @param {bool} display (OPTIONAL = false) If true then the selected record will
 * be displayed on the form.
 */
ReferrersHelper.prototype.filter = function(key, selectId, display) {
    if (display == undefined) display = false;
    
    /****************************************************************
     * WARNING: NOT SURE IF CAN USE THE SAME AJAX TO FILTER REFERRERS.
     ****************************************************************/
    var postUrl = GlobalVariables.baseUrl + 'backend_api/ajax_filter_referrers';
    var postData = { 'key': key };
    
    $.post(postUrl, postData, function(response) {
        ///////////////////////////////////////////////////////
        console.log('Filter Referrers Response:', response);
        ///////////////////////////////////////////////////////
        
        if (!GeneralFunctions.handleAjaxExceptions(response)) return;
        
        BackendReferrers.helper.filterResults = response;
        
        $('#filter-referrers .results').data('jsp').destroy(); 
        $('#filter-referrers .results').html('');
        $.each(response, function(index, referrer) {
           var html = BackendReferrers.helper.getFilterHtml(referrer);
           $('#filter-referrers .results').append(html);
        });
        $('#filter-referrers .results').jScrollPane({ mouseWheelSpeed: 70 });
        
        if (response.length == 0) {
            $('#filter-referrers .results').html('<em>' + EALang['no_records_found'] + '</em>');
        }
        
        if (selectId != undefined) {
            BackendReferrers.helper.select(selectId, display);
        }
        
    }, 'json');
};

/**
 * Get the filter results row html code.
 * 
 * @param {object} referrer Contains the referrer data.
 * @return {string} Returns the record html code.
 */

 /************************control how it appear on backend referrer page, left column   */
ReferrersHelper.prototype.getFilterHtml = function(referrer) {
    var name = referrer.name;
    var info = referrer.agency; 
    info = (referrer.phone_number != '' && referrer.phone_number != null) 
            ? info + ', ' + referrer.phone_number : info;
    
    var html = 
            '<div class="referrer-row" data-id="' + referrer.id + '">' +
                '<strong>' + 
                    name + 
                '</strong><br>' + 
                info +
            '</div><hr>';
    
    return html;
};
 
/**
 * Select a specific record from the current filter results. If the referrer id does not exist 
 * in the list then no record will be selected. 
 * 
 * @param {numeric} id The record id to be selected from the filter results.
 * @param {bool} display (OPTIONAL = false) If true then the method will display the record
 * on the form.
 */
ReferrersHelper.prototype.select = function(id, display) {
    if (display == undefined) display = false;
    
    $('#filter-referrers .selected-row').removeClass('selected-row');
    
    $('#filter-referrers .referrer-row').each(function() {
        if ($(this).attr('data-id') == id) {
            $(this).addClass('selected-row');
            return false;
        }
    });
    
    if (display) { 
        $.each(BackendReferrers.helper.filterResults, function(index, referrer) {
            if (referrer.id == id) {
                BackendReferrers.helper.display(referrer);
                $('#edit-referrer, #delete-referrer').prop('disabled', false);
                return false;
            }
        });
    }
}; 
 


/*******************************************************************************
* TODO:: NOT SURE HOW TO IMPLEMENT THIS YET. WILL COME BACK LATER.
* 
* This is supposed to display referrer details.
*******************************************************************************/
/**
 * Display appointment details on referrers backend page.
 * 
 * @param {object} appointment Appointment data
 */
/*ReferrersHelper.prototype.displayAppointment = function(appointment) {
    var start = Date.parse(appointment.start_datetime).toString('MM/dd/yyyy HH:mm');
    var end = Date.parse(appointment.end_datetime).toString('MM/dd/yyyy HH:mm');

    var html = 
            '<div>' + 
                '<strong>' + appointment.service.name + '</strong><br>' + 
                appointment.provider.first_name + ' ' + appointment.provider.last_name + '<br>' +
                start + ' - ' + end + '<br>' +
            '</div>';

    $('#appointment-details').html(html);
}; */