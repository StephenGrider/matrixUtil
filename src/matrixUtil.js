
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

MatrixUtil.prototype.getRowLength = function(){
  if(!this._matrix) return null;
  return this._matrix[0].length;
};

MatrixUtil.prototype.getColumnLength = function(){
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
  if(this.getRowLength() === this.getColumnLength()){
    return true;
  }
  return false;
}

MatrixUtil.prototype.add = function(addMatrixObj){
  var addMatrix = addMatrixObj.getMatrix();
  if(this.getRowLength() != addMatrixObj.getRowLength() 
     || this.getColumnLength() != addMatrixObj.getColumnLength() ){
    throw 'Matrices must be of equal dimensions to add';
  }

  this._each(function(row,column){
    this._matrix[row][column] += addMatrix[row][column];
  }.bind(this));
};

MatrixUtil.prototype.subtract = function(addMatrixObj){
  var subtractMatrix = addMatrixObj.getMatrix();
  if(this.getRowLength() != addMatrixObj.getRowLength() 
     || this.getColumnLength() != addMatrixObj.getColumnLength() ){
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
  for(var i = 0; i < this.getRowLength(); i++){
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
  var k = this.getRowLength();
  if(k != this.getColumnLength()){
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







