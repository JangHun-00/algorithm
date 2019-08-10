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

function startSearch(){
    var targetbox = document.querySelector("#target-number");
    var target = parseInt(targetbox.value);
    var targetBoolean = true;

    if(target == NaN){
        alert("찾는 값을 숫자로 입력해주세요.")
        targetbox.value = "";
        targetbox.select();
        targetBoolean = false;
    }

    var plistbox = eval(document.querySelector("#sort-list").value);
    if(listOrNot(plistbox) && numberOrNot(plistbox) && targetBoolean){
        var option = document.querySelector("#SearchOption").value;
        switch(option){
            case "Sequential": showSequentialSearch(target, plistbox);
            break;
            case "Binary": showBinarySearch(plistbox, target);
            break;
            case "NoChoice": alert("탐색 종류를 선택해주세요.");
            break;
        default: alert("오류가 발생했습니다.");
        }
    }
}

function* SequentialSearch(target, data_list){
    var index = 0;
    while(index < data_list.length){
        var tmplist = data_list.slice();
        if(target == data_list[index]){
            tmplist[index] = "<span class='green'>"+tmplist[index]+"</span>";
            yield "[{}]<br>{}번째 인덱스에서 찾는 값 {} 탐색 완료".format(tmplist, index, target);
            return index;
        }
        tmplist[index] = "<span class='red'>"+tmplist[index]+"</span>"
        yield "[{}]".format(tmplist);
        index += 1;
    }
    yield "<br>해당 리스트 내에는 숫자 {}이 존재하지 않음".format(target);
    return -1;
}

function showSequentialSearch(target, alist){
    var text_result = "<br>순차 탐색(Sequential Search)<br><br>";
    for(a of SequentialSearch(target, alist)){
        text_result = text_result + a;
    }
    document.getElementById("result").innerHTML = text_result;
}

function* binary_search(array, value){
    var showArray = array.slice();
    var first = 0;
    var last = array.length - 1;
    var found = -9;
    while(first <= last && found == -9){
        var mid = parseInt((first + last) / 2, 10);
        showArray[mid] = "<span class='red'>"+showArray[mid]+"</span>";
        if(first != mid){
            showArray[first] = "<span class='blue'>"+showArray[first]+"</span>";
        }
        if(mid != last){
            showArray[last] = "<span class='blue'>"+showArray[last]+"</span>";
        }
        yield "[{}]<br>".format(showArray);
        if(array[mid] == value){
            showArray[first] = array[first];
            showArray[last] = array[last];
            showArray[mid] = "<span class='green'>"+array[mid]+"</span>";
            found = mid;
            yield "[{}]<br>".format(showArray);
        } else {
            showArray[first] = array[first];
            showArray[last] = array[last];
            showArray[mid] = array[mid];

            if(value < array[mid]){
                showArray[mid] = "<span class='grey'>"+showArray[mid];
                showArray[last] = showArray[last]+"</span>";
                last = mid - 1;
                yield "찾는 값 {}은 현재 중간값 {}보다 작음".format(value, array[mid]);
                yield "[{}]<br>".format(showArray);
            } else {
                showArray[first] = "<span class='grey'>"+showArray[first];
                showArray[mid] = showArray[mid]+"</span>";
                first = mid + 1;
                yield "찾는 값 {}은 현재 중간값 {}보다 큼".format(value, array[mid]);
                yield "[{}]<br>".format(showArray);
            }
        }
        yield "<br><br>";
    }
    if(found == -9){
        yield "찾는 값 {}은 리스트 내 존재하지 않음".format(value);
        return false;
    } else {
        yield "찾는 값 {}은 리스트 내 {}번째 인덱스에 존재".format(value, found);
        return true;
    }
}

function showBinarySearch(alist, target){
    var text_result = "<br>이진 탐색(Binary Search)<br>탐색 범위 <span class='blue'>처음(first), 마지막(last) 값</span> / <span class='red'>중간값(mid)</span><br><br>";
    for(a of binary_search(alist, target)){
        text_result = text_result + a;
    }
    document.getElementById("result").innerHTML = text_result;
}