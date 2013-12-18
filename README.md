Matrix Util
===========


Purpose
-------
Concise and clear functions for MxN matrices.



Usage
-------

To create a new empty matrix:

```
var Matrix = new MatrixUtil();
```

To create a new 2x2 identity matrix:

```
var Matrix = new MatrixUtil([[1,0],[0,1]])
```

Each array inside a matrix represents a distinct row.  As such, 

```
[[1,2,3,4],[5,6,7,8],[9,10,11,12]]
```

can be read as

```
[1  2  3  4
 5  6  7  8
 9 10 11 12]
```

Functionality
-------


.numRows() --> Returns number of rows

```
var rectOneMatrix = new MatrixUtil([[0,0,0],[0,0,0]]);
rectOneMatrix.numRows() // 2
```

.numColumns() ---> Returns number of columns

```
var rectOneMatrix = new MatrixUtil([[0,0,0],[0,0,0]]);
rectOneMatrix.numColumns() // 3
```

.getMatrix() ---> returns the matrix in array format

```
var rectOneMatrix = new MatrixUtil([[0,0,0],[0,0,0]]);
rectOneMatrix.getMatrix() // [[0,0,0],[0,0,0]]
```


.setMatrix(Array) ---> sets the array form matrix contained in the matrix object

```
var rectOneMatrix = new MatrixUtil([[0,0,0],[0,0,0]]);
rectOneMatrix.setMatrix([[1,1,1],[1,1,1]]) 
rectOneMatrix.getMatrix() //[[1,1,1],[1,1,1]]
```

.checkSquare() ---> returns boolean, true if matrix is NxN, false if NxM

```
var rectOneMatrix = new MatrixUtil([[0,0,0],[0,0,0]]);
var squareTwoMatrix = new MatrixUtil([[2,2],[2,2]]);
rectOneMatrix.checkSquare(); //false
squareTwoMatrix.checkSquare(); //true
```

.add(MatrixUtil) ---> Adds two matrices

```
var squareTwoMatrix = new MatrixUtil([[2,2],[2,2]]);
var squareThreeMatrix = new MatrixUtil([[3,3],[3,3]]);
squareTwoMatrix.add(squareThreeMatrix);
squareTwoMatrix.getMatrix() // [[[5,5],[5,5]]]
```

.subtract(MatrixUtil) ---> Subtracts two matrices

```
var squareTwoMatrix = new MatrixUtil([[2,2],[2,2]]);
var squareThreeMatrix = new MatrixUtil([[3,3],[3,3]]);
squareTwoMatrix.subtract(squareThreeMatrix);
squareTwoMatrix.getMatrix() // [[-1,-1],[-1,-1]]
```

.multiply(MatrixUtil) ---> Multiply two matrices

```
var rectMatrix = new MatrixUtil([[1,2,3],[4,5,6]]);
var squareOneMatrix = new MatrixUtil([[1,2],[3,4]]);
rectMatrix.multiply(squareOneMatrix);
rectMatrix.getMatrix(); //[[9,12,15],[19,26,33]]
```

.scalarMultiply(int) ---> Multiply a matrix by a scalar

```
var rectMatrix = new MatrixUtil([[1,2,3],[4,5,6]]);
rectMatrix.scalarMultiply(2);
rectMatrix.getMatrix(); //[[2,4,6],[8,10,12]]
```

.determinant() ---> Return determinant

```
var squareMatrix = new MatrixUtil([[0,3,5],[7,9,11], [13,15,17]]);
squareMatrix.determinant(); //12
```

.transpose() ---> Sets matrix object equal to its transpose

```
var rectMatrix = new MatrixUtil([[1,2,3],[4,5,6]]);
rectMatrix.transpose();
rectMatrix.getMatrix(); //[[1,4],[2,5],[3,6]]
```

.trace() ---> Returns the trace of a matrix

```
var squareMatrix = new MatrixUtil([[0,3,5],[7,9,11], [13,15,17]]);
squareMatrix.trace(); //26
```

.inverse() ---> Sets matrix object equal to its inverse

```
var squareMatrix = new MatrixUtil([[1,2,0],[2,5,3], [4,2,5]]);
squareMatrix.inverse();
squareMatrix.getMatrix(); //[[0.8260869565217392,-0.43478260869565233,0.2608695652173913],[0.08695652173913038,0.21739130434782616,-0.13043478260869565],[-0.6956521739130435,0.2608695652173913,0.043478260869565216]]
```

.translateX(units) ---> Translates 'units' units in the X direction.  Assumes 4x4 matrix.

```
var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [10,0,0,1]]);
squareMatrix.translateX(40).getMatrix() //([[1,0,0,0],[0,1,0,0], [0,0,1,0], [50,0,0,1]]);
```

.translateY(units) ---> Translates 'units' units in the Y direction. Assumes 4x4 matrix.

```
var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,10,0,1]]);
squareMatrix.translateY(40).getMatrix() //[[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,50,0,1]]);
```

.translateZ(units) ---> Translates 'units' units in the Z direction. Assumes 4x4 matrix.

```
var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,10,1]]);
squareMatrix.translateZ(40).getMatrix() //[[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,50,1]]);
```

.rotateX(rads) ---> Rotates 'rads' radians about the X axis

```
var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,10,1]]);
squareMatrix.rotateX(40).getMatrix() //[ [ 1, 0, 0, 0 ],[ 0, -0.6669380616522619, -0.7451131604793488, 0 ],[ 0, 0.7451131604793488, -0.6669380616522619, 0 ],[ 0, 7.451131604793488, -6.669380616522619, 1 ] ]);
```

.rotateY(rads) ---> Rotates 'rads' radians about the Y axis

```
var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,10,1]]);
squareMatrix.rotateY(40).getMatrix() //[ [ -0.6669380616522619, 0, 0.7451131604793488, 0 ],[ 0, 1, 0, 0 ],[ -0.7451131604793488, 0, -0.6669380616522619, 0 ],[ -7.451131604793488, 0, -6.669380616522619, 1 ] ]);
```

.rotateZ(rads) ---> Rotates 'rads' radians about the Z axis

```
var squareMatrix = new MatrixUtil([[1,0,0,0],[0,1,0,0], [0,0,1,0], [0,0,10,1]]);
squareMatrix.rotateZ(40).getMatrix() //[ [ -0.6669380616522619, -0.7451131604793488, 0, 0 ],[ 0.7451131604793488, -0.6669380616522619, 0, 0 ],[ 0, 0, 1, 0 ],[ 0, 0, 10, 1 ] ]);
```


Tests
-------



Run specRunner.html

















