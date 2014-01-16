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

window.adjustPossibilities = function(possibilities, rowIndex, colIndex){
  var n = possibilities.length;
  var i = 0;
  var j = 0;
  //remove row
  for(i = 0; i < n; i++){
    possibilities[rowIndex][i] = 0;
  }
  //remove column
  for(i = 0; i < n; i++){
    possibilities[i][colIndex] = 0;
  }
  //remove minor diagonal
  for(i=rowIndex, j = colIndex; i < n && j >= 0; i++, j--){
    possibilities[i][j] = 0;
  }
  for(i=rowIndex, j = colIndex; i >= 0 && j < n; i--, j++){
    possibilities[i][j] = 0;
  }
  //remove major diagonal
  for(i=rowIndex, j = colIndex; i < n && j < n; i++, j++){
    possibilities[i][j] = 0;
  }
  for(i=rowIndex, j = colIndex; i >= 0 && j >= 0; i--, j--){
    possibilities[i][j] = 0;
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var populateBoard = function(board, rowIndex){
    if(rowIndex === n){
      return true;
    }
    for(var colIndex = 0; colIndex < n; colIndex++){
      board.togglePiece(rowIndex, colIndex);
      if(!board.hasAnyQueenConflictsOn(rowIndex, colIndex)){
        if(populateBoard(board, rowIndex+1)) return true;
      }
      board.togglePiece(rowIndex, colIndex);
    }
    return false;
  };
  var solution = new Board({'n':n});
  var result = populateBoard(solution, 0);
  return solution.rows();
};

window.deepClone = function(sqrMatrix){
  var copy = [];
  for (var i = 0; i < sqrMatrix.length; i++) {
    copy.push(_.clone(sqrMatrix[i]));
  }
  return copy;
}

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = 0;
  var populateBoard = function(board, possibilities, rowIndex){
    if(rowIndex === n){
      solutionCount++;
      return;
    }
    var rowPoss = possibilities[rowIndex];
    if(!rowPoss) return;
    for(var colIndex = 0; colIndex < n; colIndex++){
      if(!rowPoss[colIndex]) continue;
      board.togglePiece(rowIndex, colIndex);
      var newPoss = deepClone(possibilities);
      adjustPossibilities(newPoss, rowIndex, colIndex);
      if(!board.hasAnyQueenConflictsOn(rowIndex, colIndex)){
        populateBoard(board, newPoss, rowIndex+1);
      }
      board.togglePiece(rowIndex, colIndex);
    }
  };
  var solution = new Board({'n':n});
  var possibilities = (new Board({'n':n})).rows();
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++){
      possibilities[i][j] = 1;
    }
  }

  var result = populateBoard(solution, possibilities, 0);
  return solutionCount;
};
