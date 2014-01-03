
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

MatrixUtil.prototype.numColumns = function(){
  if(!this._matrix) return null;
  return this._matrix[0].length;
};

MatrixUtil.prototype.numRows = function(){
  if(!this._matrix) return null;
  return this._matrix.length;
};

MatrixUtil.prototype.getMatrix = function(){
  return this._matrix;
};

MatrixUtil.prototype.setMatrix = function(newMatrix){
  this._matrix = newMatrix;
  return this;
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
  return this;
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
  return this;
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
  return this;
};

MatrixUtil.prototype.scalarMultiply = function(scalar){
  if(typeof scalar != 'number') throw 'Scalar must be a number';
  this._each(function(row,column){
    this._matrix[row][column] *= scalar;
  }.bind(this));
  return this;
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
  return this;
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
  return this;
};

MatrixUtil.prototype.rotateX = function(rad){

  var rotation = new MatrixUtil([
                                  [1,0,0,0],
                                  [0,Math.cos(rad),-1*Math.sin(rad),0],
                                  [0,Math.sin(rad),Math.cos(rad),0],
                                  [0,0,0,1]
                                ]);
  this.multiply(rotation);
  return this;
};
MatrixUtil.prototype.rotateY = function(rad){

  var rotation = new MatrixUtil([
                                  [Math.cos(rad),0,Math.sin(rad),0],
                                  [0,1,0,0],
                                  [-1*Math.sin(rad),0,Math.cos(rad),0],
                                  [0,0,0,1]
                                ]);

  this.multiply(rotation);
  return this;

};
MatrixUtil.prototype.rotateZ = function(rad){
  var rotation = new MatrixUtil([
                                  [Math.cos(rad),-1*Math.sin(rad),0,0],
                                  [Math.sin(rad),Math.cos(rad),0,0],
                                  [0,0,1,0],
                                  [0,0,0,1]
                                ]);

  this.multiply(rotation);
  return this;
};

MatrixUtil.prototype.translateX = function(x){
  // var translation = new MatrixUtil([
  //                                 [1,0,0,0],
  //                                 [0,1,0,0],
  //                                 [0,0,1,0],
  //                                 [x,0,0,1]
  //                               ]);
  this._matrix[3][0] += x;
  // this.multiply(translation);
  return this;
};
MatrixUtil.prototype.translateY = function(y){
  // var translation = new MatrixUtil([
  //                                 [1,0,0,0],
  //                                 [0,1,0,0],
  //                                 [0,0,1,0],
  //                                 [0,y,0,1]
  //                               ]);
  this._matrix[3][1] += y;
  // this.multiply(translation);
  return this;
};

MatrixUtil.prototype.translateZ = function(z){
  // var translation = new MatrixUtil([
  //                                 [1,0,0,0],
  //                                 [0,1,0,0],
  //                                 [0,0,1,0],
  //                                 [0,0,z,1]
  //                               ]);
  this._matrix[3][2] += z;
  // this.multiply(translation);
  return this;
};


MatrixUtil.prototype.copyMatrix = function(){
  var copy = [];

  for(var i = 0; i < this.numRows(); i++){
    copy.push([]);
    for(var j = 0; j < this.numColumns(); j++){
      copy[i].push(this._matrix[i][j]);
    }
  }
  return copy;
}

MatrixUtil.prototype.toString = function(){
  var s = ""
  this._each(function(row,column){
    if(row===this._matrix[0].length-1 && column===this._matrix.length-1){
      s+=this._matrix[row][column].toFixed(15);
    }else{
      s+= this._matrix[row][column].toFixed(15) + ",";
    }
  }.bind(this));
  return s
}
