/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = new Board({'n':n});
  for(var rowIndex = 0; rowIndex < n; rowIndex++){
    for (var colIndex = 0; colIndex < n; colIndex++){
      solution.togglePiece(rowIndex, colIndex);
      if(solution.hasColConflictAt(colIndex)) {
        solution.togglePiece(rowIndex, colIndex);
      }else{
        break;
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  var test = solution.get('n');
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount = 0;
  var populateBoard = function(board, rowIndex, untakenColumns) {
    if(rowIndex === n){
      //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
      solutionCount++;
      return;
    }
    var row = board.get(rowIndex);
    for (var column in untakenColumns){
      board.togglePiece(rowIndex, untakenColumns[column]);
      delete untakenColumns[column];
      populateBoard(board, rowIndex + 1, untakenColumns);
      board.togglePiece(rowIndex, untakenColumns[column]);
      untakenColumns[column] = true;
    }
  };
  untaken = {};
  for (var i = 0; i < n; i++) {
    untaken[i] = true;
  }
  populateBoard(new Board({'n':n}), 0, untaken);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = null;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
