<?php
	// If Single or Archive (Category, Tag, Author or a Date based page)
	if ( is_single() || is_archive() ) :
?>
		</div><!-- /.col -->

		<?php get_sidebar(); ?>

	</div><!-- /.row -->
<?php
	endif;
?>

	</main><!-- /#main -->

	<footer id="footer">
		<div class="container">
			<div class="row">
				<div class="col col-lg-3">
					<h2>Who We Are</h2>
					<p>Out & Equal is here to create the future of LGBTQ workplace equality. Through our worldwide programs, Fortune 500 partnerships and our annual Workplace Summit conference, we're able to help organizations create a culture of belonging for all.</p>
				</div>
				<div class="col col-lg-3">
					<h2>Offices</h2>
					<div class="row no-gutters">
						<div class="col col-2"><span class="icon-California stateicon"></div>
						<div class="col col-10 address">
							<h3>Oakland</h3>
							<p>1111 Broadway, 3rd Floor<br />
							Oakland, CA 94607</p>
						</div>
					</div>
					<div class="row no-gutters">
						<div class="col col-2"><span class="icon-Washington-DC stateicon"></div>
						<div class="col col-10 address">
							<h3>Washington DC</h3>
							<p>1701 Rhode Island Ave NW<br />
							Washington, DC 20036</p>
						</div>
					</div>
				</div>
				<div class="col col-lg-3">
					<div class="row">
						<div class="col col-12">
							<h2>Contact</h2>
							<a class="mailto" href="mailto:hello@outandequal.org">hello@outandequal.org</a>
						</div>
					</div>
					<div class="row">
						<div class="col col-12">
							<span class="signup"><strong>Sign Up</strong> for the newsletter</span>
							<input type="text" placeholder="Your Email" /><button class="gobutton" />Go</button>
						</div>
					</div>
				</div>
				<div class="col col-lg-3">
					<div class="row">
						<div class="col col-12">
							<div class="socialicons">
								<a href="#"><span class="icon-facebook"></span></a>
								<a href="#"><span class="icon-twitter"></span></a>
								<a href="#"><span class="icon-instagram"></span></a>
								<a href="#"><span class="icon-youtube"></span></a>
								<a href="#"><span class="icon-linkedin"></span></a>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col col-12">
							<span class="disclaimer">&copy;<?php echo date('Y');?> Out & Equal Wokplace Advocates.<br />
								All Rights Reserved
							</span>
						</div>
					</div>
					<div class="row">
						<div class="col col-12">
							<a href="#">Privacy Policy</a>
						</div>
					</div>
				</div>
			</div><!-- /.row -->
		</div><!-- /.container -->
	</footer><!-- /#footer -->

</div><!-- /#wrapper -->

<?php wp_footer(); ?>

</body>
</html>
