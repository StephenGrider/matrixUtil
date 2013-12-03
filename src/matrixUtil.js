
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

MatrixUtil.prototype.multiply = function(){

}

MatrixUtil.prototype.scalarMultiply = function(scalar){
  if(typeof scalar != 'number') throw 'Scalar must be a number';

  this._each(function(row,column){
    this._matrix[row][column] *= scalar;
  })
}

MatrixUtil.prototype.transpose = function(){

}

MatrixUtil.prototype.determinant = function(){

}
