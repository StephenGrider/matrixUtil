var returnArguments = function(){ return arguments; };

beforeEach(function(){

});

describe('Constructor', function() {
  it('should return an object', function(){
    expect(new MatrixUtil()).to.be.an(Object);
  });

  it('should accept a matrix with the constructor', function(){
    var matrix = new MatrixUtil([[0,0],[0,0]]);
    expect(matrix.getMatrix()).to.be.an('array');
  });

  it('should allow the matrix to change after construction', function(){
    var matrix = new MatrixUtil([[0,0],[0,0]]);
    expect(matrix.getMatrix()).to.eql([[0,0],[0,0]]);
  })

});

describe('Properties', function(){
  var matrix = new MatrixUtil();

  it('should return null when row length is not defined', function(){
    expect(matrix.numColumns()).to.eql(null);
  });

  it('should return null when column length is not defined', function(){
    expect(matrix.numColumns()).to.eql(null);
  });

  it('should return the number of columns when a matrix is defined', function(){
    matrix.setMatrix([[0,0,0],[0,0,0]]);
    expect(matrix.numColumns()).to.be(3)
  });

  it('should return the number of rows when a matrix is defined', function(){
    matrix.setMatrix([[0,0,0],[0,0,0]]);
    expect(matrix.numRows()).to.be(2)
  });

  it('should determine if a matrix is square', function(){
    var rectOneMatrix = new MatrixUtil([[0,0,0],[0,0,0]]);
    var squareOneMatrix = new MatrixUtil([[1,1],[1,1]]);

    expect(squareOneMatrix.checkSquare()).to.be(true);
    expect(rectOneMatrix.checkSquare()).to.be(false);
  });

});

