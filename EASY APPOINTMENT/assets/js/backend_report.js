/**
 * Backend Report javasript namespace. Contains the main functionality 
 * of the backend Report page. If you need to use this namespace in a 
 * different page, do not bind the default event handlers during initialization.
 *
 * @namespace BackendReport
 */
 $(document).ready(function() { 
    $('#generate-daily').click(function() {
            var start;
			var end;
			if($('#daily-radio-today').prop('checked'))
			{
			start = new Date();
			start.set({ 'hour': 23 });
			start.set({ 'minute': 59 });
			start.set({ 'second': 59 });
			
			end = new Date();
			end.set({ 'hour': 00 });
			end.set({ 'minute': 00 });
			end.set({ 'second': 00 });
			
			}
			else if($('#daily-radio-daypicker').prop('checked')){
			start = Date.parseExact($('#daily-report #start-datetime').val(),
                    'MM/dd/yyyy HH:mm').toString('yyyy,MM,dd 23:59:59');
			start = new Date(start);
			end = Date.parseExact($('#daily-report #start-datetime').val(),
                    'MM/dd/yyyy HH:mm').toString('yyyy,MM,dd 00:00:00');
			end = new Date(end);
			}
			var appointment = GlobalVariables.appointments;
			var customers =  GlobalVariables.customers;
			var row = 0;
			var html = '<body>' +
			'<div id = "daily-report">'
           '<div class="datagrid">'+
		   '<table>'+
		   '<thead><tr><th>Name</th><th>Date of Birth</th><th>No show</th><th>Date</th><th>Referral</th></tr></thead>'+
		   '<tbody>';
			$.each(appointment, function(index, a) {
				var sdt = a.start_datetime.toString('yyyy,MM,dd HH:mm:ss');
					sdt = new Date(sdt);
                if (sdt <= start & sdt >= end) {
					$.each(customers, function(index, c) {
						if(c.id == a.id_users_customer)
						{
							if(row % 2 == 0)
							{
								html = html + 
								'<tr><td>'+ c.first_name +' '+c.last_name+'</td><td>'+c.dob+'</td><td>'+a.no_show_flag+'</td><td>'+a.start_datetime.toString('yyyy/MM/dd')+'</td><td></td></tr>';
							}
							else{
								html = html + 		
								'<tr><td>'+ c.first_name +' '+c.last_name+'</td><td>'+c.dob+'</td><td>'+a.no_show_flag+'</td><td>'+a.start_datetime.toString('yyyy/MM/dd')+'</td><td></td></tr>';
							}
							row = row + 1;
						}
					});		
                }
            });
			html = html + '</tbody>'+
				'</table>'+
				'</div>'+
				'</div>'+
				'</body>';
			var printWin = window.open('', '', 'left=0,top=0,width=700,height=500,toolbar=0,scrollbars=0,status  =0');
                printWin.document.write(html);
    });
	$('#generate-monthly').click(function() {
            var date = new Date();
			var start;
			var end;
			if($('#monthly-radio-single').prop('checked'))
			{
			start = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			start.set({ 'hour': 23 });
			start.set({ 'minute': 59 });
			start.set({ 'second': 59 });
			
			end = new Date(date.getFullYear(), date.getMonth(), 1);
			end.set({ 'hour': 00 });
			end.set({ 'minute': 00 });
			end.set({ 'second': 00 });
			}
			else if($('#monthly-radio-ranged').prop('checked')){
			end = Date.parseExact($('#monthly-report #start-datetime').val(),
                    'MM/dd/yyyy HH:mm').toString('yyyy,MM,dd 23:59:59');
			end = new Date(end);
			start = Date.parseExact($('#monthly-report #end-datetime').val(),
                    'MM/dd/yyyy HH:mm').toString('yyyy,MM,dd 00:00:00');
			start= new Date(start);
			}
			var appointment = GlobalVariables.appointments;
			var customers =  GlobalVariables.customers;
			var row = 0;
			var html = '<html><head><title>Monthly Report</title>'
			'<link rel="stylesheet" type="text/css"href="<?php echo $base_url; ?>assets/css/report.css" /></head>'+
			'<body>' +
			'<div id = "monly-report">'
           '<div class="datagrid">'+
		   '<table>'+
		   '<thead><tr><th>Name</th><th>Date of Birth</th><th>No show</th><th>Date</th><th>Referral</th></tr></thead>'+
		   '<tbody>';
			$.each(appointment, function(index, a) {
				var sdt = a.start_datetime.toString('yyyy,MM,dd HH:mm:ss');
					sdt = new Date(sdt);
                if (sdt <= start & sdt >= end) {
					$.each(customers, function(index, c) {
						if(c.id == a.id_users_customer)
						{
							if(row % 2 == 0)
							{
								html = html + 
								'<tr><td>'+ c.first_name +' '+c.last_name+'</td><td>'+c.dob+'</td><td>'+a.no_show_flag+'</td><td>'+a.start_datetime.toString('yyyy/MM/dd')+'</td><td></td></tr>';
							}
							else{
								html = html + 		
								'<tr><td>'+ c.first_name +' '+c.last_name+'</td><td>'+c.dob+'</td><td>'+a.no_show_flag+'</td><td>'+a.start_datetime.toString('yyyy/MM/dd')+'</td><td></td></tr>';
							}
							row = row + 1;
						}
					});		
                }
            });
			html = html + '</tbody>'+
				'</table>'+
				'</div>'+
				'</div>'+
				'</body></html>';
			var printWin = window.open('', '', 'left=0,top=0,width=700,height=500,toolbar=0,scrollbars=0,status  =0');
                printWin.document.write(html);
    });
	$('#generate-noshow').click(function() {
            var start;
			var end;
			var appointment = GlobalVariables.appointments;
			var customers =  GlobalVariables.customers;
			
			if($('#noshow-radio-active').prop('checked'))
			{
			start = new Date();
			start.set({ 'hour': 23 });
			start.set({ 'minute': 59 });
			start.set({ 'second': 59 });
			
			$.each(GlobalVariables.availableProviders, function(index, p) {
			});
			end = start;
			end.setDate(myDate.getDate() + GlobalVariables.availableProviders);
			end.set({ 'hour': 00 });
			end.set({ 'minute': 00 });
			end.set({ 'second': 00 });
			}
			else if($('#noshow-radio-select').prop('checked')){
			end = Date.parseExact($('#monthly-report #start-datetime').val(),
                    'MM/dd/yyyy HH:mm').toString('yyyy,MM,dd 23:59:59');
			end = new Date(end);
			start = Date.parseExact($('#monthly-report #end-datetime').val(),
                    'MM/dd/yyyy HH:mm').toString('yyyy,MM,dd 00:00:00');
			start= new Date(start);
			}
			
    });
	$('#selectbasic').click(function() {
		console.log($('#selectbasic option:selected').text());
	});
});
		/*
var BackendReport = {
    // :: CONSTANTS
    FILTER_TYPE_PROVIDER: 'provider',
    FILTER_TYPE_SERVICE: 'service',
    
    // :: VALIABLES
    lastFocusedEventData: undefined, // Contain event data for later use.
    
    
    /**
     * Event: Add Customer Button "Click"
     *//*
	 $('#generateButton1').click(function() {
            var start;
			if($('daily-radio-today').prop("checked", true))
			{
			start = new Date();
            var currentMin = parseInt(start.toString('mm'));
            
            if (currentMin > 0 && currentMin < 15) 
                start.set({ 'minute': 15 });
            else if (currentMin > 15 && currentMin < 30)
                start.set({ 'minute': 30 });
            else if (currentMin > 30 && currentMin < 45)
                start.set({ 'minute': 45 });
            else 
                start.addHours(1).set({ 'minute': 0 });
			console.log(start);
			}
			else if($('daily-radio-daypicker').prop("checked", true)){
			start = Date.parseExact($('#start-datetime').val(),
                    'MM/dd/yyyy HH:mm').toString('yyyy-MM-dd HH:mm:ss');
			console.log(start);
			}
        });
	       
    /**
     * This method reloads the registered appointments for the selected date period 
     * and filter type.
     * 
     * @param {object} $calendar The calendar jQuery object.
     * @param {int} recordId The selected record id.
     * @param {string} filterType The filter type, could be either FILTER_TYPE_PROVIDER
     * or FILTER_TYPE_SERVICE.
     * @param {date} startDate Visible start date of the calendar.
     * @param {type} endDate Visible end date of the calendar.
     */
    /*GetAppointmentsByDate: function(recordId, filterType, startDate, endDate) {
        var postUrl = GlobalVariables.baseUrl + 'backend_api/ajax_get_appointments';
        var postData = {
            'record_id': recordId,
            'start_date': startDate.toString('yyyy-MM-dd'),
            'end_date': endDate.toString('yyyy-MM-dd'),
            'filter_type': filterType
        };

        $.post(postUrl, postData, function(response) {
            ////////////////////////////////////////////////////////////////////
            console.log('Get Appointments by Date Response :', response);
            ////////////////////////////////////////////////////////////////////
            
            if (!GeneralFunctions.handleAjaxExceptions(response)) return;
            
            // :: ADD APPOINTMENTS TO CALENDAR
            var calendarEvents = [];
            var $calendar = $('#calendar');
            
            $.each(response.appointments, function(index, appointment){
                var event = {
                    'id': appointment['id'],
                    'title': appointment['service']['name'] + ' - ' 
                            + appointment['customer']['first_name'] + ' ' 
                            + appointment['customer']['last_name'],
                    'start': appointment['start_datetime'],
                    'end': appointment['end_datetime'],
                    'allDay': false,
                    'data': appointment // Store appointment data for later use.
                };
                
                //calendarEvents.push(event);
            });
            
            // :: ADD PROVIDER'S UNAVAILABLE TIME PERIODS
            var calendarView = $calendar.fullCalendar('getView').name;
            
            if (filterType === BackendCalendar.FILTER_TYPE_PROVIDER && calendarView !== 'month') {
                $.each(GlobalVariables.availableProviders, function(index, provider) {
                    if (provider['id'] == recordId) {

                    } 
                });
            }
        }, 'json');
    },
    */