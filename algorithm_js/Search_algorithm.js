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
        showSequentialSearch(target, plistbox);
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