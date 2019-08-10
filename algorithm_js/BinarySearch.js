String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };  
/*
function binary_search(array, value){
    var first = 0;
    var last = array.length - 1;
    var found = -9;
    while(first <= last && found == -9){
        var mid = parseInt((first + last) / 2, 10);
        if(array[mid] == value){
            found = mid;
        } else {
            if(value < array[mid]){
                last = mid - 1;
            } else {
                first = mid + 1;
            }
        }
    }
    if(found == -9){
        document.write("탐색 실패");
        return false;
    } else {
        document.write("탐색 성공");
        return true;
    }
}
*/

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
            if(first != last){
                showArray[last] = "<span class='blue'>"+showArray[last]+"</span>";
            }
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
                yield "[{}]<br>".format(showArray);
            } else {
                showArray[first] = "<span class='grey'>"+showArray[first];
                showArray[mid] = showArray[mid]+"</span>";
                first = mid + 1;
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

var klist = [3,5,10,12,14,16,19,30,42,45,46,47,53,55,62,69,70];