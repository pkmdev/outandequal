<?php

/**
 * Registers the `partners` post type.
 */
function partners_init() {
	register_post_type( 'partners', array(
		'labels'                => array(
			'name'                  => __( 'Partners', 'outandequal' ),
			'singular_name'         => __( 'Partner', 'outandequal' ),
			'all_items'             => __( 'All Partners', 'outandequal' ),
			'archives'              => __( 'Partner Archives', 'outandequal' ),
			'attributes'            => __( 'Partner Attributes', 'outandequal' ),
			'insert_into_item'      => __( 'Insert into Partner', 'outandequal' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Partner', 'outandequal' ),
			'featured_image'        => _x( 'Featured Image', 'partners', 'outandequal' ),
			'set_featured_image'    => _x( 'Set featured image', 'partners', 'outandequal' ),
			'remove_featured_image' => _x( 'Remove featured image', 'partners', 'outandequal' ),
			'use_featured_image'    => _x( 'Use as featured image', 'partners', 'outandequal' ),
			'filter_items_list'     => __( 'Filter Partners list', 'outandequal' ),
			'items_list_navigation' => __( 'Partners list navigation', 'outandequal' ),
			'items_list'            => __( 'Partners list', 'outandequal' ),
			'new_item'              => __( 'New Partner', 'outandequal' ),
			'add_new'               => __( 'Add New', 'outandequal' ),
			'add_new_item'          => __( 'Add New Partner', 'outandequal' ),
			'edit_item'             => __( 'Edit Partner', 'outandequal' ),
			'view_item'             => __( 'View Partner', 'outandequal' ),
			'view_items'            => __( 'View Partners', 'outandequal' ),
			'search_items'          => __( 'Search Partners', 'outandequal' ),
			'not_found'             => __( 'No Partners found', 'outandequal' ),
			'not_found_in_trash'    => __( 'No Partners found in trash', 'outandequal' ),
			'parent_item_colon'     => __( 'Parent Partner:', 'outandequal' ),
			'menu_name'             => __( 'Partners', 'outandequal' ),
		),
		'public'                => true,
		'hierarchical'          => false,
		'show_ui'               => true,
		'show_in_nav_menus'     => true,
		'supports'              => array( 'title', 'editor','custom-fields' ),
		'has_archive'           => true,
		'rewrite'               => true,
		'query_var'             => true,
		'menu_position'         => null,
		'menu_icon'             => 'dashicons-groups',
		'show_in_rest'          => true,
		'rest_base'             => 'partners',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	) );

}
add_action( 'init', 'partners_init' );

/**
 * Sets the post updated messages for the `partners` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `partners` post type.
 */
function partners_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['partners'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Partner updated. <a target="_blank" href="%s">View Partner</a>', 'outandequal' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'outandequal' ),
		3  => __( 'Custom field deleted.', 'outandequal' ),
		4  => __( 'Partner updated.', 'outandequal' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Partner restored to revision from %s', 'outandequal' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Partner published. <a href="%s">View Partner</a>', 'outandequal' ), esc_url( $permalink ) ),
		7  => __( 'Partner saved.', 'outandequal' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Partner submitted. <a target="_blank" href="%s">Preview Partner</a>', 'outandequal' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Partner scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Partner</a>', 'outandequal' ),
		date_i18n( __( 'M j, Y @ G:i', 'outandequal' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Partner draft updated. <a target="_blank" href="%s">Preview Partner</a>', 'outandequal' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}
add_filter( 'post_updated_messages', 'partners_updated_messages' );

function partners_register_post_meta() {

		register_meta('post', 'oae_partner_url', array(
			'object_subtype' => 'partners',
	    'show_in_rest' => true,
	    'type' => 'string',
	    'single' => true,
	    'sanitize_callback' => 'sanitize_text_field',
	    'auth_callback' => function() {
	      return current_user_can('edit_posts');
	    }
	  ));
		register_meta('post', 'oae_partner_logo', array(
			'object_subtype' => 'partners',
	    'show_in_rest' => true,
	    'type' => 'number',
	    'single' => true,
	    'sanitize_callback' => 'sanitize_text_field',
	    'auth_callback' => function() {
	      return current_user_can('edit_posts');
	    }
	  ));
}
add_action( 'init', 'partners_register_post_meta' );


add_action( 'enqueue_block_editor_assets', function(){
	$screen = get_current_screen();
	//if( $screen->post_type != 'partners' ) return;

	wp_enqueue_script(
		'partner-js',
		get_stylesheet_directory_uri() . '/post-types/partners.js',
		array( 'wp-i18n', 'wp-blocks', 'wp-edit-post', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'wp-plugins', 'wp-compose', 'wp-block-editor'),
		filemtime( dirname( __FILE__ ) . '/partners.js' )
	);

});
