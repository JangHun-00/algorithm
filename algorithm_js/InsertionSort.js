function* InsertionSort(aList){
    /* 리스트, 현재 탐색 위치(position), 정렬 대상(current_val) */
    for(var i=1; i<aList.length; i++){
        var current_val = aList[i];
        var position = i;
        yield a = [aList, position, current_val];
        while(position > 0 && aList[position -1] > current_val){
            aList[position] = aList[position - 1];
            position = position -1;
            yield a = [aList, position, current_val];
        }
        if(position != i){
            aList[position] = current_val;
        }
        yield a = [aList, position, current_val];
    }
}

var kList = [8,4,7,3,5,2,9];
for(a of InsertionSort(kList)){
    console.log(a);
}