/**
 * BLOCK: oae-accordion
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, InspectorControls } = wp.blockEditor;
const { Toolbar, Button, DateTimePicker, TextControl, Tooltip, Panel, PanelBody, PanelRow, FormToggle, SelectControl, FocalPointPicker} = wp.components;
const { source } = wp.blocks;
const { serverSideRender: ServerSideRender } = wp;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

const BACKGROUND_OVERLAY_TYPES = [
  {label: 'Select a Color', value: null, disabled: true },
  {label: 'None', value: false },
  {label: 'Cyan', value: 'cyan'},
  {label: 'Purple', value: 'purple'},
  {label: 'Yellow', value: 'yellow'},
  {label: 'Orange', value: 'orange'},
  {label: 'Red', value: 'red'},
  {label:'Yellow/Orange Gradient', value: 'yellow-orange' },
  {label: 'Purple/Red Gradient', value: 'purple-red'},
  {label: 'Purple/Cyan Gradient', value:'purple-cyan'},
  {label: 'Gray/White Gradient', value:'gray-white'},
  {label: 'Red/Purlple Gradient LTR', value: 'red-purple-ltr'},
];

const COLOR_BLOCK_TEMPLATES = [
  {label: 'Select type', value: 'oae/color-block-placeholder', disabled: true },
  {label: 'Text', value: 'oae/color-block-text'},
]

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

 registerBlockType( 'oae/partners', {
 	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
 	title: __( 'Out & Equal Partners' ), // Block title.
 	icon: 'groups', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
 	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
 	keywords: [
 		__( 'Out & Equal' ),
 		__( 'Partners' )
 	],
  attributes: {
      heading: {
          type: 'string',
          selector: 'h2',
          default: 'Our Partners'
      },
      button: {
          type: 'string',
          selector: 'a',
          default: 'Become a Partner'
      },
      url: {
          type: 'string',
          default: ''
      },
      more: {
          type: 'string',
          default: 'View All'
      },
      moreurl: {
          type: 'string',
          default: ''
      }
    },

 	/**
 	 * The edit function describes the structure of your block in the context of the editor.
 	 * This represents what the editor will render when the block is used.
 	 *
 	 * The "edit" property must be a valid function.
 	 *
 	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 	 *
 	 * @param {Object} props Props.
 	 * @returns {Mixed} JSX Component.
 	 */
 	edit: ( props ) => {
    let heading = props.attributes.heading;
    let more = props.attributes.more;
    let moreurl = props.attributes.moreurl;
    let button = props.attributes.button;
    let url = props.attributes.url;

    function onChangeHeading ( content ) {
        props.setAttributes({heading: content})
    }

    function onChangeMore ( content ) {
        props.setAttributes({more: content})
    }

    function onChangeMoreUrl ( content ) {
        props.setAttributes({moreurl: content})
    }

    function onChangeButton ( content ) {
        props.setAttributes({button: content})
    }

    function onChangeUrl (content) {
        props.setAttributes({url: content})
    }

 		// Creates a <p class='wp-block-cgb-block-oae-accordion'></p>.
    return [
      <InspectorControls>
        <PanelBody title="Button Link" >
          <PanelRow>
          <TextControl
            label="Button URL"
            value={ url }
            onChange={ onChangeUrl }
          />
          </PanelRow>
        </PanelBody>
        <PanelBody title="More Link" >
          <PanelRow>
          <TextControl
            label="More URL"
            value={ moreurl }
            onChange={ onChangeMoreUrl }
          />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,
      <div className={ props.className} >
        <div className={'inner-content'}>
          <RichText
              tagName="h2"
              onChange={ onChangeHeading }
              value={ heading }
              placeholder="Heading"
          />
          <div className={'col-left'}>
            <div className={'placeholder'}></div>
          </div>
          <div className={'col-right'}>
            <RichText
                tagName="span"
                onChange={ onChangeMore }
                value={ more }
                placeholder="More"
            />
          </div>
          <RichText
              tagName="span"
              onChange={ onChangeButton }
              value={ button }
              placeholder="Become A Partner"
              className={['oae-button cyan-button']}
          />
        </div>
      </div>
    ];
  },
  save: ( props ) => {
    return (
      <div className={'inner-content'} >
        <RichText.Content tagName="h2" value={ props.attributes.heading } />

        <RichText.Content tagName="a" className={'accordion-button'} value={ props.attributes.button } href={props.attributes.url} />
      </div>
    )
},
 } );

