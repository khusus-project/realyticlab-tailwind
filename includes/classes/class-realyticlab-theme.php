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

        /** 🔐 JWT CUSTOMIZATION HOOKS */
        add_filter('jwt_auth_payload', [$this, 'extend_jwt_payload'], 10, 2);
        add_filter('jwt_auth_token_before_sign', [$this, 'extend_jwt_payload'], 10, 2);
        add_filter('jwt_auth_token_before_dispatch', [$this, 'extend_jwt_response'], 10, 2);

        // 🧩 Integrasi token JWT ke REST API bawaan
        add_filter('rest_authentication_errors', [$this, 'allow_jwt_auth_for_rest'], 10, 1);

        // 🧠 Tambah data user lengkap di /wp/v2/users/me
        add_filter('rest_prepare_user', [$this, 'extend_rest_user_data'], 10, 3);
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
                            $item_data = get_object_vars($item);
                            return $item_data;
                        }, $menu_items ?: []),
                    ];
                }

                return rest_ensure_response($data);
            },
            'permission_callback' => '__return_true',
        ]);
    }

    /** =============================
     *  🔐 JWT CUSTOMIZATION FUNCTIONS
     * ============================= */

    /**
     * Tambah data ke JWT bagian payload (di dalam token)
     */
    public function extend_jwt_payload($payload, $user) {
        if ($user instanceof \WP_User) {

            // Hapus field bawaan yang bikin dobel
            unset($payload['user_email']);
            unset($payload['user_nicename']);
            unset($payload['user_display_name']);

            $payload['user_id'] = $user->ID;
            $payload['user_email'] = $user->user_email;
            $payload['display_name'] = $user->display_name;
            $payload['roles'] = $user->roles;
            $payload['avatar'] = get_avatar_url($user->ID);
        }
        return $payload;
    }

    public function extend_jwt_response($data, $user) {
        if ($user instanceof \WP_User) {
            
            // Hapus field bawaan yang bikin dobel
            // unset($data['user_email']);
            unset($data['user_nicename']);
            unset($data['user_display_name']);

            $data['user_id'] = $user->ID;
            
            $data['user_email'] = $user->user_email;
            $data['display_name'] = $user->display_name;
            $data['roles'] = $user->roles;
            $data['avatar'] = get_avatar_url($user->ID);
        }
        return $data;
    }

    /**
     * 🧩 Integrasikan JWT agar /wp/v2/users/me mengenali Authorization header
     */
    public function allow_jwt_auth_for_rest($result) {
        if (!empty($result)) {
            return $result; // Kalau sudah ada error lain, jangan ganggu
        }

        $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? false;

        if ($auth && function_exists('jwt_auth_validate_token')) {
            $token = str_replace('Bearer ', '', $auth);
            $validate = jwt_auth_validate_token($token);

            if ($validate && !is_wp_error($validate)) {
                $user_id = $validate->data->user->id ?? null;
                if ($user_id) {
                    wp_set_current_user($user_id);
                    return true; // ✅ Token valid, anggap user sudah login
                }
            }
        }

        return $result;
    }

    public function extend_rest_user_data($response, $user, $request) {
        if ($user instanceof \WP_User) {
            $data = $response->get_data();
            $data['email'] = $user->user_email;
            $data['roles'] = $user->roles;
            $data['avatar'] = get_avatar_url($user->ID);
            $response->set_data($data);
        }
        return $response;
    }
}