<?php
/**
 * The Template for displaying Author pages.
 */

	get_header();
?>
	<?php if ( have_posts() ) : ?>
			
		<?php
			/**
			 * Queue the first post, that way we know
			 * what author we're dealing with (if that is the case).
			 *
			 * We reset this later so we can run the loop
			 * properly with a call to rewind_posts().
			 */
			the_post();
		?>

		<header class="page-header">
			<h1 class="page-title author">
				<?php
					printf( __( 'Author Archives: %s', 'outandequal' ), '<span class="vcard">' . get_the_author() . '</span>' );
				?>
			</h1>
		</header>

		<?php get_template_part( 'author', 'bio' ); ?>

		<?php
			/**
			 * Since we called the_post() above, we need to
			 * rewind the loop back to the beginning that way
			 * we can run the loop properly, in full.
			 */
			rewind_posts();
		?>

		<?php
			get_template_part( 'archive', 'loop' );
		?>

	<?php else : ?>

		<?php
			// 404
			get_template_part( 'content', 'none' );
		?>

	<?php
		endif;
		wp_reset_postdata(); // end of the loop.
	?>

<?php get_footer(); ?>
