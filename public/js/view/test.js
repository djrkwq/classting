
var sy = function(vName, vSex){
    var name = vName,
    sex = vSex;

    this.getName = function(){
        return name;
    };

    this.getSex = function(){
        return sex;
    };
};

sy.prototype.action = function(){
    // 행동
};


var sy_r = new sy('세영', '여자'), sy_l = new sy('석영', '남자');
