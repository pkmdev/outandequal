( function( plugins, editPost, element, components, data, compose, blocks, editor ) {

	const el = element.createElement;

	const { Fragment, Component } = element;
	const { registerPlugin } = plugins;
	const { MediaUpload, MediaUploadCheck } = editor;
	const { PluginSidebar, PluginSidebarMoreMenuItem } = editPost;
	const { Panel, PanelRow, PanelBody, TextControl, TextareaControl, CheckboxControl, Button, Image } = components;
	const { withSelect, withDispatch, useSelect } = data;


	const applyWithSelect = withSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' );

		return {
			meta: getEditedPostAttribute( 'meta' ),
		};
	} );

	const applyWithDispatch = withDispatch( ( dispatch, { meta } ) => {
		const { editPost } = dispatch( 'core/editor' );

		return {
			updateMeta( newMeta ) {
				console.log(newMeta)
				editPost( { meta: { ...meta, ...newMeta } } ); // Important: Old and new meta need to be merged in a non-mutating way!
			},
		};
	} );

	function ImageItem( { id } ) {
	  const image = useSelect( ( select ) => {
	    return select( 'core' ).getMedia( id )
	  }, [ id ] );
		console.log(image);
	  return image ? el('img', {src: image.source_url}) : false
	}

class MyPlugin extends Component {



	render() {
		// Nested object destructuring.
		const {
			meta: {
				oae_partner_url: partnerURL,
				oae_partner_logo: partnerLogo,
			} = {},
			updateMeta,
		} = this.props;


		return el( Fragment, {},
			el( PluginSidebarMoreMenuItem,
				{
					name: 'oae-partners',
					target: 'oae-partners',
					type: 'sidebar',
					icon: 'groups',
				},
				'Partner Settings'
			),
			el( PluginSidebar,
				{
					name: 'oae-partners',
					icon: 'groups',
					title: 'Partner Settings',
				},
				el( Panel , {},
					el( PanelBody, {},
						// Field 1
						el(TextControl,
							{
	              label: 'URL',
	              value: partnerURL,
								onChange: function( value ){
									// value is undefined if color is cleared.
									updateMeta( { oae_partner_url: value || '' } );
								}
	          	}
						)
					)
				),
				el(Panel, {},
					el( PanelBody, {},
						el('h2', {}, 'Partner Logo'),
						el(ImageItem, {
							id: partnerLogo
						}),
						el(MediaUploadCheck, {},
							el(MediaUpload,
								{
									onSelect: function( value ){
										updateMeta( { oae_partner_logo: value.id || '' } );
										},
									type: 'image',
									value: partnerLogo,
									render: function( obj ) {
											return el( Button,
												{
													onClick: obj.open,
													className: 'button'
												},
												'Select Logo'
											)
										}
								},
							)
						)
					)
				)
			)
		)
	}
}

const render =
		applyWithSelect(
	      applyWithDispatch(
	          MyPlugin
	      )
    )

registerPlugin( 'my-plugin', {
	icon: 'art',
	render,
} );


} )(
	window.wp.plugins,
	window.wp.editPost,
	window.wp.element,
	window.wp.components,
	window.wp.data,
	window.wp.compose,
	window.wp.blockEditor,
	window.wp.editor
);
