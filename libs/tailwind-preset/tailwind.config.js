module.exports = {
    theme: {
        screens: {
            'sm': '576px',
            // => @media (min-width: 576px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1400px',
            // => @media (min-width: 1400px) { ... }

            'xl': '1536px',
            // => @media (min-width: 1536px { ... }

            '2xl': '1920px',
            // => @media (min-width: 1920px) { ... }
        },
        colors: {
            primary: {
                light: 'var(--primary-light)',
                DEFAULT: 'var(--primary)',
                dark: 'var(--primary-dark)'
            },
            secondary: {
                light: 'var(--secondary-light)',
                DEFAULT: 'var(--secondary)',
                dark: 'var(--secondary-dark)'
            },
            'gray-light': 'var(--gray-light)',
            'gray': 'var(--gray)',
            'gray-dark': 'var(--gray-dark)',
            white: 'var(--white)',
            black: 'var(--black)',
            red: 'var(--red)',
            green: 'var(--green)',
            orange: 'var(--orange)',
            violet: 'var(--violet)',
            tahiti: {
                100: 'var(--actions)',
                200: 'var(--border-buttons)',
                300: 'var(--line-list)',
                400: 'var(--bg)',
                500: 'var(--hover-list)',
            }
        },
        spacing: {
            '1': 'var(--spacing-xsm)',
            '2': 'var(--spacing-sm)',
            '3': 'var(--spacing-lsm)',
            '4': 'var(--spacing-smd)',
            '5': 'var(--spacing-md)',
            '6': 'var(--spacing-lmd)',
            '7': 'var(--spacing-lg)',
            '8': 'var(--spacing-xl)',
        },
        fontFamily: {
            sans: ['Inter, sans-serif'],
        },
        fontSize: {
            sm: ['13px', '16px'],
            base: ['16px', '20px'],
            lg: ['20px', '24px'],
            xl: ['24px', '32px'],
        }
    },
    plugins: []
};
