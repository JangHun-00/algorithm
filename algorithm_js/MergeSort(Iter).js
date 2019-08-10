String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };  


function i_MergeSort(lst){
    var lists = lst.map(x => [x,]);
    while(lists.length > 1){
        lists = merge_lists(lists);
    }
    return lists[0];
}

function merge_lists(lists){
    var result = [];
    for(var i=0; i<parseInt(lists.length / 2, 10); i++){
        result.push(merge2(lists[i*2], lists[i*2+1]));
    }

    if(lists.length % 2 != 0){
        result.push(lists[lists.length - 1]);
    }
    return result;
}

function merge2(xs, ys){
    var i = 0;
    var j = 0;
    var result = [];
    while(i < xs.length && j < ys.length){
        var x = xs[i];
        var y = ys[j];
        if(x > y){
            result.push(y);
            j += 1
        } else {
            result.push(x);
            i += 1
        }
    }
    /* result.extend(xs[:i])*/
    result.push.apply(result, xs.slice(i));
    result.push.apply(result, ys.slice(j));
    return result;
}

var aList = [8,4,7,3,5,2,9];
var sList = i_MergeSort(aList);
document.write(sList);