/** @type {import('tailwindcss').Config} */
export const content = [
  "./public/index.html",            // Include the HTML file
  "./public/scripts/**/*.js",      // Include JavaScript files in the scripts folder
  "./src/**/*.css",               // Include CSS files in the src folder (if you are using input.css)
];
export const theme = {
  extend: {},
};
export const plugins = [];

