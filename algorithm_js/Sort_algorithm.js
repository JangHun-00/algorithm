
var kList = [8,4,7,3,5,2,9];

String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };  

function listOrNot(listbox){
    if(!(Array.isArray(listbox))){
        alert("현재 입력하신 값은 "+typeof listbox+" 형식입니다. 리스트 형식으로 입력해주세요.");
        var box = document.querySelector(".input-box");
        box.select();
        return false;
    }
    return true;
}

function numberOrNot(listbox){
    for(var i=0; i<listbox.length; i++){
        if(isNaN(listbox[i])){
            alert("리스트 안에는 숫자만 입력해주세요.");
            var box = document.querySelector(".input-box");
            box.value = "[ ]";
            box.select();
            return false;
        }
    }
    return true;
}

function startSort(){
    var plistbox = eval(document.querySelector(".input-box").value);
    if(listOrNot(plistbox) && numberOrNot(plistbox)){
        /*showSelection(plistbox);*/
        /*showInsertion(plistbox);*/
        showMergeIter(plistbox);
    }
}

function* SelectionSort(aList) {
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

function showSelection(aList){
    var ll = 0;
    var turn = 0;
    var firstP = document.createElement("p");
    firstP.className = "selection-show";
    firstP.id = "selection start";
    document.querySelector("#result").appendChild(firstP);
    document.getElementById("selection start").innerHTML = "<br><p>[선택 정렬(Selection Sort)]</p><span class='green'><p>초록 글씨: 현재 탐색된 최솟값(min_position)</span></p><p><span class='red'>빨간 글씨: 현재 탐색 대상(k)</span></p><br>";
    /*현재 최솟값 = 초록색, 현재 탐색 위치 = 빨간색*/
    for(a of SelectionSort(aList)){
        nowList = a[0].slice();
        nowList[a[1]] = "<span class='green'>"+nowList[a[1]]+"</span>";
        nowList[a[2]] = "<span class='red'>"+nowList[a[2]]+"</span>";
        var newP = document.createElement("p");
        newP.className = "selection-show";
        newP.id = "selection {}".format(ll);
        document.querySelector("#result").appendChild(newP);
        document.getElementById("selection {}".format(ll)).innerHTML = "[ {} ]".format(nowList);
        if(nowList.length != a[0].length){
            turn = turn + 1;
            document.getElementById("selection {}".format(ll)).innerHTML = "{}번째 정렬 종료: [ {} ]<br><br><br>".format(turn, nowList.slice(0, -1));
        }
        ll = ll + 1;
    }
}


function* InsertionSort(aList){
    /* 리스트, 현재 탐색 위치(position), 정렬 대상(current_val) */
    for(var i=1; i<aList.length; i++){
        var current_val = aList[i];
        var position = i;
        yield a = [aList, position, current_val, false];
        while(position > 0 && aList[position -1] > current_val){
            aList[position] = aList[position - 1];
            position = position -1;
            yield a = [aList, position, current_val];
        }
        if(position != i){
            aList[position] = current_val;
        }
        yield a = [aList, position, current_val, true];
    }
}

function showInsertion(aList){
    var ll = 0;
    var turn = 0;
    var firstP = document.createElement("p");
    firstP.className = "insertion-show";
    firstP.id = "insertion start";
    document.querySelector("#result").appendChild(firstP);
    document.getElementById("insertion start").innerHTML = "<br><p>[삽입 정렬(Insertion Sort)]</p><span class='red'>빨간 글씨 = 현재 탐색 대상(position)</span><br>";
    /* 현재 탐색 위치(position) = 빨간색, 정렬 대상(current_val)*/
    for(a of InsertionSort(aList)){
        nowList = a[0].slice();
        nowList[a[1]] = "<span class='red'>"+nowList[a[1]]+"</span>";
        c_v = "<span class='green'>{}</span>".format(a[2]);
        var newP = document.createElement("p");
        newP.className = "insertion-show";
        newP.id = "insertion {}".format(ll);
        document.querySelector("#result").appendChild(newP);
        document.getElementById("insertion {}".format(ll)).innerHTML = "정렬 대상(current_val): {}<br>[ {} ]".format(c_v, nowList);
        if(a[3]){
            turn = turn + 1;
            document.getElementById("insertion {}".format(ll)).innerHTML = "정렬 대상(current_val): {}<br>{}번째 정렬 종료: [ {} ]<br><br><br>".format(c_v, turn, nowList);
        }
        ll = ll + 1;
    }
}

function* i_MergeSort(lst){
    yield "<span class='blue'><br>lst: [{}]에 대한 i_MergeSort 함수 실행<br></span>".format(lst);
    var lists = lst.map(x => [x,]);
    while(lists.length > 1){
        lists = yield* merge_lists(lists);
    }
    yield "<span class='blue'><br><br>정렬이 완료되었으므로 정렬 결과(lists[0])를 반환하고 i_MergeSort 함수 종료.<br></span>";
    yield "<br>최종 결과: [{}]".format(lists[0]);
    return lists[0];
}

function* merge_lists(lists){
    yield "<span class='green'><br><br><br>lists: [{}]에 대한 merge_lists 함수 실행<br></span>".format(lists);
    var result = [];
    for(var i=0; i<parseInt(lists.length / 2, 10); i++){
        result.push(yield* merge2(lists[i*2], lists[i*2+1]));
    }

    if(lists.length % 2 != 0){
        yield "전체 리스트의 원소가 홀수 개 이므로, merge2 함수를 거치지 못한 마지막 원소 [{}]도 리스트에 추가<br>".format(lists[lists.length - 1]);
        result.push(lists[lists.length - 1]);
    }
    yield "<span class='green'>[{}]에 대한 merge_lists의 결과 리스트: [{}]<br></span>".format(lists, result);
    return result;
}

function* merge2(xs, ys){
    yield "<span class='red'><br>xs: [{}]와 ys: [{}]에 대한 merge2 함수 실행<br></span>".format(xs, ys);
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
            yield "현재 merge2 함수의 result 리스트: <span class='red'>[{}]<br></span>".format(result);
        } else {
            yield "두 리스트 중 현재 xs의 첫번째 원소 x(={})가 가장 작으므로 result 리스트에 {} 추가<br>".format(x, x);
            result.push(x);
            i += 1
            yield "현재 merge2 함수의 result 리스트: <span class='red'>[{}]<br></span>".format(result);
        }
    }
    /* result.extend(xs[:i])*/
    result.push.apply(result, xs.slice(i));
    result.push.apply(result, ys.slice(j));
    yield "둘 중 한 쪽의 리스트가 먼저 비었으므로 while 종료, 남은 리스트의 나머지 원소들도 result 리스트에 추가<br>"
    yield "<span class='red'>merge2([{}], [{}])에 대한 최종 result 리스트: [{}]<br></span>".format(xs, ys, result);
    return result;
}

var aList = [8,4,7,3,5,2,9];

function showMergeIter(aList){
    var explain_iMerge = "<span class='blue'>i_MergeSort</span>: 정렬 최초에 실행하는 함수, 이 함수 내부의 while문을 통해 정렬을 실행함.<br>";
    var explain_mergelists = "<span class='green'>merge_lists</span>: i_MergeSort 함수의 while문에 의해 실행되는 함수, 이 함수 내부의 for문과 if문을 통해 merge2 함수를 거친 리스트의 부분들을 한 리스트로 모으는 역할을 수행함.<br>";
    var explain_merge2 = "<span class='red'>merge2</span>: 부분으로 나뉘어진 리스트들 중 두 개의 리스트를 대상으로, 가장 작은 원소부터 차례대로 꺼내서 새로운 result 리스트에 담고, 그 정렬된 리스트를 반환함.<br>";

    var text_result = explain_iMerge + explain_mergelists + explain_merge2;
    for(a of i_MergeSort(aList)){
        text_result = text_result + a;
    }
    document.getElementById("result").style.fontSize = "2vw";
    document.getElementById("result").innerHTML = text_result;
}