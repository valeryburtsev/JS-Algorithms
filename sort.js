const bubbleSort = (sortArr) => {
    if(!Array.isArray(sortArr)) return null;
    if(sortArr.length === 0) return sortArr;
    let count = 0
    let arr = [...sortArr]

    let run_loop = true
    for(let i=0; i<arr.length && run_loop; i++) {
        run_loop = false
        for(let j=0; j<arr.length-1; j++) {
            const item_1 = arr[j]
            const item_2 = arr[j+1]
            count++;
            if(item_1 > item_2) {
                run_loop = true
                arr[j] = item_2
                arr[j+1] = item_1
            }
        }
    }

    console.log(`Bubble sort count: ${count}`)
    return arr;
}

const insertionSort = (sortArr) => {
    if(!Array.isArray(sortArr)) return null;
    if(sortArr.length === 0) return sortArr;
    let count = 0
    let arr = [...sortArr]

    for(var i=1; i<arr.length; i++) {
        const cur = arr[i]
        for(var j =i-1; j>=0; j--) {
            const s = arr[j]
            count++;
            if(cur<s) {
                arr[j+1] = s
                arr[j] = cur
            } else {
                break;
            }
        }
    }

    console.log(`Insertion sort count: ${count}`)
    return arr;
}

const quicksort = (sortArr) => {
    if(!Array.isArray(sortArr)) return null;
    if(sortArr.length === 0) return sortArr;
    let count = 0
    let arr = [...sortArr]

    function partition(l, r) {
        const pivot = arr[r]
        let i = l-1;
        for(let j = l; j<r; j++) {
            count++;
            const cur = arr[j]
            if(cur < pivot) {
                i++;
                arr[j] = arr[i]
                arr[i] = cur
            }
        }

        arr[r] = arr[i+1]
        arr[i+1] = pivot
        return i+1;
    }
    function qs(l, r) {
        if (l >= r) {
            return;
        }
        const pivot = partition(l, r)
        qs(l, pivot-1)
        qs(pivot+1, r)
    }

    qs(0, arr.length-1)

    console.log(`Quick sort count: ${count}`)
    return arr;
}

const mergesort = (sortArr) => {
    if(!Array.isArray(sortArr)) return null;
    if(sortArr.length === 0) return sortArr;
    let count = 0
    let arr = [...sortArr]
    
    function mergesort(low, high) {
        if(low<high) {
            const middle = Math.floor(low+(high-low)/2);
            mergesort(low, middle)
            mergesort(middle+1, high)

            merge(low, middle, high)
        }
    }

    function merge(low, middle, high) {
        let helperArr = []
        for(let i = low; i<=high; i++) {
            helperArr[i]=arr[i]
        }

        let i = low, 
            j = middle + 1
            k = low
        
        while(i<=middle && j <= high) {
            count++
            if(helperArr[i] <= helperArr[j]) {
                arr[k] = helperArr[i]
                i++
            } else {
                arr[k] = helperArr[j]
                j++
            }
            k++
        } 

        while(i <= middle) {
            arr[k] = helperArr[i]
            k++
            i++
        }
    }

    mergesort(0, arr.length-1)

    console.log(`Merge sort count: ${count}`)
    return arr;
}

const main = () => {
    //const arr = [3,-2,-1,0,2,4,1]
    //const arr = [4,0,6,1,5,2,3]

    const arr = [10, 7, 8, 9, 1, 5,15,6,2,20,23,11,18,13,66,22,34,33,3]

    bubbleSort(arr)
    insertionSort(arr)
    quicksort(arr)
    mergesort(arr)
}

main()