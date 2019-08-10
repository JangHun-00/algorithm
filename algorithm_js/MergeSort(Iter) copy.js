String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };  

var explain_iMerge = "i_MergeSort: 정렬 최초에 실행하는 함수, 이 함수 내부의 while문을 통해 정렬을 실행함.<br>";
var explain_mergelists = "merge_lists: i_MergeSort 함수의 while문에 의해 실행되는 함수, 이 함수 내부의 for문과 if문을 통해 merge2 함수를 거친 리스트의 부분들을 한 리스트로 모으는 역할을 수행함.<br>";
var explain_merge2 = "merge2: 부분으로 나뉘어진 리스트들 중 두 개의 리스트를 대상으로, 가장 작은 원소부터 차례대로 꺼내서 새로운 result 리스트에 담고, 그 정렬된 리스트를 반환함.<br>";

function* i_MergeSort(lst){
    yield "<br>lst: [{}]에 대한 i_MergeSort 함수 실행<br>".format(lst);
    var lists = lst.map(x => [x,]);
    while(lists.length > 1){
        lists = yield* merge_lists(lists);
    }
    yield "<br><br>정렬이 완료되었으므로 정렬 결과(lists[0])를 반환하고 i_MergeSort 함수 종료.<br>";
    yield "<br>최종 결과: [{}]".format(lists[0]);
    return lists[0];
}

function* merge_lists(lists){
    yield "<br><br><br>lists: [{}]에 대한 merge_lists 함수 실행<br>".format(lists);
    var result = [];
    for(var i=0; i<parseInt(lists.length / 2, 10); i++){
        result.push(yield* merge2(lists[i*2], lists[i*2+1]));
    }

    if(lists.length % 2 != 0){
        yield "전체 리스트의 원소가 홀수 개 이므로, merge2 함수를 거치지 못한 마지막 원소 [{}]도 리스트에 추가<br>".format(lists[lists.length - 1]);
        result.push(lists[lists.length - 1]);
    }
    yield "merge_lists의 결과 리스트: [{}]<br>".format(result);
    return result;
}

function* merge2(xs, ys){
    yield "<br>xs: [{}]와 ys: [{}]에 대한 merge2 함수 실행<br>".format(xs, ys);
    var i = 0;
    var j = 0;
    var result = [];
    while(i < xs.length && j < ys.length){
        var x = xs[i];
        var y = ys[j];
        if(x > y){
            yield "두 리스트 중 현재 ys의 첫번째 원소 y(={})가 가장 작으므로 result 리스트에 {} 추가<br>".format(y, y);
            result.push(y);
            j += 1
            yield "현재 merge2 함수의 result 리스트: [{}]<br>".format(result);
        } else {
            yield "두 리스트 중 현재 xs의 첫번째 원소 x(={})가 가장 작으므로 result 리스트에 {} 추가<br>".format(x, x);
            result.push(x);
            i += 1
            yield "현재 merge2 함수의 result 리스트: [{}]<br>".format(result);
        }
    }
    /* result.extend(xs[:i])*/
    result.push.apply(result, xs.slice(i));
    result.push.apply(result, ys.slice(j));
    yield "둘 중 한 쪽의 리스트가 먼저 비었으므로 while 종료, 남은 리스트의 나머지 원소들도 result 리스트에 추가<br>"
    yield "merge2([{}], [{}])에 대한 최종 result 리스트: [{}]<br>".format(xs, ys, result);
    return result;
}

var aList = [8,4,7,3,5,2,9];

function showMergeIter(aList){
    var explain_iMerge = "i_MergeSort: 정렬 최초에 실행하는 함수, 이 함수 내부의 while문을 통해 정렬을 실행함.<br>";
    var explain_mergelists = "merge_lists: i_MergeSort 함수의 while문에 의해 실행되는 함수, 이 함수 내부의 for문과 if문을 통해 merge2 함수를 거친 리스트의 부분들을 한 리스트로 모으는 역할을 수행함.<br>";
    var explain_merge2 = "merge2: 부분으로 나뉘어진 리스트들 중 두 개의 리스트를 대상으로, 가장 작은 원소부터 차례대로 꺼내서 새로운 result 리스트에 담고, 그 정렬된 리스트를 반환함.<br>";

    var text_result = explain_iMerge + explain_mergelists + explain_merge2;
    for(a of i_MergeSort(aList)){
        text_result = text_result + a;
    }
    document.write(text_result);
}