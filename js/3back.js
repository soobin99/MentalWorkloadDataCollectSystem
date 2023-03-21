var cnt = 0;
var maxCnt = 100;
var imageSequence = [];
var userAns = [];
var userClick = [];
var ansTime = [];
var num = 1;
var start;
var stop;

function getRandomInt() {
    var randNum = Math.random();
    if (cnt>3 && randNum <= 0.7){
        return imageSequence[cnt-2];
    }
    else{
        return Math.floor(randNum * 9) + 1;
    }
}

function changeImage() {
    $('#nBackImage').show();
    start = performance.now();
    imageSequence.push(num);
    addUserAns();
    return;
}

function hideImage() {
    $('#nBackImage').hide();
    num = getRandomInt();
    var imgUrl = 'nBackImage/' + num.toString() + '.svg';

    $('#nBackImage').attr('src', imgUrl);

}

function addUserAns() {
    userClick.push(0);
    ansTime.push(0);
    if (cnt < 3) {
        userAns.push(0);
    } else if (imageSequence[cnt] == imageSequence[cnt - 3]) {
        userAns.push(-1);
    } else if (imageSequence[cnt] != imageSequence[cnt - 3]) {
        userAns.push(1);
    }
}

function userAnsCheck() {
    if (cnt < 3) return;
    userClick[cnt] = 1;
    stop=performance.now();
    ansTime[cnt]=(stop-start);
    if (imageSequence[cnt] == imageSequence[cnt - 3]) {
        userAns[cnt] = 1;
    } else if (imageSequence[cnt] != imageSequence[cnt - 3]) {
        userAns[cnt] = -1;
    }
    return;
}
function downloadCSV(){
		var array = [];
        for(var i=0;i<imageSequence.length;i++){
            array.push({cnt:i, imageSequence: imageSequence[i], userAns: userAns[i], userClick: userClick[i], ansTime: ansTime[i]});
        }

		var a = "";
		$.each(array, function(i, item){
			a += item.cnt + "," + item.imageSequence + "," + item.userAns + "," + item.userClick + "," + item.ansTime + "\r\n";
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
		downloadLink.download = "3back_"+today.toString()+".csv";

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}

function updateSystem() {
    if (cnt < maxCnt) {
        setTimeout(function () {
            hideImage();
        }, 500); //0.5초 뒤 이미지 삭제
        setTimeout(function () {
            cnt += 1;
            changeImage();
        }, 2500); //2.5초 뒤 이미지 생

    } else {
        setTimeout(function () {
            hideImage();
            clearInterval(timerId);
        }, 500);
        setTimeout(function () {
            window.location.href = '../End.html';
            downloadCSV();
        }, 2500); //2.5초 뒤 이미지 생성
    }
    return;
}

$(document).ready(function () {
    $('#nBackImage').hide();
    $('#userAnsButton').hide();

    setTimeout(function () {
        $('#description').css("fontSize", '30px');
        $('#description').css("margin-top", '2%');
        $('#userAnsButton').show();

        changeImage();

        setTimeout(function () {
            hideImage();
        }, 500); //0.5초 뒤 이미지 삭제

    }, 3000);

    timerId = setInterval(updateSystem, 3000);
    //while (cnt <= maxCnt) {}
});


//setTimeout(function () {alert("hello");}, 3000);