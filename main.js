// Sketch on page
var COLOURS = [ '#E3EB64', '#A7EBCA', '#D8EBA7', '#D391FA' ];
var item = COLOURS[Math.floor(Math.random()*COLOURS.length)];
var radius = 0;

Sketch.create({

    container: document.getElementById( 'container' ),
    autoclear: false,
    retina: 'auto',

    setup: function() {
        console.log( 'setup' );
    },

    update: function() {
        radius = 2 + abs( sin( this.millis * 0.003 ) * 50 );
    },

    // Event handlers

    keydown: function() {
        if ( this.keys.C ) this.clear();
    },

    touchmove: function() {

        for ( var i = this.touches.length - 1, touch; i >= 0; i-- ) {

            touch = this.touches[i];

            this.lineCap = 'round';
            this.lineJoin = 'round';
            this.fillStyle = this.strokeStyle = item;
            this.lineWidth = radius;

            this.beginPath();
            this.moveTo( touch.ox, touch.oy );
            this.lineTo( touch.x, touch.y );
            this.stroke();
        }
    }
});

// Pretty Underlines
// VARIABLES
const magicalUnderlines = Array.from(document.querySelectorAll('.underline--magical'));

const gradientAPI = 'https://gist.githubusercontent.com/wking-io/3e116c0e5675c8bcad8b5a6dc6ca5344/raw/4e783ce3ad0bcd98811c6531e40256b8feeb8fc8/gradient.json';

// HELPER FUNCTIONS

// 1. Get random number in range. Used to get random index from array.
const randNumInRange = max => Math.floor(Math.random() * (max - 1));

// 2. Merge two separate array values at the same index to 
// be the same value in new array.
const mergeArrays = (arrOne, arrTwo) => arrOne
.map((item, i) => `${item} ${arrTwo[i]}`)
.join(', ');

// 3. Curried function to add a background to array of elms
const addBackground = (elms) => (color) => {
elms.forEach(el => {
    el.style.backgroundImage = color;
});
}
// 4. Function to get data from API
const getData = async(url) => {
const response = await fetch(url);
const data = await response.json();
return data.data;
}

// 5. Partial Application of addBackground to always apply 
// background to the magicalUnderlines constant
const addBackgroundToUnderlines = addBackground(magicalUnderlines);

// GRADIENT FUNCTIONS

// 1. Build CSS formatted linear-gradient from API data
const buildGradient = (obj) => `linear-gradient(${obj.direction}, ${mergeArrays(obj.colors, obj.positions)})`;

// 2. Get single gradient from data pulled in array and
// apply single gradient to a callback function
const applyGradient = async(url, callback) => {
const data = await getData(url);
const gradient = buildGradient(data[randNumInRange(data.length)]);
callback(gradient);
}

// RESULT
applyGradient(gradientAPI, addBackgroundToUnderlines);

