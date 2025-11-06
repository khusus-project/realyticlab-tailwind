<?php
/**
 * 
 * 
 * 
 */

define("THEME_DIR_URI", get_template_directory_uri());
define("STYLESHEET_URI", get_stylesheet_uri());
use REALYTICLAB_THEME\Includes\REALYTICLAB_THEME as REALYTICLAB_THEME;

if(!defined("THEME_DIR")) {
    define("THEME_DIR", untrailingslashit(get_template_directory()));
}

require_once THEME_DIR . "/includes/helpers/autoloader.php";

function realyticlab_get_theme_instance() {
    REALYTICLAB_THEME::get_instance();
}

realyticlab_get_theme_instance();
