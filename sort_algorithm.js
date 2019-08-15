
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
        var option = document.querySelector("#SortOption").value;
        switch(option){
            case "Selection": showSelection(plistbox);
            break;
            case "Insertion": showInsertion(plistbox);
            break;
            case "Merge-iter": showMergeIter(plistbox);
            break;
            case "Merge-recursive": showMergeRecursive(plistbox);
            break;
            case "Bubble": showBubble(plistbox);
            break;
            case "Quick": showQuick(plistbox);
            break;
            case "NoChoice": alert("정렬 알고리즘 종류를 선택해주세요.");
            break;
        default: alert("오류가 발생했습니다.");
        }
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
    yield "둘 중 한 쪽의 리스트가 먼저 비었으므로 while 종료, 남은 리스트의 나머지 원소들도 result 리스트에 추가<br>";
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











function* MergeSort(alist){
    var tmplist = alist.slice();
    yield "<span class='green'><br><br>[{}]에 대한 MergeSort 함수 시작<br></span>".format(alist);
    if(alist.length > 1){
        yield "[{}]는 길이가 2 이상이므로, 좌우로 나누어 재귀함수 실행<br>".format(tmplist);
        var mid = parseInt(alist.length / 2, 10);
        var lefthalf = alist.slice(0, mid);
        var righthalf = alist.slice(mid);

        yield "[{}]의 lefthalf: [{}], righthalf: [{}]에 대한 재귀함수 실행<br>".format(tmplist, lefthalf, righthalf);
        yield* MergeSort(lefthalf);
        yield* MergeSort(righthalf);
        yield "<div class='blue'><br><br>[{}]의 lefthalf와 righthalf에 대한 재귀함수 종료.<br>현재 lefthalf: [{}], righthalf: [{}]<br><br>".format(tmplist, lefthalf, righthalf);

        var i = 0, j = 0, k = 0;
        while(i < lefthalf.length && j < righthalf.length){
            yield "lefthalf[{}]: {}, righthalf[{}]: {}<br>".format(i, lefthalf[i], j, righthalf[j]);
            if(lefthalf[i] < righthalf[j]){
                yield "lefthalf의 원소가 작으므로 {}를 alist에 넣기<br>".format(lefthalf[i]);
                alist[k] = lefthalf[i];
                i = i + 1;
            } else {
                yield "righthalf의 원소가 작으므로 {}를 alist에 넣기<br>".format(righthalf[j]);
                alist[k] = righthalf[j];
                j = j + 1;
            }
            k = k + 1;
            showlist = changeColorMergeRecursive(alist, k-1);
            yield "현재 alist: [{}]<br><br>".format(showlist);
        }
        while(i < lefthalf.length){
            yield "righthalf의 원소들은 정렬 종료, 남은 lefthalf의 원소들도 alist에 넣기<br>lefthalf[{}]: {}<br>".format(i, lefthalf[i]);
            alist[k] = lefthalf[i];
            i = i + 1;
            k = k + 1;
            showlist = changeColorMergeRecursive(alist, k-1);
            yield "현재 alist: [{}]<br><br>".format(showlist);
        }
        while(j < righthalf.length){
            yield "lefthalf의 원소들은 정렬 종료, 남은 righthalf의 원소들도 alist에 넣기<br>righthalf[{}]: {}<br>".format(j, righthalf[j]);
            alist[k] = righthalf[j];
            j = j + 1;
            k = k + 1;
            showlist = changeColorMergeRecursive(alist, k-1);
            yield "현재 alist: [{}]<br><br>".format(showlist);
        }
        yield "</div>"
    }
    yield "<span class='red'>[{}]에 대한 MergeSort 함수 결과: [{}]<br></span>".format(tmplist, alist);
}

function changeColorMergeRecursive(mlist, k){
    var klist = mlist.slice();
    for(var i=0; i<klist.length; i++){
        if(i==k){
            klist[i] = "<span class='red'>"+klist[i]+"</span>";
        }
    }
    return klist;
}

function showMergeRecursive(aList){
    var text_result = "<br><br>합병 정렬(MergeSort) 재귀함수 실행<br><span class='blue'>파란 글씨: 재귀함수 종료 후 while을 통해 lefthalf와 righthalf 합병하는 과정</span><br>";
    for(a of MergeSort(aList)){
        text_result = text_result + a;
    }
    text_result = text_result + "<br><br>최종 결과: [{}]".format(aList);
    document.getElementById("result").style.fontSize = "3vw";
    document.getElementById("result").innerHTML = text_result;
}