registerBlockType( 'oae/accordion', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Out & Equal Accordion' ), // Block title.
	icon: 'images-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Accordion' )
	],


	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		// Creates a <p class='wp-block-cgb-block-oae-accordion'></p>.
		return (
			<div>
        <InnerBlocks allowedBlocks={['oae/accordion-slide']} />
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div { ...props } className={ 'alignfull' }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'oae/color-blocks-container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Color Blocks' ), // Block title.
	icon: 'admin-page', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Color Blocks' )
	],


	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		// Creates a <p class='wp-block-cgb-block-oae-accordion'></p>.
		return (
			<div className={props.className}>
        <InnerBlocks allowedBlocks={['oae/color-block']} templateLock={'all'} template={[['oae/color-block',{}],['oae/color-block',{}]]}/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div { ...props } className={ 'alignfull' }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'oae/color-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Color Block' ),
  parent: [ 'oae/color-blocks-container' ], // Block title.
	icon: 'admin-page', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Color Block' )
	],
  attributes: {
    blocktype: {
      type: 'string',
      default: 'oae/color-block-placeholder'
    },
    fill: {
        type: 'string',
        default: ''
    }
  },



	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {

    let fill = props.attributes.fill;
    let blocktype = props.attributes.blocktype;

    //var template = [];

    function onChangeFill ( content ) {
        props.setAttributes({fill: content})
    }
    function onChangeType ( content ) {
        props.setAttributes({blocktype: content})
    }
    var template = [];
    if (blocktype != '') {
      template.push([blocktype, {}]);
    }
    console.log(template);
		// Creates a <p class='wp-block-cgb-block-oae-accordion'></p>.
		return [
      <InspectorControls>
        <PanelBody title="Content type" >
          <PanelRow>
            <SelectControl
              label="Content type"
              value={ blocktype }
              options={COLOR_BLOCK_TEMPLATES}
              onChange={ onChangeType }
              />
          </PanelRow>
        </PanelBody>
        <PanelBody title="Background Color" >
          <PanelRow>
            <SelectControl
              label="Fill Color"
              value={ fill }
              options={BACKGROUND_OVERLAY_TYPES}
              onChange={ onChangeFill }
              />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,
			<div { ...props } className={ props.className + (fill ? ' overlay ' : '') + (fill ? fill : '') }>
        <InnerBlocks templateLock={'all'} template={template} />
			</div>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
    let fill = props.attributes.fill;
		return (
			<div className={ props.className + (fill ? ' overlay ' : '') + (fill ? fill : '') }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'oae/color-block-placeholder', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Color Block Text' ),
  parent: [ 'oae/color-block' ], // Block title.
	icon: 'admin-page', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Color Block' )
	],



	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {

		// Creates a <p class='wp-block-cgb-block-oae-accordion'></p>.
		return [
			<div className={ props.className }>
        <h2>Select the content type in the sidebar</h2>
			</div>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div { ...props } className={ props.className + ' oae-color-block-inner'}>
			</div>
		);
	},
} );

registerBlockType( 'oae/color-block-text', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Color Block Text' ),
  parent: [ 'oae/color-block' ], // Block title.
	icon: 'admin-page', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Color Block' )
	],
  attributes: {
    heading: {
        source: 'children',
        selector: 'h2',
    },
    text: {
        source: 'children',
        selector: 'p',
    },
  },



	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {

    let heading = props.attributes.heading;
    let text = props.attributes.text;

    function onChangeHeading ( content ) {
      props.setAttributes({heading: content})
    }

    function onChangeText ( content ) {
      props.setAttributes({text: content})
    }
		// Creates a <p class='wp-block-cgb-block-oae-accordion'></p>.
		return [
			<div className={ props.className }>
        <RichText
            tagName="h2"
            onChange={ onChangeHeading }
            value={ heading }
            placeholder="Heading"
        />
        <RichText
            tagName="p"
            onChange={ onChangeText }
            value={ text }
            placeholder="Text"
        />
			</div>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div { ...props } className={ props.className + ' oae-color-block-inner'}>
        <RichText.Content tagName="h2" value={ props.attributes.heading } />
        <RichText.Content tagName="p" value={ props.attributes.text } />
			</div>
		);
	},
} );

