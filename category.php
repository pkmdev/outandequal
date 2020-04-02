<?php
/**
 * The Template for displaying Category Archive pages.
 */

	get_header();
?>

	<?php if ( have_posts() ) : ?>
		
		<header class="page-header">
			<h1 class="page-title"><?php printf( __( 'Category Archives: %s', 'outandequal' ), '<span>' . single_cat_title( '', false ) . '</span>' ); ?></h1>
			<?php
				$category_description = category_description();
				if ( ! empty( $category_description ) ) :
					echo apply_filters( 'category_archive_meta', '<div class="category-archive-meta">' . $category_description . '</div>' );
				endif;
			?>
		</header>

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
