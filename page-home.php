<?php
/**
 * Template Name: Page (Default)
 * Description: Page template with Sidebar on the left side
 *
 */

	get_header();
?>

	<div class="row">

		<div class="col-md-12 col-sm-12">
			<?php the_post(); ?>

			<div id="post-<?php the_ID(); ?>" <?php post_class( 'content' ); ?>>

				<?php
					the_content();

				?>
			</div><!-- /#post-<?php the_ID(); ?> -->

		</div><!-- /.col -->

	</div><!-- /.row -->

<?php get_footer(); ?>