registerBlockType( 'oae/accordion-slide', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Accordion Slide' ), // Block title.
  parent: [ 'oae/accordion' ],
	icon: 'format-image', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Accordion' ),
    __( 'Inner Block' ),
    __( 'Slide' )
	],
  attributes: {
      heading: {
          source: 'children',
          selector: 'h2',
      },
      subheading: {
          source: 'children',
          selector: 'h3',
      },
      content: {
          source: 'children',
          selector: 'p',
      },
      button: {
          source: 'children',
          selector: 'a',
      },
      alignment: {
          type: 'string',
          default: 'none',
      },
      background: {
          type: 'object',
          default: null,
      },
      overlay: {
          type: 'string',
          default: false,
      },
      focalPoint: {
          type: 'object',
          default: {
            x: '.5',
            y: '.5'
          }
      },
      url: {
          type: 'string',
          default: ''
      }
    },
    edit: ( props ) => {
        let heading = props.attributes.heading;
        let subheading = props.attributes.subheading;
        let content = props.attributes.content;
        let button = props.attributes.button;
        let alignment = props.attributes.alignment;
        let background = props.attributes.background;
        let overlay = props.attributes.overlay;
        let focalPoint = props.attributes.focalPoint

        let bgimg = (props.attributes.background ? props.attributes.background.sizes.accordionbg.url : null);
        let url = props.attributes.url;

        function onChangeHeading ( content ) {
            props.setAttributes({heading: content})
        }

        function onChangeSubHeading ( content ) {
            props.setAttributes({subheading: content})
        }

        function onChangeContent ( content ) {
            props.setAttributes({content: content})
        }

        function onChangeButton ( content ) {
            props.setAttributes({button: content})
        }

        function onChangeAlignment ( content ) {
            props.setAttributes({alignment: content})
        }
        function onSelectBackground( content ) {
            console.log(content)
            props.setAttributes({background: content })
        }
        function clearBackgroundImage( content ) {
            props.setAttributes({background: null })
        }
        function onChangeOverlay ( content ) {
            props.setAttributes({overlay: content})
        }
        function onChangeFocalPoint (content) {
            props.setAttributes({focalPoint: content})
        }
        function onChangeUrl (content) {
            props.setAttributes({url: content})
        }


        return [
          <InspectorControls>
            <PanelBody title="Background Image" >
              <PanelRow>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={ onSelectBackground }
                    allowedTypes={ ALLOWED_MEDIA_TYPES }
                    value={ background }
                    render={ ( { open } ) => (
                      <Button
                        className={'button'}
                        onClick={ open }>
                        Select Image
                      </Button>
                    ) }
                  />
                </MediaUploadCheck>
                <MediaUploadCheck>
                  <Button
                    className={'button'}
                    onClick={ clearBackgroundImage }>
                    Clear Image
                  </Button>
                </MediaUploadCheck>
              </PanelRow>
              <PanelRow>
                <FocalPointPicker
                  label="Image Focal Point"
                  url={ (background ? background.sizes.accordionbg.url : '') }
                  dimensions={ {
                  		width: 'auto',
                  		height: 'auto'
                  	} }
                  value={ focalPoint }
                  onChange={ onChangeFocalPoint }
                />
              </PanelRow>
              <PanelRow>
                <SelectControl
                  label="Overlay Color"
                  value={ overlay }
                  options={BACKGROUND_OVERLAY_TYPES}
                  onChange={ onChangeOverlay }
              />
              </PanelRow>
            </PanelBody>
            <PanelBody title="Link" >
              <PanelRow>
              <TextControl
                label="Button URL"
                value={ url }
                onChange={ onChangeUrl }
              />
              </PanelRow>
            </PanelBody>
          </InspectorControls>,
          <div
            className={ props.className + (overlay ? ' overlay ' : '') + (overlay ? overlay : '') }
            style={{
                backgroundImage: `url(${bgimg})`,
                backgroundPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`
            }}>
            <div className={'inner-content'}>
              <RichText
                  tagName="h2"
                  onChange={ onChangeHeading }
                  value={ heading }
                  placeholder="Heading"
              />
              <RichText
                  tagName="h3"
                  onChange={ onChangeSubHeading }
                  value={ subheading }
                  placeholder="Sub Heading Text"
              />
              <RichText
                  tagName="p"
                  onChange={ onChangeContent }
                  value={ content }
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <RichText
                  tagName="span"
                  onChange={ onChangeButton }
                  value={ button }
                  placeholder="More"
                  className={['accordion-button']}
              />
            </div>
          </div>
        ];
    },
    save: ( props ) => {
        let bgimg = (props.attributes.background ? props.attributes.background.sizes.accordionbg.url : null);
        return (
          <div { ...props } className={(bgimg ? ' hasbg ' : '')+ (props.attributes.overlay ? ' overlay ' : '')+(props.attributes.overlay ? props.attributes.overlay : '') } style={{
                backgroundImage: `url(${bgimg})`,
                backgroundPosition: `${ props.attributes.focalPoint.x * 100 }% ${ props.attributes.focalPoint.y * 100 }%`
            }}>
            <div className={'inner-content'} >
              <RichText.Content tagName="h2" value={ props.attributes.heading } />
              <RichText.Content tagName="h3" value={ props.attributes.subheading } />
      				<RichText.Content tagName="p" value={ props.attributes.content } />
              <RichText.Content tagName="a" className={'accordion-button'} value={ props.attributes.button } href={props.attributes.url} />
            </div>
    			</div>
        )
    },
} );

registerBlockType( 'oae/header', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Home Header Panel' ), // Block title.
	icon: 'tide', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Header' ),
	],
  attributes: {
      background: {
          type: 'object',
          default: null,
      },
      overlay: {
          type: 'string',
          default: false,
      },
      img: {
          type: 'array',
          default: [],
      },
    },
    edit: ( props ) => {
        let background = props.attributes.background;
        let overlay = props.attributes.overlay;
        let img = props.attributes.img;
        let bgimg = (props.attributes.background ? props.attributes.background.sizes.accordionbg.url : null);
        let sideimg = []
        let sideimgids = []
        if (props.attributes.img.length > 0) {
          props.attributes.img.forEach(function(image) {
            sideimg.push(image.url)
            sideimgids.push(image.id);
          })
        }

        function onSelectBackground( content ) {
            console.log(content)
            props.setAttributes({background: content })
        }
        function clearBackgroundImage( content ) {
            props.setAttributes({background: null })
        }
        function onChangeOverlay ( content ) {
            props.setAttributes({overlay: content})
        }
        function onSelectImg ( content ) {
            props.setAttributes({img: [...content]});
        }
        function clearImage( content ) {
            props.setAttributes({img: [] })
        }

        return [
          <InspectorControls>
            <PanelBody title="Background Image" >
              <PanelRow>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={ onSelectBackground }
                    allowedTypes={ ALLOWED_MEDIA_TYPES }
                    value={ background }
                    render={ ( { open } ) => (
                      <Button
                        className={'button'}
                        onClick={ open }>
                        Select Background
                      </Button>
                    ) }
                  />
                </MediaUploadCheck>
                <MediaUploadCheck>
                  <Button
                    className={'button'}
                    onClick={ clearBackgroundImage }>
                    Clear Image
                  </Button>
                </MediaUploadCheck>
              </PanelRow>
              <PanelRow>
                <SelectControl
                  label="Overlay Color"
                  value={ overlay }
                  options={BACKGROUND_OVERLAY_TYPES}
                  onChange={ onChangeOverlay }
              />
              </PanelRow>
            </PanelBody>
            <PanelBody title="Header Cycle Images" >
              <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={ onSelectImg }
                  allowedTypes={ ALLOWED_MEDIA_TYPES }
                  multiple={true}
                  value={ sideimgids }
                  render={ ( { open } ) => (
                    <Button
                      className={'button'}
                      onClick={ open }>
                      Select Images
                    </Button>
                  ) }
                />
              </MediaUploadCheck>
              <MediaUploadCheck>
                <Button
                  className={'button'}
                  onClick={ clearImage }>
                  Clear All Images
                </Button>
              </MediaUploadCheck>
              </PanelRow>
            </PanelBody>
          </InspectorControls>,
          <div className={props.className + (bgimg ? ' hasbg ' : '') +  (props.attributes.overlay ? ' overlay ' : '')+(props.attributes.overlay ? props.attributes.overlay : '') } style={{
                backgroundImage: `url(${bgimg})`
              }}>
                  <div className={''}>
                    <InnerBlocks />
                  </div>
                  <div style={{
                    zIndex: `1`,
                  }}>{(sideimg.length > 0 ?
                    <img className={'cycle-fade-img'} src={sideimg[0]} />
                  : '' )}
                  {(sideimg.length > 0 ?
                    <h4 style={{
                      textAlign: `center`,
                    }}>{sideimg.length} Images in Rotation</h4>
                  : '' )}
                  </div>
            </div>
        ];
    },
    save: ( props ) => {

        let bgimg = (props.attributes.background ? props.attributes.background.sizes.accordionbg.url : null);
        let sideimg = []
        if (props.attributes.img.length > 0) {
          props.attributes.img.forEach(function(image) {
            sideimg.push(image.url)
          })
        }

        return (
          <div className={'alignfull '+ (bgimg ? ' hasbg ' : '') + (props.attributes.overlay ? ' overlay ' : '')+(props.attributes.overlay ? props.attributes.overlay : '') } style={{
                backgroundImage: `url(${bgimg})`
              }}>
              <div className={'container'}>
                <div className={'row'}>
                  <div className={'col col-lg-7 header-text'}>
                    <InnerBlocks.Content />
                  </div>
                  <div className={'col col-lg-5 header-img'}>
                    <div className={'img-container'}>
                      {sideimg.map( (image) => {
                            return (
                            <img className={'cycle-fade-img'} src={image} />
                            )
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    },
} );

registerBlockType( 'oae/page-header', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Page Header' ), // Block title.
	icon: 'tide', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Page Header' ),
	],
  attributes: {
      background: {
          type: 'object',
          default: null,
      },
      overlay: {
          type: 'string',
          default: false,
      },
      title: {
          type: 'string',
          default: null,
      },
      focalPoint: {
          type: 'object',
          default: {
            x: '.5',
            y: '.5'
          }
      },
    },
    edit: ( props ) => {
        let background = props.attributes.background;
        let overlay = props.attributes.overlay;
        let title = props.attributes.title;
        let focalPoint = props.attributes.focalPoint
        let bgimg = (props.attributes.background ? props.attributes.background.sizes.accordionbg.url : null);

        function onSelectBackground( content ) {
            console.log(content)
            props.setAttributes({background: content })
        }
        function clearBackgroundImage( content ) {
            props.setAttributes({background: null })
        }
        function onChangeOverlay ( content ) {
            props.setAttributes({overlay: content})
        }
        function onChangeFocalPoint (content) {
            props.setAttributes({focalPoint: content})
        }
        function onChangeTitle ( content ) {
            props.setAttributes({title: content})
        }

        return [
          <InspectorControls>
            <PanelBody title="Background Image" >
              <PanelRow>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={ onSelectBackground }
                    allowedTypes={ ALLOWED_MEDIA_TYPES }
                    value={ background }
                    render={ ( { open } ) => (
                      <Button
                        className={'button'}
                        onClick={ open }>
                        Select Background
                      </Button>
                    ) }
                  />
                </MediaUploadCheck>
                <MediaUploadCheck>
                  <Button
                    className={'button'}
                    onClick={ clearBackgroundImage }>
                    Clear Image
                  </Button>
                </MediaUploadCheck>
              </PanelRow>
              <PanelRow>
                <FocalPointPicker
                  label="Image Focal Point"
                  url={ (background ? background.sizes.accordionbg.url : '') }
                  dimensions={ {
                  		width: 'auto',
                  		height: 'auto'
                  	} }
                  value={ focalPoint }
                  onChange={ onChangeFocalPoint }
                />
              </PanelRow>
              <PanelRow>
                <SelectControl
                  label="Overlay Color"
                  value={ overlay }
                  options={BACKGROUND_OVERLAY_TYPES}
                  onChange={ onChangeOverlay }
              />
              </PanelRow>
            </PanelBody>
          </InspectorControls>,
          <div className={props.className + (bgimg ? ' hasbg ' : '') +  (props.attributes.overlay ? ' overlay ' : '')+(props.attributes.overlay ? props.attributes.overlay : '') } style={{
              backgroundImage: `url(${bgimg})`,
              backgroundPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`
            }}>
              <RichText
                  tagName="h1"
                  onChange={ onChangeTitle }
                  value={ title }
                  placeholder="Page Title"
                  className={''}
              />
            </div>
        ];
    },
    save: ( props ) => {

        let bgimg = (props.attributes.background ? props.attributes.background.sizes.accordionbg.url : null);

        return (
          <div className={'alignfull ' + (bgimg ? ' hasbg ' : '') + (props.attributes.overlay ? ' overlay ' : '')+(props.attributes.overlay ? props.attributes.overlay : '') }
            style={{
              backgroundImage: `url(${bgimg})`,
              backgroundPosition: `${ props.attributes.focalPoint.x * 100 }% ${ props.attributes.focalPoint.y * 100 }%`
            }}>
              <div className={'container'}>
                <div className={'row'}>
                  <div className={'col col-lg-12 header-text'}>
                    <RichText.Content tagName="h1" className={''} value={ props.attributes.title } />
                  </div>
                </div>
              </div>
            </div>
        )
    },
} );

