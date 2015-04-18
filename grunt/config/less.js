// grunt/config/less.js

module.exports = {
  less: {
    development: {
      options: {
        compress: true,
        yuicompress: true,
        optimization: 2
      },
      files: {
        "./public/css/styles.css": "./src/less/styles.less" // destination file and source file
      }
    }
  },
};
