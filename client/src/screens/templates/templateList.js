
const theme1 = [
    {
        primary: '#72859a',
        secondary: '#f7bbc2',
        background: '#f1f4f8',
    },
    {
        primary: '#569173',
        secondary: '#f1c591',
        background: '#ffefd1',
    },
    {
        primary: '#a59bc3',
        secondary: '#f1c591',
        background: '#fff5e0',
    }
];
const theme2 = [
    {
        primary: '#b0dcec',
        secondary: '#FFF',
        background: '#b0dcec',
        index: 0
    },
    {
        primary: '#f3ebde',
        secondary: '#f1c591',
        background: '#f3ebde',
        index: 1
    }
];
const theme3 = [
    {
        primary: '#f3ebde',
        secondary: '#FFF',
        background: '#f3ebde',
        foreground: '#222',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 0,
        withLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        menuBackground: '#f3ebde',
        menuClassName: 'template-3-menu',
        menuItem: '#333',
    },
    {
        primary: '#f8f8f8',
        secondary: '#f1c591',
        background: '#f8f8f8',
        foreground: '#222',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 1,
        footerWithLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        footerAboutStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400,
            fontSize:15,
            color: '#333'
        },
        menuBackground: '#f8f8f8',
        menuClassName: 'template-3-menu',
        menuItem: '#333',
    }
];
const theme4 = [
    {
        primary: '#FFF',
        secondary: '#FFF',
        background: '#FFF',
        foreground: '#2A4470',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 0,
        withLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        menuBackground: '#FFF',
        menuClassName: 'template-3-menu',
        menuItem: '#333',
        headerBackground: '#FFF',
        headerForeground: '#2A4470',
        headerFontSize: 20
    }
];

const theme5 = [
    {
        primary: '#FFF',
        secondary: '#FFF',
        background: '#FFF',
        foreground: '#363639',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 0,
        withLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        menuBackground: '#FFF',
        menuClassName: 'template-3-menu',
        menuItem: '#333',
        headerBackground: '#FFF',
        headerForeground: '#363639',
        headerFontSize: 20
    }
];

const theme6 = [
    {
        primary: '#FFF',
        secondary: '#FFF',
        background: '#FFF',
        foreground: '#363639',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 0,
        withLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        menuBackground: '#FFF',
        menuClassName: 'template-6-menu',
        menuItem: '#333',
        menuFontSize: 20,
        headerBackground: '#FFF',
        headerForeground: '#363639',
        headerFontSize: 20,
        headerHideNames: true,
        headerBurgerSize: 48,
        headerContainerStyles:{
            position: 'fixed',
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            top: 0,
            zIndex: 100
        },
    }
];

const templateList =  [
    {
        name: "Willowmarsh",
        variations: [
            {
                id: 1,
                name: "blue",
                theme: theme1[0]
            },
            {
                id: 2,
                name: "green",
                theme: theme1[1]
            },
            {
                id: 3,
                name: "purple",
                theme: theme1[2]
            }
        ]
    },
    {
        name: "Avabeach",
        variations: [
            {
                id: 4,
                name: "blue",
                theme: theme2[0]
            },
            {
                id: 5,
                name: "cream",
                theme: theme2[1]
            }
        ]
    },
    {
        name: "Classic",
        premium: false,
        variations: [
            {
                id: 6,
                name: "cream",
                theme: theme3[0]
            },
            {
                id: 7,
                name: "grey",
                theme: theme3[1]
            }
        ]
    },
    {
        name: "Floralist",
        premium: false,
        variations: [
            {
                id: 8,
                name: "",
                theme: theme4[0]
            }
        ]
    },
    {
        name: "Tropical",
        premium: false,
        variations: [
            {
                id: 9,
                name: "",
                theme: theme5[0]
            }
        ]
    },
    {
        name: "Sparkle",
        premium: false,
        variations: [
            {
                id: 10,
                name: "",
                theme: theme6[0]
            }
        ]
    }
];

exports.templateList = templateList;