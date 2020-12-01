<?php

/*
  Plugin Name:    OtFm Countdown to New Year block
  Plugin URI:     https://wordpress.org/plugins/otfm-countdown-to-new-year-block/
  Description:    For new block editor (Gutenberg) countdown to new year. Block for WordPress
  Version:        1.0.3
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

if ( ! defined( 'ABSPATH' ) )
    exit;


/**/
add_action( 'wp_enqueue_scripts', 'octny_register_resource' );
function octny_register_resource() {
// countdown
    wp_register_script(
        'octny_count', plugins_url( 'dist/countdown.js', __FILE__ ), array( 'wp-blocks' ), filemtime( plugin_dir_path( __FILE__ ) . 'dist/countdown.js' )
    );

    wp_register_style(
        'octny_count_css', plugins_url( 'dist/countdown.css', __FILE__ ), '', filemtime( plugin_dir_path( __FILE__ ) . 'dist/countdown.css' )
    );
}

add_action( 'init', 'octny_script' );
function octny_script() {
// block
    //plugins_url('src/block/block.js', __FILE__),  // debug
    wp_register_script(
        'octny_script', plugins_url( 'dist/editor.js', __FILE__ ), array( 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' )
    );

    // if no wp 5.0
    if ( ! function_exists( 'register_block_type' ) )
        return;

    register_block_type( 'otfm/octny-block', array(
        'editor_script' => 'octny_script'
    ) );

    /**
     *  TODO: experiment translation in service wp translate
     *  upd. dont work in 5.0.1
     */
    //wp_set_script_translations( 'octny_script', 'otfm-countdown-to-new-year-block' );
}

// add script on frontend & backend
add_action( 'enqueue_block_assets', 'octny_countdown_script' );
function octny_countdown_script() {
    wp_enqueue_script(
        'octny_count', plugins_url( 'dist/countdown.js', __FILE__ ), array( 'wp-blocks', 'jquery', 'wp-i18n' ), '', true
    );

    // create jed
    $locale = octny_get_jed_locale_data( 'otfm-countdown-to-new-year-block' );

    // add in object JS wp.i18n.setLocaleData.
    $content = 'wp.i18n.setLocaleData(' . json_encode( $locale ) . ', "otfm-countdown-to-new-year-block" );';

    // before script inline
    wp_script_add_data( 'octny_count', 'data', $content );  // countdown translate
    wp_script_add_data( 'octny_script', 'data', $content ); // block translate

    /**
     *  TODO: experiment translation in service wp translate
     *  upd. dont work in 5.0.1
     */
//    if ( function_exists( 'wp_set_script_translations' ) ) {
//        wp_set_script_translations( 'octny_count', 'otfm-countdown-to-new-year-block' );
//    }
}

// add style on frontend
add_action( 'enqueue_block_assets', 'octny_countdown_style' );
function octny_countdown_style() {
    wp_enqueue_style(
        'octny_count_css', plugins_url( 'dist/countdown.css', __FILE__ )
    );
}

// languages
add_action( 'plugins_loaded', 'octny_textdomain' );
function octny_textdomain() {
    load_plugin_textdomain( 'otfm-countdown-to-new-year-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}

// in gutenberg original function gutenberg_get_jed_locale_data
// this is alternative for WP 5.0
function octny_get_jed_locale_data( $domain ) {
    $translations = get_translations_for_domain( $domain );
    $locale       = array(
        '' => array(
            'domain' => $domain,
            'lang'   => is_admin() ? get_user_locale() : get_locale(),
        ),
    );
    if ( ! empty( $translations->headers['Plural-Forms'] ) ) {
        $locale['']['plural_forms'] = $translations->headers['Plural-Forms'];
    }
    foreach ( $translations->entries as $msgid => $entry ) {
        $locale[$msgid] = $entry->translations;
    }

    return $locale;
}
