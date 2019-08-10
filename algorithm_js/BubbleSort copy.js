String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };  

function* bubbleSort(data_list){
    for(var check = (data_list.length - 1); check > 0; check--){
        var xth = data_list.length - check;
        yield "<br><br>{}번째 정렬<br>".format(xth);
        for(var i = 0; i < check; i++){
            if(data_list[i] > data_list[i+1]){
                var temp = data_list[i];
                data_list[i] = data_list[i+1];
                data_list[i+1] = temp;
            }
        }
    }
}

alist = [77, 42, 35, 12, 101, 5];
bubbleSort(alist);
document.write(alist);