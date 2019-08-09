
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
        showSelection(plistbox);
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
            document.getElementById("selection {}".format(ll)).innerHTML = "{}번째 정렬 종료: [ {} ]<br><br>".format(turn, nowList.slice(0, -1));
        }
        ll = ll + 1;
    }
}


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