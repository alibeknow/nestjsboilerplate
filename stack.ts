class Sort {

    smallest(arr)
    {
        let smallest=arr[0];
        let smallest_index=0;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element < smallest)
            {
                smallest=element
            }
            else
            smallest_index=index
        }
        return smallest_index
    }
    selectionSort(arr:number[])
    {
        const newArr=[];
        for (let index = 0; index < arr.length; index++) {
            const sIndex=this.smallest(arr)
            newArr.push(arr.slice(sIndex,1))
            
        }

    }
}



const mySort=new Sort();

mySort.selectionSort([5,3,6,2,10])


let asd='yikes';
asd[0]='l'
console.log(asd)