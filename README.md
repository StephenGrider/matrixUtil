Matrix Util
===========


Purpose
-------
Concise and clear functions for NxM matrices.



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


.getRowLength() --> Returns number of rows

```
var rectOneMatrix = new MatrixUtil([[0,0,0],[0,0,0]]);
rectOneMatrix.getRowLength() // 2
```

.getColumnLength() ---> Returns number of columns

```
var rectOneMatrix = new MatrixUtil([[0,0,0],[0,0,0]]);
rectOneMatrix.getColumnLength() // 3
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
var rectMatrix = new MatrixUtil([[1,2,3],[4,5,6]]);    rectMatrix.transpose();
rectMatrix.getMatrix(); //[[1,4],[2,5],[3,6]]
```

.trace() ---> Returns the trace of a matrix

```
var squareMatrix = new MatrixUtil([[0,3,5],[7,9,11], [13,15,17]]);
squareMatrix.trace(); //26
```


Tests
-------



Run specRunner.html

















