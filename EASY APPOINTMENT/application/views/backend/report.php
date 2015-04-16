<?php
date_default_timezone_set('America/Chicago');
?>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

<link rel="stylesheet" 
        src="<?php echo $base_url; ?>assets/css/datepicker.css"></script>

<script type="text/javascript"
        src="<?php echo $base_url; ?>assets/js/bootstrap-datepicker.js"></script>


<script type="text/javascript" 
        src="<?php echo $base_url; ?>assets/js/libs/jquery/fullcalendar.min.js"></script>

        <script type="text/javascript" 
        src="<?php echo $base_url; ?>assets/js/libs/jquery/jquery-ui-timepicker-addon.js"></script>


<!-- Start customizing code here -->
<div class="container">
    <div class="container">
        <div class="row">
             <h1 class="page-header">Reports</h1>


            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="panel-group" id="accordion">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h4 class="panel-default">
                                 Daily Report
                            </h4>
                        </div>

                            <div class="panel-body">This report generates the list of clients in a single business day.



                                <form class="form-horizontal">
                                <fieldset>

                                <!-- Multiple Radios -->
                                <div class="control-group">
                                  <div class="controls">
                                    <label class="radio" for="daily-radio-0">
                                      <input type="radio" name="radios" id="daily-radio-0" value="Today" checked="checked">
                                      Today (<?php echo date("M jS, Y"); ?>)
                                    </label>
                                    <label class="radio" for="daily-radio-1">
                                      <input type="radio" name="radios" id="daily-radio-1" value="Date:">
                                      Date: <input type="text" id="start-datetime" class="hasDatepicker">
                                    </label>
                                  </div>
                                </div>

                                <!-- Button -->
                                <div class="control-group">
                                  <label class="control-label" for="generateButton1"></label>
                                  <div class="controls">
                                    <button id="generateButton1" name="generateButton1" class="btn btn-primary">Generate</button>
                                  </div>
                                </div>

                                </fieldset>
                                </form>




                            </div>
                    </div>

                    <div class="panel panel-warning">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                Monthly / Range Report
                            </h4>
                        </div>
                        <div class="panel-body">This report generates a tabulated view of appointments for a single
                         month, or a range of two dates. 
                        <form class="form-horizontal">
                            <fieldset>

                            <!-- Multiple Radios -->
                            <div class="control-group">
                              <div class="controls">
                                <label class="radio" for="noshow-radio-0">
                                  <input type="radio" name="radios" id="noshow-radio-0" value="Option one" checked="checked">Single Month
                                      <select id="selectbasic" name="selectbasic" class="input-xlarge">
                                  <option>January 2015</option>
                                  <option>February 2015</option>
                                  <option>March 2015</option>
                                  <option>April 2015</option>
                                </select>
                                </label>
                                <label class="radio" for="noshow-radio-1">
                                  <input type="radio" name="radios" id="noshow-radio-1" value="Range">
                                  Date Range <input type="text" id="start-datetime" class="hasDatepicker"> to <input type="text" id="end-datetime" class="hasDatepicker">





                                </label>
                              </div>
                            </div>


                            <!-- Button -->
                            <div class="control-group">
                              <label class="control-label" for="generateButton2"></label>
                              <div class="controls">
                                <button id="generateButton2" name="generateButton2" class="btn btn-warning">Generate</button>
                              </div>
                            </div>

                            </fieldset>
                            </form>                                

                        </div>
                    </div>



                    <div class="panel panel-danger">
                        <div class="panel-heading">
                                <h4 class="panel-title">
                                    No-Show Report
                                </h4>
                        </div>
                            <div class="panel-body">This report generates a list of clients who have not shown up for an appointment, and have 
                                failed to reschedule</div>
                                    <form class="form-horizontal">
                                    <fieldset>

                                    <!-- Multiple Radios -->
                                    <div class="control-group">
                                      <label class="control-label" for="radios">Multiple Radios</label>
                                      <div class="controls">
                                        <label class="radio" for="noshow-radio-0">
                                          <input type="radio" name="radios" id="noshow-radio-0" value="Active Policy (Within 30 days)" checked="checked">
                                          Active Policy (Within 30 days)
                                        </label>
                                        <label class="radio" for="radios-1">
                                          <input type="radio" name="radios" id="radios-1" value="Other">
                                              <input type="radio" name="radios" id="radios-1" value="Range">
                                              Date Range <input type="text" id="start-datetime" class="hasDatepicker"> to <input type="text" id="end-datetime" class="hasDatepicker">
                                        </label>
                                      </div>
                                    </div>

                                    <!-- Button -->
                                    <div class="control-group">
                                      <label class="control-label" for="generateButton3"></label>
                                      <div class="controls">
                                        <button id="generateButton3" name="generateButton3" class="btn btn-danger">Generate</button>
                                      </div>
                                    </div>

                                    </fieldset>
                                    </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>