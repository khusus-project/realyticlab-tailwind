<?php
/**
 * 
 * 
 * 
 */

namespace REALYTICLAB_THEME\Includes;

use REALYTICLAB_THEME\Includes\Traits\Singleton;

class REALYTICLAB_THEME {
    use Singleton;

    protected function __construct() {
        // load classes here!
        Assets::get_instance();
        $this -> setup_hooks();
    }

    protected function setup_hooks() {
        add_action("after_setup_theme", [$this, "setup_theme"]);
        add_action('rest_api_init', [$this, "theme_info_api"]);
    }

    public function setup_theme() {
        add_theme_support('custom-logo', [
            'height'      => 250,
            'width'       => 250,
            'flex-width'  => true,
            'flex-height' => true,
        ]);
        add_theme_support("custom-header", array(
            "width"         => 1920,
            "height"        => 600,
            "flex-height"   => true,
            "flex-width"    => true,
        ));
        add_theme_support('post-thumbnails');
        add_theme_support('title-tag');
        add_theme_support('html5', ['search-form', 'comment-form', 'gallery']);
    }

    public function theme_info_api () {
        register_rest_route('theme/v1', '/info', [
            'methods' => 'GET',
            'callback' => function () {
                global $_wp_theme_features;
                $supports = [];

                if (is_array($_wp_theme_features)) {
                    foreach ($_wp_theme_features as $feature => $args) {
                        $supports[$feature] = get_theme_support($feature);
                    }
                }
                
                // === Tambahkan URL custom logo ke dalam supports["custom-logo"][0] ===
                $custom_logo_id = get_theme_mod('custom_logo');
                if ($custom_logo_id) {
                    $image = wp_get_attachment_image_src($custom_logo_id, 'full');
                    if ($image && isset($supports['custom-logo'][0])) {
                        // tambahkan langsung di array pertama custom-logo
                        $supports['custom-logo'][0]['url'] = $image[0];
                        $supports['custom-logo'][0]['id'] = $custom_logo_id;
                    }
                }

                // Ambil header image aktif
                $header_image = get_header_image();

                // 👉 Masukkan ke dalam array custom-header agar bisa diakses dari React
                if (isset($supports['custom-header'][0])) {
                    $supports['custom-header'][0]['default-image'] = $header_image;
                }

                return [
                    'site_title' => get_bloginfo('name'),
                    'site_tagline' => get_bloginfo('description'),
                    'theme' => wp_get_theme()->get('Name'),
                    'supports' => $supports,
                ];
            },
            'permission_callback' => '__return_true',
        ]);
    }
}