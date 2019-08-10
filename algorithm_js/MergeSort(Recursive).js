function MergeSort(alist){
    document.write("Splitting "+alist+"<br><br>");
    if(alist.length > 1){
        var mid = parseInt(alist.length / 2, 10);
        var lefthalf = alist.slice(0, mid);
        var righthalf = alist.slice(mid);

        MergeSort(lefthalf);
        MergeSort(righthalf);

        var i = 0, j = 0, k = 0;
        while(i < lefthalf.length && j < righthalf.length){
            if(lefthalf[i] < righthalf[j]){
                alist[k] = lefthalf[i];
                i = i + 1;
            } else {
                alist[k] = righthalf[j];
                j = j + 1;
            }
            k = k + 1;
        }
        while(i < lefthalf.length){
            alist[k] = lefthalf[i];
            i = i + 1;
            k = k + 1;
        }
        while(j < righthalf.length){
            alist[k] = righthalf[j];
            j = j + 1;
            k = k + 1;
        }
    }
    document.write("Merging "+alist+"<br><br>");
}

aList = [8,4,7,3,5,2,9];
MergeSort(aList);
document.write("The result of Merge Sort : "+ aList+"<br><br>");