registerBlockType( 'oae/countdown', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Countdown Panel' ), // Block title.
	icon: 'clock', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Count Down' ),
	],
  attributes: {
      heading: {
          source: 'children',
          selector: 'h2',
      },
      background: {
          type: 'object',
          default: null,
      },
      overlay: {
          type: 'string',
          default: false,
      },
      date: {
          type: 'string',
          default: new Date(),
      },
      countdown: {
        type: 'object',
        default: {
          d: 0,
          h: 0,
          m: 0,
          s: 0
        }
      }
    },
    edit: ( props ) => {
        let heading = props.attributes.heading;
        let background = props.attributes.background;
        let overlay = props.attributes.overlay;
        let date = props.attributes.date;
        let countdown = props.attributes.countdown;

        let bgimg = (props.attributes.background ? props.attributes.background.sizes.accordionbg.url : null);

        function onChangeHeading ( content ) {
            props.setAttributes({heading: content})
        }

        function onSelectBackground( content ) {
            console.log(content)
            props.setAttributes({background: content })
        }
        function clearImage( content ) {
            props.setAttributes({background: null })
        }
        function onChangeOverlay ( content ) {
            props.setAttributes({overlay: content})
        }
        function onChangeDate ( content ) {
            console.log(typeof content);
            props.setAttributes({date: content})
        }

        countdown = getDateCount(date);

        return [
          <InspectorControls>
            <PanelBody title="Background Image" >
              <PanelRow>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={ onSelectBackground }
                    allowedTypes={ ALLOWED_MEDIA_TYPES }
                    value={ background }
                    render={ ( { open } ) => (
                      <Button
                        className={'button'}
                        onClick={ open }>
                        Select Image
                      </Button>
                    ) }
                  />
                </MediaUploadCheck>
                <MediaUploadCheck>
                  <Button
                    className={'button'}
                    onClick={ clearImage }>
                    Clear Image
                  </Button>
                </MediaUploadCheck>
              </PanelRow>
              <PanelRow>
                <SelectControl
                  label="Overlay Color"
                  value={ overlay }
                  options={BACKGROUND_OVERLAY_TYPES}
                  onChange={ onChangeOverlay }
              />
              </PanelRow>
            </PanelBody>
            <PanelBody title="Countdown Date" >
              <PanelRow>
              <DateTimePicker
                currentDate={ date }
                onChange={ onChangeDate }
              />
              </PanelRow>
            </PanelBody>
          </InspectorControls>,
          <div className={props.className + (bgimg ? ' hasbg ' : '') + (props.attributes.overlay ? ' overlay ' : '')+(props.attributes.overlay ? props.attributes.overlay : '') } style={{
                backgroundImage: `url(${bgimg})`
              }}>
              <div className={'inner-content'}>
                <RichText
                    tagName="h2"
                    onChange={ onChangeHeading }
                    value={ heading }
                    placeholder="Heading"
                    style={{textAlign: 'center'}}
                />
                <div className={'button-container row'}>
                  <div className={'col col-lg-2'}></div>
                  <div className={'col col-lg-8'}>
                    <InnerBlocks allowedBlocks={['oae/button']} />
                  </div>
                  <div className={'col col-lg-2'}></div>
                </div>
                <ul class="oae-countdown">
                  <li><span class="oae-countdown-number oae-countdown-days">{countdown.d}</span><span class="oae-countdown-title">Days</span></li>
                  <li><span class="oae-countdown-number oae-countdown-hours">{countdown.h}</span><span class="oae-countdown-title">Hours</span></li>
                  <li><span class="oae-countdown-number oae-countdown-minutes">{countdown.m}</span><span class="oae-countdown-title">Minutes</span></li>
                  <li><span class="oae-countdown-number oae-countdown-seconds">{countdown.s}</span><span class="oae-countdown-title">Seconds</span></li>
                </ul>
              </div>
          </div>
        ];
    },
    save: ( props ) => {
        var countdown = props.attributes.countdown;
        let bgimg = (props.attributes.background ? props.attributes.background.sizes.accordionbg.url : null);
        return (
          <div { ...props } className={'alignfull'+ (bgimg ? ' hasbg ' : '')+(props.attributes.overlay ? ' overlay ' : '')+(props.attributes.overlay ? props.attributes.overlay : '') } style={{
                backgroundImage: `url(${bgimg})`
              }}>
              <div className={'container inner-content'} >
                <RichText.Content tagName="h2" value={ props.attributes.heading } style={{textAlign: 'center'}}/>
                <div className={'row'}>
                  <div className={'col col-lg-1'}></div>
                  <div className={'col col-lg-10 button-container'}>
                    <InnerBlocks.Content />
                  </div>
                  <div className={'col col-lg-1'}></div>
                </div>
                <div className={'row'}>
                  <div className={'col col-lg-12'}>
                    <ul class="oae-countdown" data-countdown={props.attributes.date}>
                      <li><span class="oae-countdown-number oae-countdown-days">{countdown.d}</span><span class="oae-countdown-title">Days</span></li>
                      <li><span class="oae-countdown-number oae-countdown-hours">{countdown.h}</span><span class="oae-countdown-title">Hours</span></li>
                      <li><span class="oae-countdown-number oae-countdown-minutes">{countdown.m}</span><span class="oae-countdown-title">Minutes</span></li>
                      <li><span class="oae-countdown-number oae-countdown-seconds">{countdown.s}</span><span class="oae-countdown-title">Seconds</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        )
    },
} );

