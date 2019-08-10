String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };

function* MergeSort(alist){
    var tmplist = alist.slice();
    yield "<br><br>[{}]에 대한 MergeSort 함수 시작<br>".format(alist);
    if(alist.length > 1){
        yield "[{}]는 길이가 2 이상이므로, 좌우로 나누어 재귀함수 실행<br>".format(tmplist);
        var mid = parseInt(alist.length / 2, 10);
        var lefthalf = alist.slice(0, mid);
        var righthalf = alist.slice(mid);

        yield "[{}]의 lefthalf: [{}], righthalf: [{}]에 대한 재귀함수 실행<br>".format(tmplist, lefthalf, righthalf);
        yield* MergeSort(lefthalf);
        yield* MergeSort(righthalf);
        yield "<br><br>[{}]의 lefthalf와 righthalf에 대한 재귀함수 종료.<br>현재 lefthalf: [{}], righthalf: [{}]<br>".format(tmplist, lefthalf, righthalf);

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
            yield "현재 alist: [{}]<br><br>".format(alist);
        }
        while(i < lefthalf.length){
            yield "righthalf의 원소들은 정렬 종료, 남은 lefthalf의 원소들도 alist에 넣기<br>"
            alist[k] = lefthalf[i];
            i = i + 1;
            k = k + 1;
            yield "현재 alist: [{}]<br><br>".format(alist);
        }
        while(j < righthalf.length){
            yield "lefthalf의 원소들은 정렬 종료, 남은 righthalf의 원소들도 alist에 넣기<br>"
            alist[k] = righthalf[j];
            j = j + 1;
            k = k + 1;
            yield "현재 alist: [{}]<br><br>".format(alist);
        }
    }
    yield "[{}]에 대한 MergeSort 함수 결과: [{}]<br>".format(tmplist, alist);
}

aList = [8,4,7,3,5,2,9];
var text_explain = "";
for(a of MergeSort(aList)){
    text_explain = text_explain + a;
}
document.write(text_explain);
