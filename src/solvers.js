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

window.removeSquares = function(board, n, rowIndex, colIndex){
  var i = 0;
  var j = 0;
  //remove row
  for(i = 0; i < n; i++){
    delete board[rowIndex+''+i];
  }
  //remove column
  for(i = 0; i < n; i++){
    delete board[i+''+colIndex];
  }
  //remove minor diagonal
  for(i=rowIndex, j = colIndex; i < n && j < n; i++, j--){
    delete board[i+''+j];
  }
  for(i=rowIndex, j = colIndex; i < n && j < n; i--, j++){
    delete board[i+''+j];
  }
  //remove major diagonal
  for(i=rowIndex, j = colIndex; i < n && j < n; i++, j++){
    delete board[i+''+j];
  }
  for(i=rowIndex, j = colIndex; i < n && j < n; i--, j--){
    delete board[i+''+j];
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var populateBoard = function(board, rowIndex){//, untakenSquares) {
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
  // console.log('Single solution for ' + n + ' queens:');
  // solution.print();
  return solution.rows();//solution.rows();
};

  // untaken = {};
  // for(var i = 0; i < n; i++) {
  //   for(var j = 0; j < n; j++){
  //     untaken[i+''+j] = [i,j];
  //   }
  // }

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = 0;
  var populateBoard = function(board, rowIndex){//, untakenSquares) {
    if(rowIndex === n){
      solutionCount++;
      // console.log('Single solution for ' + n + ' queens:');
      // solution.print();
      return;
    }
    for(var colIndex = 0; colIndex < n; colIndex++){
      board.togglePiece(rowIndex, colIndex);
      if(!board.hasAnyQueenConflictsOn(rowIndex, colIndex)){
        populateBoard(board, rowIndex+1);
      }
      board.togglePiece(rowIndex, colIndex);
    }
  };
  // untaken = {};
  // for(var i = 0; i < n; i++) {
  //   for(var j = 0; j < n; j++){
  //     untaken[i+''+j] = [i,j];
  //   }
  // }
  var solution = new Board({'n':n});
  var possibilities = (new Board({'n':n})).rows();
  var result = populateBoard(solution, 0);
  return solutionCount;//solution.rows();
};
