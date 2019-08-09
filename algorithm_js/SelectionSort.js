function* SelectionSort(aList){
    /* [리스트, 현재 최소값(min_position), 현재 탐색 위치(k)] */
    for(var i=0; i< aList.length -1; i++){
        var min_position = i;
        for(var k= i+1; k< aList.length; k++){
            yield a = [aList, min_position, k];
            if(aList[k] < aList[min_position]){
                min_position = k;
            }
        }
        if(min_position != i){
            var tmp = aList[i];
            aList[i] = aList[min_position];
            aList[min_position] = tmp;
        }
        yield a = [aList, i, k];
    }
}

var kList = [8,4,7,3,5,2,9];
function test(){
    var ll = 0;
    for(a of SelectionSort(kList)){
        console.log(a);
        document.write(a+"<br>");
        ll = ll + 1;
    }
}