function* bubbleSort(data_list){
    for(var check = (data_list.length - 1); check > 0; check--){
        var xth = data_list.length - check;
        yield "<br><br><br>{}번째 정렬".format(xth);
        for(var i = 0; i < check; i++){
            var tmplist = data_list.slice();
            tmplist[i] = "<span class='green'>"+tmplist[i]+"</span>";
            tmplist[i+1] = "<span class='red'>"+tmplist[i+1]+"</span>";
            yield "<br><br>[{}]".format(tmplist);

            if(data_list[i] > data_list[i+1]){
                var temp = data_list[i];
                data_list[i] = data_list[i+1];
                data_list[i+1] = temp;
                
                tmplist = data_list.slice();
                tmplist[i] = "<span class='red'>"+tmplist[i]+"</span>";
                tmplist[i+1] = "<span class='green'>"+tmplist[i+1]+"</span>";
                yield "<br>[{}]".format(tmplist);
                
            }
        }
    }
}

function showBubble(alist){
    var text_result = "<br><br>버블 정렬(Bubble Sort)<br>";
    for(a of bubbleSort(alist)){
        text_result = text_result + a;
    }
    text_result = text_result + "<br><br><br><br>최종 결과: [{}]".format(alist);
    document.getElementById("result").innerHTML = text_result;
}








function* quickSort(data_list){
    yield* quickSortHip(data_list, 0, data_list.length - 1);
    yield "<br>최종 결과: [{}]".format(data_list);
}

function* quickSortHip(data_list, first, last){
    if(first < last){
        var partitionResult = yield* partition(data_list, first, last);
        var pivot = partitionResult[0];
        var splitpoint = partitionResult[1];
        var less = data_list.filter(x => x < pivot);
        var great = data_list.filter(x => x > pivot);

        yield* quickSortHip(data_list, first, splitpoint-1);
        yield* quickSortHip(data_list, splitpoint+1, last);

    }
}

function* partition(data_list, first, last){
    var showlist = data_list.slice();
    showlist[first] = "<span class='red'>"+showlist[first];
    showlist[last] = showlist[last]+"</span>";
    yield "현재 정렬 대상: [{}]<br>".format(showlist);

    var showRange = data_list.slice(first, last+1);
    var pivotvalue = data_list[first];
    var leftmark = first + 1;
    var rightmark = last;

    showRange[rightmark-first] = "<span class='red'>"+data_list[rightmark]+"</span>";
    showRange[leftmark-first] = "<span class='blue'>"+data_list[leftmark]+"</span>";
    showRange[first-first] = "<span class='green'>"+data_list[first]+"</span>";
    yield "{}<br>".format(showRange);

    var done = false;
    while(!done){

        while(leftmark <= rightmark && data_list[leftmark] <= pivotvalue){
            showRange[leftmark-first] = data_list[leftmark];
            leftmark = leftmark + 1;
            showRange[rightmark-first] = "<span class='red'>"+data_list[rightmark]+"</span>";
            showRange[leftmark-first] = "<span class='blue'>"+data_list[leftmark]+"</span>";
            yield "{}<br>".format(showRange);
        }

        while(data_list[rightmark] >= pivotvalue && rightmark >= leftmark){
            showRange[rightmark-first] = data_list[rightmark];
            rightmark = rightmark - 1;
            showRange[rightmark-first] = "<span class='red'>"+data_list[rightmark]+"</span>";
            showRange[leftmark-first] = "<span class='blue'>"+data_list[leftmark]+"</span>";
            yield "{}<br>".format(showRange);
        }

        if(rightmark < leftmark){
            done = true;
        } else {
            var temp = data_list[leftmark];
            data_list[leftmark] = data_list[rightmark];
            data_list[rightmark] = temp;
            showRange = data_list.slice(first, last+1);
            yield "{}<br>".format(showRange);
            showRange[first-first] = "<span class='green'>"+data_list[first]+"</span>";
            showRange[leftmark-first] = "<span class='blue'>"+data_list[leftmark]+"</span>";
            showRange[rightmark-first] = "<span class='red'>"+data_list[rightmark]+"</span>";
            yield "{}<br>".format(showRange);
        }
    }
    temp = data_list[first];
    data_list[first] = data_list[rightmark];
    data_list[rightmark] = temp;

    showRange = data_list.slice(first, last+1);
    showRange[first-first] = "<span class='red'>"+data_list[first]+"</span>";
    showRange[rightmark-first] = "<span class='green'>"+data_list[rightmark]+"</span>";
    yield "{}<br>".format(showRange);
    showRange = data_list.slice(first, last+1);
    yield "부분 정렬 결과: {}<br><br><br>".format(showRange);

    return [pivotvalue, rightmark];
}

function showQuick(alist){
    var text_result = "빠른 정렬(Quick Sort)<br><span class='green'>피봇(Pivot)</span> / <span class='blue'>leftmark</span> / <span class='red'>rightmark</span><br><span class='blueSmall'>leftmark가 정렬 대상 범위를 벗어난 경우: 피봇이 범위 내 가장 큰 값이어서 leftmark가 만족하는 값(피봇보다 큰 값)을 계속 찾기 위해 인덱스 범위를 초과한 것</span><br><br><br>";
    for(a of quickSort(alist)){
        text_result = text_result + a;
    }
    document.getElementById("result").innerHTML = text_result;
}