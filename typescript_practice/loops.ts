
// for(let i=0;i<5;i++){
//     console.log(i);
// }

// let i=0;
// while(i<5){
// console.log(i);
// i++;
// }

// let i=0;
// do{
//     console.log('Run atleast once before checking condition',i);
//     i++;
// }while(i>1);


/* Arrays*/

let fruits:string[]=['A','B','C','D'];
console.log(fruits[0]);
fruits.push('E');
console.log(fruits)

let num:number[]=[1,2,3,4,5];
console.log(num[3]);

num.pop();

num.shift();

num.unshift(1);
console.log(num)

const sliceArray=num.slice(1,3);
console.log(sliceArray);

const doubleArray=num.map((num)=> num*3)
console.log(doubleArray);

const fiteredArray=num.filter((num)=> num>2)
console.log(fiteredArray);

let emptyArray:string[]=[];
console.log(emptyArray[0])

const readonlynum:readonly number[]=[1,2,3,4,5];
//readonlynum[0]=10;// Error: Index signature in type 'readonly number[]' only permits reading.
