<?php
class SystemConfiguration {
    // General Settings
    public static $base_url    = 'http://localhost:8888/fairhope/';
    
    // Database Settings
    public static $db_host     = 'localhost';
    public static $db_name     = 'fairhope';
    public static $db_username = 'root';
    public static $db_password = 'root';
    
    // Google Calendar API Settings
    public static $google_sync_feature  = FALSE; // Enter TRUE or FALSE;
    public static $google_product_name  = '';
    public static $google_client_id     = '';
    public static $google_client_secret = '';
    public static $google_api_key       = '';
}

/* End of file configuration.php */
/* Location: ./configuration.php */