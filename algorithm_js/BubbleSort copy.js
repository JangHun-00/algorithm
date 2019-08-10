String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };  

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
}