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
    expect(matrix.getRowLength()).to.eql(null);
  });

  it('should return null when column length is not defined', function(){
    expect(matrix.getRowLength()).to.eql(null);
  });

  it('should return a row length when a matrix is defined', function(){
    matrix.setMatrix([[0,0],[0,0]]);
    expect(matrix.getRowLength()).to.be(2)
  });

  it('should return a column length when a matrix is defined', function(){
    matrix.setMatrix([[0,0],[0,0]]);
    expect(matrix.getColumnLength()).to.be(2)
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

  it('should multiply by a scala', function(){

    var rectMatrix = new MatrixUtil([[1,2,3],[4,5,6]]);
    rectMatrix.scalarMultiply(2);
    expect(rectMatrix.getMatrix()).to.eql([[2,4,6],[8,10,12]])

  });

  it('should transpose a matrix', function(){
    var rectMatrix = new MatrixUtil([[1,2,3],[4,5,6]]);
    rectMatrix.transpose();
    expect(rectMatrix.getMatrix()).to.eql([[1,4],[2,5],[3,6]])
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
    var rectMatrix = new MatrixUtil([[1,2,3],[4,5,6]]);
    var squareOneMatrix = new MatrixUtil([[1,2],[3,4]]);
    rectMatrix.multiply(squareOneMatrix);
    expect(rectMatrix.getMatrix()).to.be.eql([[9,12,15],[19,26,33]]);
  })

});
