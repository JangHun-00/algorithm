function quickSort(data_list){
    quickSortHip(data_list, 0, data_list.length - 1);
}

function quickSortHip(data_list, first, last){
    if(first < last){
        var partitionResult = partition(data_list, first, last);
        var pivot = partitionResult[0];
        var splitpoint = partitionResult[1];
        var less = data_list.filter(x => x < pivot);
        var great = data_list.filter(x => x > pivot);

        quickSortHip(data_list, first, splitpoint-1);
        quickSortHip(data_list, splitpoint+1, last);

    }
}

function partition(data_list, first, last){
    var pivotvalue = data_list[first];

    var leftmark = first + 1;
    var rightmark = last;

    var done = false;
    while(!done){

        while(leftmark <= rightmark && data_list[leftmark] <= pivotvalue){
            leftmark = leftmark + 1;
        }

        while(data_list[rightmark] >= pivotvalue && rightmark >= leftmark){
            rightmark = rightmark - 1;
        }

        if(rightmark < leftmark){
            done = true;
        } else {
            var temp = data_list[leftmark];
            data_list[leftmark] = data_list[rightmark];
            data_list[rightmark] = temp;
        }
    }
    temp = data_list[first];
    data_list[first] = data_list[rightmark];
    data_list[rightmark] = temp;

    return [pivotvalue, rightmark];
}

var klist = [7, 2, 9, 4, 3, 7, 6, 1];
quickSort(klist);
document.write(klist);