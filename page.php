<?php
/**
 * Template Name: Page (Full width)
 * Description: Page template full width
 *
 */

	get_header();
?>

	<?php the_post(); ?>

	<div id="post-<?php the_ID(); ?>" <?php post_class( 'content' ); ?>>
		<?php
			the_content();
		?>
	</div><!-- /#post-<?php the_ID(); ?> -->

<?php get_footer(); ?>
