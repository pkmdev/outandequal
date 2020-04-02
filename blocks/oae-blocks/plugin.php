<?php
/**
 * Plugin Name: Out & Equal Blocks
 * Plugin URI:
 * Description: Out & Equal Blocks — Custom Blocks for Out & Equal theme
 * Author: Peter Morrison
 * Author URI: https://pkmo.dev
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once dirname(__FILE__) . '/src/init.php';

function outandequal_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'oae',
				'title' => __( 'Out & Equal Blocks', 'oae' ),
			),
		)
	);
}
add_filter( 'block_categories', 'outandequal_block_category', 10, 2);

add_action( 'init', 'outandequal_add_image_sizes' );
function outandequal_add_image_sizes() {
    /* Custom Images */
    add_image_size( "accordionbg", 9999, 800, false );
}

add_filter( 'image_size_names_choose', 'outandequal_custom_sizes' );

function outandequal_custom_sizes( $sizes ) {
    return array_merge( $sizes, array(
        'accordionbg' => __('Accordion Background'),
    ) );
}

function oae_partner_dynamic_render_callback( $attributes, $content ) {
		ob_start();     ?>
		<div class="wp-block-oae-partners container">
			<div class="row">
				<div class="col-12">
					<h2><?php echo (isset($attributes['heading']) ? $attributes['heading'] : 'Our Partners'); ?></h2>
				</div>
			</div>
		  <div class="row">
		    <div class="col-lg-1 col-md-12"></div>
		    <div class="col-lg-10 col-md-12">
					<div class="partner_imgs">
		      <?php
					$args = array(
						'post_type' => 'partners',
						'posts_per_page' => 6
					);

					$partners = new WP_Query($args);

					foreach ($partners->posts as $partner) {
						$imgid = get_post_meta($partner->ID,'oae_partner_logo', true);
						$image = wp_get_attachment_image($imgid, 'small');
						$url = get_post_meta($partner->ID,'oae_partner_url', true);

						echo '<div class="partnerimg"><a href="'.$url.'" target="_blank">'.$image.'</a></div>';

					} ?>
					</div>
		    </div>
		    <div class="col-lg-1 col-md-12 sidelink">
		      <a href="<?php echo $attributes['moreurl']; ?>"><?php echo (isset($attributes['more']) ? $attributes['more'] : 'View All'); ?> <span style="font-size: 1.5em; vertical-align:middle" class="icon-arrow"></span></a>
		    </div>
		  </div>

			<div class="row">
				<div class="col-12">
					<a class="oae-button cyan-button" href="<?php echo $attributes['url']; ?>"><?php echo(isset($attributes['button']) ? $attributes['button'] : 'Become a Partner'); ?></a>
				</div>
			</div>
		</div>
		<?php
		$output = ob_get_contents();
		ob_end_clean();
    return $output;
}
