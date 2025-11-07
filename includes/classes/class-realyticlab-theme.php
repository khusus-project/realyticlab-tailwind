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
        // add_theme_support('menus');
        add_theme_support('html5', ['search-form', 'comment-form', 'gallery']);
        register_nav_menus([
            'primary_menu'      => 'Main Menu',
            'secondary_menu'    => 'Secondary Menu',
            'footer_menu'       => 'Footer Menu',
        ]);
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
        
        register_rest_route('theme/v1', '/menus', [
            'methods' => 'GET',
            'callback' => function () {
                $locations = get_nav_menu_locations();
                $data = [];

                foreach ($locations as $location => $menu_id) {
                    $menu_obj = wp_get_nav_menu_object($menu_id);
                    $menu_items = wp_get_nav_menu_items($menu_id);

                    $data[$location] = [
                        'id'   => $menu_id,
                        'name' => $menu_obj ? $menu_obj->name : '',
                        'slug' => $menu_obj ? $menu_obj->slug : '',
                        'items' => array_map(function ($item) {
                            // Konversi seluruh atribut dari objek ke array
                            $item_data = get_object_vars($item);

                            // Kalau kamu ingin tambahkan ACF atau meta lain:
                            // $item_data['acf'] = get_fields($item->ID);

                            return $item_data;
                        }, $menu_items ?: []),
                    ];
                }

                return rest_ensure_response($data);
            }
        ]);
    }
}