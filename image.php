<?php
/**
 * The template for displaying image attachments
 *
 */

	get_header();
?>

<div class="container">
	<div class="row">
		<div class="col-md-12">
			<?php
				if ( have_posts() ) :
					while ( have_posts() ) :
						the_post();
			?>

				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

					<div id="image-navigation" class="d-flex mb-4 justify-content-between">
						<div><?php previous_image_link( false, '<span aria-hidden="true">&larr;</span> ' . __( 'Previous image', 'outandequal' ) ); ?></div>
						<div><?php next_image_link( false, __( 'Next image', 'outandequal' ) . ' <span aria-hidden="true">&rarr;</span>' ); ?></div>
					</div><!-- /.d-flex -->
					
					<header class="entry-header">
						<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
					</header><!-- /.entry-header -->
					
					<div class="entry-content">
						
						<div class="entry-attachment">
							<?php
								echo wp_get_attachment_image( get_the_ID(), 'large', false, array( 'class' => 'img-fluid' ) );
							?>
							
							<?php
								if ( has_excerpt() ) :
							?>
								<div class="entry-caption">
									<?php
										the_excerpt();
									?>
								</div><!-- /.entry-caption -->
							<?php
								endif;
							?>
							
						</div><!-- /.entry-attachment -->
						
						<?php
							the_content();

							wp_link_pages(
								array(
									'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'outandequal' ) . '</span>',
									'after'       => '</div>',
									'link_before' => '<span>',
									'link_after'  => '</span>',
									'pagelink'    => '<span class="screen-reader-text">' . __( 'Page', 'outandequal' ) . ' </span>%',
									'separator'   => '<span class="screen-reader-text">, </span>',
								)
							);
						?>
					</div><!-- /.entry-content -->
					
					<footer class="entry-footer">
						<?php edit_post_link( __( 'Edit', 'outandequal' ), '<span class="edit-link">', '</span>' ); ?>
					</footer><!-- /.entry-footer -->
					
				</article><!-- /#post-## -->
				
				<?php
					// If comments are open or we have at least one comment, load up the comment template
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif;
					
					// Parent post navigation
					the_post_navigation(
						array(
							'prev_text' => _x( 'Published in %title', 'Parent post link', 'outandequal' ),
							'aria_label' => __( 'Parent post', 'outandequal' ),
						)
					);
				?>
			
			<?php
					endwhile;
				endif;
				wp_reset_postdata(); // end of the loop.
			?>
		</div><!-- /.col -->
	</div><!-- /.row -->

</div><!-- /.container -->

<?php get_footer(); ?>
