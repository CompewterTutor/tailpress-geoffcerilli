const plugin = require('tailwindcss/plugin')
const _ = require("lodash");

module.exports = {
    purge: [
        './*.php',
        './*/*.php',
    ],
    theme: {
        extend: {},
        tailpress: {
            colors: {
                'primary': '#0EA5E9',
                'secondary': '#14B8A6',
                'dark': '#1F2937',
                'light': '#F9FAFB'
            },
            fontSizes: {
                'small': ['14px'],
                'regular': ['16px'],
                'large': ['18px', 'bold']
            }
        }
    },
    plugins: [
        plugin(function ({ addUtilities, addComponents, e, prefix, config, theme }) {
            const colors = theme('colors');
            const margin = theme('margin');
            const screens = theme('screens');
            const fontSize = theme('fontSize');

            const editorColorText = _.map(theme("tailpress.colors", {}), (value, key) => {
                return {
                    [`.has-${key}-text-color`]: {
                        color: value,
                    },
                };
            });

            const editorColorBackground = _.map(theme("tailpress.colors", {}), (value, key) => {
                return {
                    [`.has-${key}-background-color`]: {
                        backgroundColor: value,
                    },
                };
            });

            const editorFontSizes = _.map(theme("tailpress.fontSizes", {}), (value, key) => {
                return {
                    [`.has-${key}-font-size`]: {
                        fontSize: value[0],
                        fontWeight: `${value[1] || 'normal'}`
                    },
                };
            });

            const alignmentUtilities = {
                '.alignfull': {
                    margin: `${margin[2] || '0.5rem'} calc(50% - 50vw)`,
                    maxWidth: '100vw',
                    "@apply w-screen": {}
                },
                '.alignwide': {
                    "@apply -mx-16 my-2 max-w-screen-xl": {}
                },
                '.alignnone': {
                    "@apply h-auto max-w-full mx-0": {}
                },
                ".aligncenter": {
                    margin: `${margin[2] || '0.5rem'} auto`,
                    "@apply block": {}
                },
                [`@media (min-width: ${screens.sm || '640px'})`]: {
                    '.alignleft:not(.wp-block-button)': {
                        marginRight: margin[2] || '0.5rem',
                        "@apply float-left": {}
                    },
                    '.alignright:not(.wp-block-button)': {
                        marginLeft: margin[2] || '0.5rem',
                        "@apply float-right": {}
                    },
                    ".wp-block-button.alignleft a": {
                        "@apply float-left mr-4": {},
                    },
                    ".wp-block-button.alignright a": {
                        "@apply float-right ml-4": {},
                    },
                },
            };

            const imageCaptions = {
                '.wp-caption': {
                    "@apply inline-block": {},
                    '& img': {
                        marginBottom: margin[2] || '0.5rem',
                        "@apply leading-none": {}
                    },
                },
                '.wp-caption-text': {
                    fontSize: (fontSize.sm && fontSize.sm[0]) || '0.9rem',
                    color: (colors.gray && colors.gray[600]) || '#718096',
                },
            };

            addUtilities([editorColorText, editorColorBackground, alignmentUtilities, editorFontSizes, imageCaptions], {
                respectPrefix: false,
                respectImportant: false,
            });

        }),
    ]
};
