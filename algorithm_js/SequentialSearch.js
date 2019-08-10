String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };  

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
    yield "해당 리스트 내에는 숫자 {}이 존재하지 않음".format(target);
    return -1;
}

function showSequentialSearch(alist){
    var text_result = "<br><br><br>순차 탐색(Sequential Search)<br>";
    for(a of SequentialSearch(alist)){
        text_result = text_result + a;
    }
    document.write(text_result);
}

showSequentialSearch([3,5,10,12,14,16,19,30,42,45,46,47,53,55,62,69,70]);