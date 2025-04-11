const withPWA = require('next-pwa');
module.exports = {
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
    },
    reactStrictMode: false,
    trailingSlash: true,
    env: {
        BACKEND_URL: 'https://befilerbackend-9135r.kinsta.app/'
        
        // process.env.NODE_ENV === 'development' ?
        //     'https://befilerbackend-9135r.kinsta.app/' : 
        //     'http://localhost:5000/'
    },
    images: {
        domains: ['appstick.s3.ap-southeast-1.amazonaws.com','appstick-resources.s3.ap-southeast-1.amazonaws.com'], 
      },
    swcMinify: false
};
