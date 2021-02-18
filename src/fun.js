

export function fileUrl(fileId) {
  	return process.env.VUE_APP_FILE_URL + '/pbl/index/file?id=' + (fileId ? fileId : 0)
}

// 时间转换  年-月-日  时：分：秒

export function formatDate(timestamp,type=0) {
	if(!timestamp){
		return '--'
	}
    timestamp = timestamp+'';
    timestamp = timestamp.length==10?timestamp*1000:timestamp;
    let date = new Date(timestamp);
    let y = date.getFullYear();  
    let m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    let d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;  
    second = second < 10 ? ('0' + second) : second; 
    if(type==0){
        return y + '-' + m + '-' + d;  
    }else if(type==1){
        return y + '-' + m + '-' + d +' '+ h +':'+ minute;  
    }else if(type==2){
        return y + '-' + m + '-' + d +' '+ h +':'+ minute +':' + second;  
    }else if(type == 3){
		return y + '年' + m + '月' + d +'日 ';
	}else if(type==4){
        return y + '年' + m + '月' + d +'日 '+ h +':'+ minute;  
    }else if(type==5){
        return y + '年' + m + '月' + d +'日 '+ h +':'+ minute +':' + second;
    }else if(type==6){
		return h +':'+ minute ;
	}else if(type==7){
		return h +':'+ minute + ':' + second;
	}
}

/* stringTime为:年-月-日 时:分:秒 */
export function friendlyFormatTime(stringTime) {
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let month = day * 30;
    let time1 = new Date().getTime(); //当前的时间戳
    let time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
    let time = time1 - time2;

    let result = null;
    if (time < 0) {
        result = '--';
    } else if (time / month >= 1) {
        result = parseInt(time / month) + '月前';
    } else if (time / week >= 1) {
        result = parseInt(time / week) + '周前';
    } else if (time / day >= 1) {
        result = parseInt(time / day) + '天前';
    } else if (time / hour >= 1) {
        result = parseInt(time / hour) + '小时前';
    } else if (time / minute >= 1) {
        result = parseInt(time / minute) + '分钟前';
    } else {
        result = '刚刚';
    }
    return result;
}