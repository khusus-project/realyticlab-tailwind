<html lang="<?php language_attributes() ?>">
    <head>
        <meta charset="<?php get_bloginfo("charset") ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php wp_head() ?>
    </head>
    <body <?php body_class() ?>>
        <?php
            if(function_exists("wp_body_open")) {
                wp_body_open();
            }
        ?>
        <div id="root"></div>
        <?php wp_footer() ?>
    </body>
</html>