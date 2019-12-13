console.log('유틸');

Date.prototype.getCusDay = function(dot){
    var result = '',
    dot = dot || '-';
    try {
        var year = this.getFullYear()+'',
        month = this.getCusMonth(),
        day = this.getCusDate();

        result = year + dot + month + dot + day;

    } catch (e) {
        return '';
    }
    return result;
};
Date.prototype.getCusMonth = function(){
    var value = (this.getMonth()+1).toString();
    if(value.length == 1){
        value = '0'+value;
    }
    return value;
};
Date.prototype.getCusDate = function(){
    var value = this.getDate().toString();
    if(value.length == 1){
        value = '0'+value;
    }
    return value;
};
Date.prototype.getCusTime = function(setTime){
    var result = '';

    if( typeof setTime !== 'object' || !setTime){
        setTime = {};
    }

    try {
        result = this.getCusHours()+':'+this.getCusMinutes()+':'+this.getCusSeconds();
    } catch (e) {
        console.log(e);
        return '';
    }
    return result;
};
Date.prototype.getCusFull = function(centerDotType){
    var result = '';
    centerDotType = centerDotType || 'T';
    try {
        result = this.getCusDay()+centerDotType+this.getCusTime();
    } catch (e) {
        return false;
    }
    return result;
};

Date.prototype.getCusHours = function(){
    var value = this.getHours().toString();
    if(value.length == 1){
        value = '0'+value;
    }
    return value;
};


Date.prototype.getCusMinutes = function(){
    var value = this.getMinutes().toString();
    if(value.length == 1){
        value = '0'+value;
    }
    return value;
};

Date.prototype.getCusSeconds = function(){
    var value = this.getSeconds().toString();
    if(value.length == 1){
        value = '0'+value;
    }
    return value;
};

// 인자의 날짜가 현재 날짜보다 크면 true 반환
Date.prototype.toUpperDate = function(toDates){

    if(toDates.getTime() >= this.getTime()){
        return true;
    }

    return false;
};

// Date.prototype.toIncludeUpDay = function(toDates){
//
//     var dayDate = new Date(this.getCusDay() + ' 00:00:00');
//
//     if(toDates.getTime() >= dayDate.getTime()){
//         return true;
//     }
//
//     return false;
// };

String.prototype.getInt = function(){
    return parseInt(this);
};