registerBlockType( 'oae/button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Basic Button' ), // Block title.
	icon: 'editor-removeformatting', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  parent: [ 'oae/countdown' ],
  category: 'oae', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Out & Equal' ),
		__( 'Button' ),
	],
  attributes: {
      text: {
          source: 'children',
          selector: 'a',
      },
      url: {
          type: 'string',
          default: null,
      },
    },
    edit: ( props ) => {
        let text = props.attributes.text;
        let url = props.attributes.url;

        function onChangeText ( content ) {
            props.setAttributes({text: content})
        }

        function onChangeUrl( content ) {
            props.setAttributes({url: content })
        }

        return [
          <InspectorControls>
            <PanelBody title="Link" >
              <PanelRow>
              <TextControl
                label="Button URL"
                value={ url }
                onChange={ onChangeUrl }
              />
              </PanelRow>
            </PanelBody>
          </InspectorControls>,
          <RichText
              tagName="span"
              onChange={ onChangeText }
              value={ text }
              placeholder="Button Text"
              className={'oae-button'}
          />
        ];
    },
    save: ( props ) => {
        return (
            <RichText.Content tagName="a" className={'oae-button'} value={ props.attributes.text } href={props.attributes.url} />
        )
    },
} );

function getDateCount(date) {

  // Get today's date and time
  var target = new Date(date);
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = target - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // If the count down is finished, write some text
  if (distance < 0) {
    return {
      d: 0,
      h: 0,
      m: 0,
      s: 0
    }
  }

  return {
    d: days,
    h: hours,
    m: minutes,
    s: seconds
  }
}