describe('Operations', function(){

  it('should add another matrix', function(){
    var squareOneMatrix = new MatrixUtil([[1,1],[1,1]]);
    var squareTwoMatrix = new MatrixUtil([[2,2],[2,2]]);

    squareOneMatrix.add(squareTwoMatrix);
    expect(squareOneMatrix.getMatrix()).to.eql([[3,3],[3,3]]);
  });

  it('should throw an error when adding matrices of different dimensions', function(){
    var squareOneMatrix = new MatrixUtil([[1,1],[1,1]]);
    var rectOneMatrix = new MatrixUtil([0,0,0],[0,0,0]);

    expect(function(){
      squareOneMatrix.add(rectOneMatrix)
    }).to.throwError();
  });

  it('should subtract another matrix', function(){
    var squareOneMatrix = new MatrixUtil([[1,1],[1,1]]);
    var squareTwoMatrix = new MatrixUtil([[2,2],[2,2]]);

    squareTwoMatrix.subtract(squareOneMatrix);
    expect(squareTwoMatrix.getMatrix()).to.eql([[1,1],[1,1]]);
  });


  it('should throw an error when subtracting matrices of different dimensions', function(){
    var squareOneMatrix = new MatrixUtil([[1,1],[1,1]]);
    var rectOneMatrix = new MatrixUtil([0,0,0],[0,0,0]);

    expect(function(){
      squareOneMatrix.subtract(rectOneMatrix)
    }).to.throwError();
  });

  it('should multiply by a scalar', function(){

    var rectMatrix = new MatrixUtil([[1,2,3],[4,5,6]]);
    rectMatrix.scalarMultiply(2);
    expect(rectMatrix.getMatrix()).to.eql([[2,4,6],[8,10,12]])

  });

  it('should transpose a matrix', function(){
    var rectMatrix = new MatrixUtil([[1,3,5],[2,4,6]]);
    rectMatrix.transpose();
    expect(rectMatrix.getMatrix()).to.eql([[1,2],[3,4],[5,6]])
  });

  it('should throw an error when determining the determinant of an NxM matrix', function(){
    var NxMmatrix = new MatrixUtil([[1,1],[2,2],[3,3]]);

    expect(function(){
      NxMmatrix.determinant()
    }).to.throwError();
  });

  it('should calculate the determinant of an identity matrix', function(){
    var identityMatrix = new MatrixUtil([[1,0,0],[0,1,0], [0,0,1]]);

    expect(identityMatrix.determinant()).to.be(1);
  });

  it('should calculate the determinant of an NxN matrix', function(){
    var squareMatrix = new MatrixUtil([[0,3,5],[7,9,11], [13,15,17]]);

    expect(squareMatrix.determinant()).to.be(12);
  });

  it('should calculate the trace of an NxN matrix', function(){
    var squareMatrix = new MatrixUtil([[0,3,5],[7,9,11], [13,15,17]]);

    expect(squareMatrix.trace()).to.be(26);
  });

  it('should error when trace attempted on NxM matrix', function(){
    var rectMatrix = new MatrixUtil([[1,2,3],[4,5,6]]);

    expect(function(){
      NxMmatrix.determinant()
    }).to.throwError();
  });

  it('should multiply two matrices', function(){
    var rectMatrix = new MatrixUtil([[1,2],[4,5],[8,9]]);
    var squareOneMatrix = new MatrixUtil([[1,2],[3,4]]);
    rectMatrix.multiply(squareOneMatrix);
    expect(rectMatrix.getMatrix()).to.be.eql([[7,10],[19,28],[35,52]]);
  });

  it('should find the inverse to a matrix', function(){
    var squareMatrix = new MatrixUtil([[1,2,0],[2,5,3], [4,2,5]]);
    squareMatrix.inverse();
    expect(squareMatrix.getMatrix()).to.be.eql([[0.8260869565217392,-0.43478260869565233,0.2608695652173913],[0.08695652173913038,0.21739130434782616,-0.13043478260869565],[-0.6956521739130435,0.2608695652173913,0.043478260869565216]]);
  });

  it('should conduct a x-axis translation transform', function(){
    var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [10,0,0,1]]);
    expect(squareMatrix.translateX(40).getMatrix()).to.be.eql([[1,0,0,0],[0,1,0,0], [0,0,1,0], [50,0,0,1]]);
  });

  it('should conduct a y-axis translation transform', function(){
    var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,10,0,1]]);
    expect(squareMatrix.translateY(40).getMatrix()).to.be.eql([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,50,0,1]]);
  });

  it('should conduct a z-axis translation transform', function(){
    var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,10,1]]);
    expect(squareMatrix.translateZ(40).getMatrix()).to.be.eql([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,50,1]]);
  });

  /////rotation
  it('should conduct a x-axis rotation transform', function(){
    var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,10,1]]);
    expect(squareMatrix.rotateX(40).getMatrix()).to.be.eql([ [ 1, 0, 0, 0 ],
                                                            [ 0, -0.6669380616522619, -0.7451131604793488, 0 ],
                                                            [ 0, 0.7451131604793488, -0.6669380616522619, 0 ],
                                                            [ 0, 7.451131604793488, -6.669380616522619, 1 ] ]);
  });

  it('should conduct a y-axis rotation transform', function(){
    var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,10,1]]);
    expect(squareMatrix.rotateY(40).getMatrix()).to.be.eql([ [ -0.6669380616522619, 0, 0.7451131604793488, 0 ],
                                                            [ 0, 1, 0, 0 ],
                                                            [ -0.7451131604793488, 0, -0.6669380616522619, 0 ],
                                                            [ -7.451131604793488, 0, -6.669380616522619, 1 ] ]);
  });

  it('should conduct a z-axis rotation transform', function(){
    var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,10,1]]);
    expect(squareMatrix.rotateZ(40).getMatrix()).to.be.eql([ [ -0.6669380616522619, -0.7451131604793488, 0, 0 ],
                                                            [ 0.7451131604793488, -0.6669380616522619, 0, 0 ],
                                                            [ 0, 0, 1, 0 ],
                                                            [ 0, 0, 10, 1 ] ]);
  });



});




