
var MatrixUtil = function(constructorMatrix){
  this._matrix = constructorMatrix;
};

MatrixUtil.prototype._each = function(func){
  for(var i = 0; i < this._matrix.length; i++){
    for(var j = 0; j < this._matrix[0].length; j++){
      func(i,j);
    }
  }
};
//MatrixUtil.prototype.numColumns = function(){
MatrixUtil.prototype.numColumns = function(){
  if(!this._matrix) return null;
  return this._matrix[0].length;
};
//MatrixUtil.prototype.numRows = function(){
MatrixUtil.prototype.numRows = function(){
  if(!this._matrix) return null;
  return this._matrix.length;
};

MatrixUtil.prototype.getMatrix = function(){
  return this._matrix;
};

MatrixUtil.prototype.setMatrix = function(newMatrix){
  this._matrix = newMatrix;
};

MatrixUtil.prototype.checkSquare = function(){
  if(this.numColumns() === this.numRows()){
    return true;
  }
  return false;
}

MatrixUtil.prototype.add = function(addMatrixObj){
  var addMatrix = addMatrixObj.getMatrix();
  if(this.numColumns() != addMatrixObj.numColumns() 
     || this.numRows() != addMatrixObj.numRows() ){
    throw 'Matrices must be of equal dimensions to add';
  }

  this._each(function(row,column){
    this._matrix[row][column] += addMatrix[row][column];
  }.bind(this));
};

MatrixUtil.prototype.subtract = function(addMatrixObj){
  var subtractMatrix = addMatrixObj.getMatrix();
  if(this.numColumns() != addMatrixObj.numColumns() 
     || this.numRows() != addMatrixObj.numRows() ){
    throw 'Matrices must be of equal dimensions to add';
  }
  this._each(function(row,column){
    this._matrix[row][column] -= subtractMatrix[row][column];
  }.bind(this));
};

MatrixUtil.prototype.multiply = function(aMatrix){
  var m2 = aMatrix.getMatrix();
  var m1 = this._matrix;

  var result = [];
  for (var i = 0; i < m1.length; i++) {
      result[i] = [];
      for (var j = 0; j < m2[0].length; j++) {
          var sum = 0;
          for (var k = 0; k < m1[0].length; k++) {
              sum += m1[i][k] * m2[k][j];
          }
          result[i][j] = sum;
      }
  }
  this._matrix = result;
};

MatrixUtil.prototype.scalarMultiply = function(scalar){
  if(typeof scalar != 'number') throw 'Scalar must be a number';
  this._each(function(row,column){
    this._matrix[row][column] *= scalar;
  }.bind(this));
};

MatrixUtil.prototype.transpose = function(){
  var transposedMatrix = [];
  
  for(var i = 0; i < this.numColumns(); i++){
    transposedMatrix.push([]);
  }
  this._each(function(row,column){
    transposedMatrix[column][row] = this._matrix[row][column]
  }.bind(this));
  this._matrix = transposedMatrix;
};

MatrixUtil.prototype.determinant = function(){
  var s;
  var det = 0;
  var k = this.numColumns();
  if(k != this.numRows()){
    throw 'Matrices must be of equal dimensions to multiply';
  }
  var calcDet = function(A){
    if (A.length == 1) {
        return A[0][0];
    }
    if (A.length == 2) {
        det =  A[0][0] * A[1][1] - A[1][0] * A [0][1];
        return det;
    }
    for (var i = 0; i < k; i++) {
      var smaller = new Array(A.length - 1);
      for (var h = 0; h < smaller.length; h++) {
          smaller[h] = new Array(A.length - 1);
      }
      for(var a = 1; a < A.length; a++) {
          for(var b = 0; b < A.length; b++) {
              if (b < i) {
                  smaller[a - 1][b] = A[a][b];
              } else if (b > i) {
                  smaller[a - 1][b - 1] = A[a][b];
              }
          }
      }
      if(i % 2 == 0) {s = 1;} 
      else {s = -1;}
      det += s * A[0][i] * (calcDet(smaller));
    }
    return det
  }
  return calcDet(this._matrix);
};

MatrixUtil.prototype.trace = function(){
  if(!this.checkSquare()){
    throw "Matrix must be square";
  }
  var trace = 0;
  this._each(function(row,col){
    if(row === col){ trace += this._matrix[row][col];}
  }.bind(this));
  return trace;
};

MatrixUtil.prototype._makeIdentity = function(m){
  var matrix = [];
  for(var i = 0; i < m ; i++){
    matrix.push([]);
    for(var j = 0; j < m ; j++){
      if(i===j){
        matrix[i].push(1);
      } else{
        matrix[i].push(0);
      }
    }
  }
  return matrix;
};

MatrixUtil.prototype._RREF = function(matrix){
  var lead = 0;
  var rowCount = matrix.length;
  var colCount = matrix[0].length;
  for(var r = 0; r < rowCount; r++){
    if(colCount < lead){
      return matrix;
    }
    var i = r;
    while(matrix[i][lead] == 0){
      i++;
      if(rowCount == i){
        i=r;
        lead++
        if(colCount === lead){
          return matrix;
        }
      }
    }
    matrix[i] = [matrix[r], matrix[r] = matrix[i]][0]; //bwhahahha
    var val = matrix[r][lead];
    for(var j = 0; j < colCount; j++){
      matrix[r][j] = matrix[r][j] / val;
    }
    for(var i = 0 ; i < rowCount; i++){
      if(i != r){
        var val = matrix[i][lead];
        for(var t = 0; t < colCount ; t++){
          matrix[i][t] -= val * matrix[r][t];
        }
      }
    }
    lead++;
  }
  return matrix
};

MatrixUtil.prototype.inverse = function(){
  var m = this.numColumns()
  var identity = this._makeIdentity(m)
  var adjMatrix = this.getMatrix();


  for(var i =0 ; i < m ; i++){
    adjMatrix[i] = adjMatrix[i].concat(identity[i]);
  }

  var rRef = this._RREF(adjMatrix);
  var iMatrix = [];

  
  for(var i = 0; i < m; i++){
    iMatrix.push([]);
    for(var j = 0; j < m ; j++){
      iMatrix[i].push(rRef[i][j+m]);
    }
  }
  this._matrix = iMatrix;
};







