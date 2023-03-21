var cnt = 0;
var maxCnt = 10;//200;
var numberSequence = [];
var userAns = [];
var num1 = 1;
var num2 = 1;
var userClick = [];
var ansTime = [];
var start;
var stop;


function getRandomInt() {
    var randNum = Math.random();
    if (cnt>1 && randNum <= 0.4){
        num1 = Math.floor(Math.random() * (20-numberSequence[cnt-1]-1)) + 1;
        num2 = 20-numberSequence[cnt-1]-num1;
        if(num2<1) num2=1;
    }
    else{
        num1 = Math.floor(Math.random() * 9) + 1;
        num2 = Math.floor(Math.random() * 9) + 1;
    }
}

function changeNum() {
    $('#number').show();
    start = performance.now();
    numberSequence.push(num1 + num2);
    addUserAns();
    return;
}

function hideNum() {
    $('#number').hide();
    getRandomInt();
    $('#num1').text(num1.toString());
    $('#num2').text(num2.toString());

}

function addUserAns() {
    userClick.push(0);
    ansTime.push(0);
    if (cnt == 0) {
        userAns.push(0);
    } else if (numberSequence[cnt] + numberSequence[cnt - 1] == 20) {
        userAns.push(-1);
    } else {
        userAns.push(1);
    }
}

function userAnsCheck() {
    userClick[cnt-1] = 1;
    stop=performance.now();
    ansTime[cnt-1]=(stop-start);

    if (numberSequence[cnt-1] + numberSequence[cnt - 2] == 20) {
        userAns[cnt-1] = 1;
    } else {
        userAns[cnt-1] = -1;
    }
    return;
}
function downloadCSV(){
		var array = [];
        for(var i=0;i<numberSequence.length;i++){
            array.push({cnt:i, numberSequence: numberSequence[i], userAns: userAns[i], userClick: userClick[i], ansTime: ansTime[i]});
        }

		var a = "";
		$.each(array, function(i, item){
			a += item.cnt + "," + item.numberSequence + "," + item.userAns + "," + item.userClick + "," + item.ansTime + "\r\n";
		});

		// jquery 사용하지 않는 경우
		/* for(var i=0; i<array.length; i++){
			a += array[i].name + "," + array[i].age + "," + array[i].test + "\r\n";
		} */

		var downloadLink = document.createElement("a");
		var blob = new Blob([a], { type: "text/csv;charset=utf-8" });
		var url = URL.createObjectURL(blob);
		downloadLink.href = url;
        let today = new Date();
		downloadLink.download = "arithmetic2_"+today.toString()+".csv";

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}

function updateSystem() {
    if (cnt < maxCnt) {
    setTimeout(function () {
        hideNum();
    }, 500); //0.5초 뒤 이미지 삭제
    setTimeout(function () {
        changeNum();
        cnt += 1;
    }, 2500); //2.5초 뒤 이미지 생성
    }
    else{
        setTimeout(function () {
            hideNum();
            clearInterval(timerId);
        }, 500);
        setTimeout(function () {
            location.href = '../End.html';
            downloadCSV();
        }, 2500); //2.5초 뒤 이미지 생성
    }
    return;
}

$(document).ready(function () {
    $('#number').hide();
    $('#userAnsButton').hide();

    setTimeout(function () {
        $('#description').css("fontSize", '30px');
        $('#description').css("margin-top", '2%');
        $('#userAnsButton').show();
    }, 3000);

    timerId = setInterval(updateSystem, 3000);
    //while (cnt <= maxCnt) {}
});



//setTimeout(function () {alert("hello");}, 3000);