var express = require('express');
var supervillains = require('supervillains');
var app = express();

const TREE_DEPTH = 4;
const MIN_VILLAINS_PER_LEVEL = 2;
const MAX_VILLAINS_PER_LEVEL = 5;

var villains = {};
var curVillainId = 0;

// Returns a whole number bound inclusively by `min` and `max`.
var randomIntFromInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Returns a new random villain.
var randomVillain = function() {
  var index = Math.floor(Math.random() * (supervillains.all.length - 1));
  var villain = supervillains.all[index];
  supervillains.all.splice(index, 1);
  return villain;
};

// Builds a tree of villains.
var buildVillainHierarchy = function(height, depth, parent) {
  if (depth == undefined) {
    depth = 0;
  }

  if (parent == undefined) {
    parent = null;
  }

  // Scale max villains according to depth.
  var depthScale =
    (MAX_VILLAINS_PER_LEVEL - MIN_VILLAINS_PER_LEVEL) * ((height - depth) / height);

  var villainCount = randomIntFromInterval(
    MIN_VILLAINS_PER_LEVEL, MAX_VILLAINS_PER_LEVEL - depthScale
  );

  for (var i = 0; i < villainCount; i++) {
    var villain = {
      id: curVillainId,
      name: randomVillain()
    };
    curVillainId++;

    if (!villains[parent]) {
      villains[parent] = [];
    }
    villains[parent].push(villain);

    if (depth < height - 1) {
      buildVillainHierarchy(height, depth + 1, villain.id);
    }
  }
};

/**/

buildVillainHierarchy(TREE_DEPTH);

app.use(express.static('public'));

// CORS.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function(req, res) {
  res.redirect('/villain-hierarchy');
});

app.get('/villain-hierarchy/:id?', function(req, res) {
  var id = req.params.id || null;
  res.send(villains[id]);
});

app.listen(3000, function() {
  console.log('Super Supervillains Inc. API listening on port 3000!');
});
