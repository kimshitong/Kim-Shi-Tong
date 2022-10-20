//swap(A,i,j)

function swap(A, i, j,ine,jne) {
    let temp = A[ine][jne];
    A[ine][jne] = A[i][j];
    A[i][j] = temp;
}
function swap_row(A, i, j) {
    let temp = A[j];
    A[j] = A[i];
    A[i] = temp;
}

function rotate_matrix(M){
    //Goes Right k : first
    for(let i = 0; i < array_length(M); i= i +1){
        for(let k = 0; k <math_ceil(array_length(M)-i); k = k + 1){
            
            const diagx = math_floor(array_length(M)-1)-k;
            const diagy = math_floor(array_length(M)-1)-i;
            
            if( i + k !== array_length(M)){
                swap(M,i,k,diagx,diagy);
            }
        }
    }
    for(let l = 0; l < array_length(M)/2;l = l + 1){
        swap_row(M,l,(array_length(M)-1)-l);
    }
    return M;
}

let matrixA = [ [1,2,3,4] , [5,6,7,8] , [9,10,11,12] ,[13,14,15,16] ];
let matrixB = [ [1,2],[3,4]];
// let matrixC= [ [1,2,3] , [4,5,6] , [7,8,9]];

rotate_matrix(matrixA);

// [[16, 12, 8, 4], 
// [15, 11, 7, 3], 
// [14, 10, 6, 2], 
// [13, 9, 5, 1]]
