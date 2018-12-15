<?php

/*
Plugin Name:    OtFm Countdown to New Year block
Plugin URI:     https://wordpress.org/plugins/otfm-countdown-to-new-year-block/
Description:    For new block editor (Gutenberg) countdown to new year. Block for WordPress
Version:        1.0.0
Author:         Otshelnik-Fm (Wladimir Druzhaev)
Author URI:     https://otshelnik-fm.ru/
Text Domain:    otfm-countdown-to-new-year-block
License:        GPLv3 or later
License URI:    https://www.gnu.org/licenses/gpl-3.0.html
*/

/*

  ╔═╗╔╦╗╔═╗╔╦╗
  ║ ║ ║ ╠╣ ║║║ https://otshelnik-fm.ru
  ╚═╝ ╩ ╚  ╩ ╩

 */

// counter idea https://codepen.io/codemzy/full/pgNKEq

if (!defined('ABSPATH')) exit;


function octny_register_resource(){
// countdown
    wp_register_script(
        'octny_count',
        plugins_url('dist/countdown.js', __FILE__),
        array( 'wp-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'dist/countdown.js' )
    );

    wp_register_style(
        'octny_count_css',
        plugins_url('dist/countdown.css', __FILE__),
        '',
        filemtime( plugin_dir_path( __FILE__ ) . 'dist/countdown.css' )
    );
}
add_action( 'wp_enqueue_scripts', 'octny_register_resource' );



function octny_script(){
// block
    wp_register_script(
        'octny_script',
        plugins_url('dist/editor.js', __FILE__),
        //plugins_url('src/block/block.js', __FILE__),  // debug
        array( 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' )
    );

    if( !function_exists('register_block_type') ) return;   // if no wp 5.0

    register_block_type( 'otfm/octny-block', array(
        'editor_script' => 'octny_script'
    ) );

    /**
     *  TODO: experiment translation in service wp translate
     */
    //wp_set_script_translations( 'octny_script', 'otfm-countdown-to-new-year-block' );
}
add_action('init', 'octny_script');


// add script on frontend
function octny_countdown_script(){
    wp_enqueue_script(
            'octny_count',
            plugins_url('dist/countdown.js', __FILE__),
            array( 'wp-blocks', 'jquery' ),
            '',
            true
    );

    /**
     *  TODO: experiment translation in service wp translate
     */
    //if ( function_exists( 'wp_set_script_translations' ) ) {
    //    wp_set_script_translations( 'octny_count', 'otfm-countdown-to-new-year-block' );
    //}
}
add_action( 'enqueue_block_assets', 'octny_countdown_script' );


// add style on frontend
function octny_countdown_style(){
    wp_enqueue_style(
            'octny_count_css',
            plugins_url('dist/countdown.css', __FILE__)
    );
}
add_action( 'enqueue_block_assets', 'octny_countdown_style' );


/**
 *  TODO: experiment translation in service wp translate
 */
// languages
function octny_textdomain() {
    load_plugin_textdomain( 'otfm-countdown-to-new-year-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}
//add_action( 'plugins_loaded', 'octny_textdomain' );