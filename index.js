m = ["0 100","0 0","20 0","50 30","80 0","100 0","100 100","80 100","80 30","50 60","20 30","20 100"];
a = ["0 100","40 0","60 0","100 100","80 100","60 60","40 60","20 100"];
l =  ["0 100","0 0","20 0","20 80","80 80","80 100"];
h= ["10 100 ","10 0 ","30 0 ","30 40 ","70 40 ","70 0 ","90 0 "," 90 100 ","70 100 ","70 60 ","30 60 ","30 100"];
e = ["10 100","10 0","70 0","70 20","30 20","30 40","70 40","70 60","30 60","30 80","70 80","70 100"];
i = ["20 100","20 80","40 80","40 20","20 20","20 0","80 0","80 20","60 20","60 80","80 80","80 100"];
c = ["20 100","20 0","80 0","80 20","40 20","40 80","80 80","80 100"];
d = ["20 100","20 0","80 0","90 20","40 20","40 80","70 80","70 20","90 20","90 80","80 100","80 100"]
f = ["20 100","20 0","80 0","80 20","40 20","40 20","40 40","80 40","80 60","40 60","40 100"]
g= ["20 100","20 0","80 0","80 20","40 20","40 80","60 80","60 60","50 60","50 40","80 40","80 60","80 60","80 100"]
j = ["20 100","20 80","40 80","40 20","20 20","20 0","80 0","80 20","60 20","60 100"]
k = ["20 100","20 0","40 0","40 40","60 0","80 0","55 50","80 100","60 100","40 60","40 100"]
n = ["10 100","10 0","30 0","60 70","60 0","80 0","80 100","60 100","30 40","30 100"]
p= ["20 100","20 0","80 0","80 20","40 20","40 20","40 40","60 40","60 20","80 20","80 60","40 60","40 100"]
var letters = [p,p, j,j,n,n, g,g,k,k, f,f ,m, m, d, d, h, h, c, c];

m_points = m.map(function(item) {
  return item.split(" ");
});

a_points = a.map(function(item) {
  return item.split(" ");
});


l_points = l.map(function(item) {
  return item.split(" ");
});

function createPath ( points ) {
  return "M" + points.join("L ") + " Z";
}


function maxPointsInAllLetters ( letters ) {
  return letters.reduce( function ( ret, letter ) {
     return Math.max( ret, letter.length);
  }, 0);
}

function createAnimate ( letters ) {
  var result = letters.map( function( letter ) {
    return createPath(letter);
  });
  result.push(result[0]);
  return '<animate dur="' + letters.length + 's" repeatCount="indefinite" attributeName="d" values="' + result.join(';') +  '"/>';
}


function init () {

  var pathsToAppend = letters.map( function ( letter ) {
    return '<path d="' + createPath(letter) + '" stroke="#808600" stroke-width="0" stroke-linecap="round" fill="#1EB287">';
  });
  pathsToAppend.push( pathsToAppend[0] + createAnimate( letters ));

  // pathsToAppend.forEach( function ( element ) {
  //   $('#svgcontainer').append('<svg>' + element + '</svg>');
  // });

  var maxLetters = maxPointsInAllLetters(letters);

  for (var i = 0; i < letters.length; i++ ) {

    if ( letters[i].length < maxLetters) {
      console.log( letters[i][0].split(" ")[1]);
      extraPoints = maxLetters - letters[i].length;

      var startX = parseInt(letters[i][0].split(" ")[0],10);
      var startY = parseInt(letters[i][0].split(" ")[1],10);

      var endX = parseInt(letters[i][letters[i].length - 1].split(" ")[0],10);
      var endY = parseInt(letters[i][letters[i].length - 1].split(" ")[1],10);
      console.log('endY', endY);
      var toAdd = [];
      for ( var j = 0; j < extraPoints ; j++) {
        x = startX + (endX - startX) / (extraPoints + 1) * j;
        y = startY + (endY - startY) / (extraPoints + 1) * j;

        toAdd.push([x,y].join(" "));
      }
      letters[i] = letters[i].concat(toAdd);
    }
  }
  console.log(letters)
  pathsToAppend = letters.map( function ( letter ) {
    return '<path d="' + createPath(letter) + '" stroke="#808600" stroke-width="0" stroke-linecap="round" fill="#1EB287">';
  });
  pathsToAppend.push( pathsToAppend[0] + createAnimate( letters ));

  pathsToAppend.forEach( function ( element ) {
    $('#svgcontainer').append('<svg>' + element + '</svg>');
  });

}

init();





// <animate dur="5s" repeatCount="indefinite" attributeName="d" values="M20 20 L-20 20 L-20 -20 L20 -20 Z; M1 1 L-1 -1 L1 -1 L1 -1 Z; M0 20 L-20 -20 L0 -20 L20 -20 Z; M1 1 L-1 -1 L1 -1 L1 -1 Z; M20 20 L-20 20 L-20 -20 L20 -20 Z"/>


// <path d="M0 100 L0 0 L20 0 L50 30 L80 0 L100 0 L100 100 L 80 100 L80 30 L50 60 L20 30 L20 100 Z"  stroke="#808600" stroke-width="0" stroke-linecap="round" fill="#1EB287"


