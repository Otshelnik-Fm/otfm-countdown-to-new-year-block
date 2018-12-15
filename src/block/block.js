/*
  OtFm Countdown to New Year block

  ╔═╗╔╦╗╔═╗╔╦╗
  ║ ║ ║ ╠╣ ║║║ https://otshelnik-fm.ru
  ╚═╝ ╩ ╚  ╩ ╩

 */

( function( wp ) {
// I. Set variable
    var el = wp.element.createElement,                      // short record - alias
        RichText          = wp.editor.RichText,             // init rich editor
        InspectorControls = wp.editor.InspectorControls,    // right block sidebar
        ColorPalette = wp.components.ColorPalette,          // colorpicker
        RangeControl = wp.components.RangeControl,          // range slider
        PanelBody    = wp.components.PanelBody,             // block description
        __ = wp.i18n.__;                                    // internalization



// II. Create a block icon
    // see icons https://material.io/tools/icons/
    // and add svg https://wp.zacgordon.com/2017/12/07/how-to-add-custom-icons-to-gutenberg-editor-blocks-in-wordpress/
    var iconCountdown = el('svg', { width: 24, height: 24 },
                            el('path', { d: "M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z" } )
                        );



// III. Register block, and GO!!!
    wp.blocks.registerBlockType( 'otfm/octny-block', {
        
  // 1. General settings
        icon        : iconCountdown,                                        // add svg icon
        title       : __( 'OtFm Countdown to New Year', 'otfm-countdown-to-new-year-block' ),
        description : __( 'Happy New Year!', 'otfm-countdown-to-new-year-block' ),
        category    : 'common',                                             // category of the block.

        supports:{
            multiple: false // use block once time
        },

    // 1.2. Preset attributes
        attributes: {               // necessary for saving block content.
            headerTitle: {
                type: 'string',
                default: __( 'New Year Countdown:', 'otfm-countdown-to-new-year-block' )
            },
            widthCol: {
                type: 'integer',
                default: 100
            },
            colorCol: {
                type: 'string',
                default: '#dd4848'
            }
        },
        
    // 1.3 Search sinonime block
        keywords: [
            'Countdown to New Year',
            'счётчик счетчик нового новый года год',
            'otfm'
        ],
  // END 1. General settings

            // 2. for admin editor
        edit: function( props ) {

          // 2.1 get attributes in 1.2
            var attributes = props.attributes,
                colorCol = props.attributes.colorCol,
                widthCol = props.attributes.widthCol;

            if (typeof colorCol === 'undefined') {
                colorCol = '#dd4848';
            }

                // 2.2 magic? :) no!
            return [
                        // 2.3 right block sidebar
                    el( InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
              
                            // 2.3.1 block description
                        el( PanelBody, {
                                title: __( 'Background color of the countdown counter', 'otfm-countdown-to-new-year-block' ),
                                className: 'octny_count_panel_color',
                                initialOpen: true
                            },
                            
                                // 2.3.2 color settings
                            el( 'p', {}, __( 'Select the color of the countdown counter:', 'otfm-countdown-to-new-year-block' ) ),
                            el( ColorPalette, {
                                label: __( 'Background color of the countdown counter', 'otfm-countdown-to-new-year-block' ),
                                colors: [
                                    {color:"#F5624D",name:"1"},
                                    {color:"#CC231E",name:"2"},
                                    {color:"#34A65F",name:"3"},
                                    {color:"#0F8A5F",name:"4"},
                                    {color:"#235E6F",name:"5"}
                                ],
                                value: colorCol,
                                onChange: function( colColor ) {
                                    props.setAttributes( { colorCol: colColor } );
                                }
                            })
                        ),
                
                            // 2.3.3 range settings
                        el(
                            "div",
                            null,
                            el(RangeControl, {
                                label: __( 'Column width', 'otfm-countdown-to-new-year-block' ),
                                value: attributes.widthCol,
                                min: 80,
                                max: 300,
                                onChange: function( sWidth ) {
                                    props.setAttributes( { widthCol: sWidth } );
                                }
                            })
                        ),
                
                    ),
                    // END 2.3 InspectorControls
           
                        // 2.4 html layout
                    el(
                        "div",
                        { className: "octny_wrapper", style: { opacity: 0 } },
                        el(RichText, { 
                                key: 'editable',
                                tagName: 'div',
                                id: "octny_header",
                                className: 'octny_header_title',
                                value: attributes.headerTitle,
                                keepPlaceholderOnFocus: true,
                                onChange: function( newHeadTitle ) {
                                    props.setAttributes( { headerTitle: newHeadTitle } );
                                }
                           }),
                        el(
                           "div",
                            {
                                className: "octny_container",
                                style: {
                                    backgroundColor: colorCol
                                }
                            },
                            el(
                                "div",
                                {
                                    className: "octny_col",
                                    style: {
                                        minWidth: widthCol
                                    }
                                },
                                el(
                                    "div",
                                    { className: "octny_top_pane" },
                                    el(
                                        "div",
                                        { id: "octny_days", className: "octny_num" },
                                        "00"
                                    )
                                ),
                                el(
                                    "div",
                                    { className: "octny_bottom_pane" },
                                    el(
                                        "div",
                                        { id: "octny_days_text", className: "octny_text" },
                                        __( 'days', 'otfm-countdown-to-new-year-block' )
                                    )
                                )
                            ),
                            el(
                                "div",
                                {
                                    className: "octny_col",
                                    style: {
                                        minWidth: widthCol
                                    }
                                },
                                el(
                                    "div",
                                    { className: "octny_top_pane" },
                                    el(
                                        "div",
                                        { id: "octny_hours", className: "octny_num" },
                                        "00"
                                    )
                                ),
                                el(
                                    "div",
                                    { className: "octny_bottom_pane" },
                                    el(
                                        "div",
                                        { id: "octny_hours_text", className: "octny_text" },
                                        __( 'hours', 'otfm-countdown-to-new-year-block' )
                                    )
                                )
                            ),
                            el(
                                "div",
                                {
                                    className: "octny_col",
                                    style: {
                                        minWidth: widthCol
                                    }
                                },
                                el(
                                    "div",
                                    { className: "octny_top_pane" },
                                    el(
                                        "div",
                                        { id: "octny_mins", className: "octny_num" },
                                        "00"
                                    )
                                ),
                                el(
                                    "div",
                                    { className: "octny_bottom_pane" },
                                    el(
                                        "div",
                                        { id: "octny_mins_text", className: "octny_text" },
                                        __( 'minutes', 'otfm-countdown-to-new-year-block' )
                                    )
                                )
                            ),
                            el(
                                "div",
                                { 
                                    className: "octny_col",
                                    style: {
                                        minWidth: widthCol
                                    }
                                },
                                el(
                                    "div",
                                    { className: "octny_top_pane" },
                                    el(
                                        "div",
                                        { id: "octny_secs", className: "octny_num" },
                                        "00"
                                    )
                                ),
                                el(
                                    "div",
                                    { className: "octny_bottom_pane" },
                                    el(
                                        "div",
                                        { id: "octny_secs_text", className: "octny_text" },
                                        __( 'seconds', 'otfm-countdown-to-new-year-block' )
                                    )
                                )
                            )
                        ),
                        el("div", { id: "octny_info", className: "small" })
                   )
                   // END 2.4 html layout
            ];
        },
        // END 2. for admin editor



        // 3. save admin editor -> into frontend render
        save: function( props ) {
            
                // 3.1 get attributes
            var attributes = props.attributes,
                colorCol = props.attributes.colorCol,
                widthCol = props.attributes.widthCol;

                if (typeof colorCol === 'undefined') {
                    colorCol = '#dd4848';
                }

                // 3.2 html layout
            return (
                    el(
                        "div",
                        { className: "octny_wrapper", style: { opacity: 0 } },
                        el( RichText.Content, {
                            tagName: 'div',
                            id: "octny_header",
                            className: 'octny_header_title',
                            value: attributes.headerTitle
                        }),
                        el(
                            "div",
                            { 
                                className: "octny_container",
                                style: {
                                    backgroundColor: colorCol
                                }
                            },
                            el(
                                "div",
                                {
                                    className: "octny_col",
                                    style: {
                                        minWidth: widthCol
                                    }
                                },
                                el(
                                    "div",
                                    { className: "octny_top_pane" },
                                    el(
                                        "div",
                                        { id: "octny_days", className: "octny_num" },
                                        "00"
                                    )
                                ),
                                el(
                                    "div",
                                    { className: "octny_bottom_pane" },
                                    el(
                                        "div",
                                        { id: "octny_days_text", className: "octny_text" },
                                        __( 'days', 'otfm-countdown-to-new-year-block' )
                                    )
                                )
                            ),
                            el(
                                "div",
                                {
                                   className: "octny_col",
                                   style: {
                                       minWidth: widthCol
                                   }
                                },
                                el(
                                    "div",
                                    { className: "octny_top_pane" },
                                    el(
                                        "div",
                                        { id: "octny_hours", className: "octny_num" },
                                        "00"
                                    )
                                ),
                                el(
                                    "div",
                                    { className: "octny_bottom_pane" },
                                    el(
                                        "div",
                                        { id: "octny_hours_text", className: "octny_text" },
                                        __( 'hours', 'otfm-countdown-to-new-year-block' )
                                    )
                                )
                            ),
                            el(
                                "div",
                                {
                                    className: "octny_col",
                                    style: {
                                        minWidth: widthCol
                                    }
                                },
                                el(
                                    "div",
                                    { className: "octny_top_pane" },
                                    el(
                                        "div",
                                        { id: "octny_mins", className: "octny_num" },
                                        "00"
                                    )
                                ),
                                el(
                                    "div",
                                    { className: "octny_bottom_pane" },
                                    el(
                                        "div",
                                        { id: "octny_mins_text", className: "octny_text" },
                                        __( 'minutes', 'otfm-countdown-to-new-year-block' )
                                    )
                                )
                            ),
                            el(
                                "div",
                                {
                                    className: "octny_col",
                                    style: {
                                        minWidth: widthCol
                                    }
                                },
                                el(
                                    "div",
                                    { className: "octny_top_pane" },
                                    el(
                                        "div",
                                        { id: "octny_secs", className: "octny_num" },
                                        "00"
                                    )
                                ),
                                el(
                                    "div",
                                    { className: "octny_bottom_pane" },
                                    el(
                                        "div",
                                        { id: "octny_secs_text", className: "octny_text" },
                                        __( 'seconds', 'otfm-countdown-to-new-year-block' )
                                    )
                                )
                            )
                        ),
                        el("div", { id: "octny_info", className: "small" })
                   )
            );
            // END 3.2 html layout
        }
    } );

} )(
    window.wp
);
