// next-i18next.config.js
const path = require('path');

module.exports = {
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
        localePath: path.resolve('./public/locales'), // Path to translation files
    },
    react: { useSuspense: false },
};
