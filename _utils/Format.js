/**
 * 格式转换库
 * @author Administrator
 * 2017年1月12日0:34:59
 */
define(["require"],function(require){

    var Util = {
        Format : {},
        Color  : {},
    };
    /**
     * Util扩展函数
     * @param  {[object]} ext  [扩展对象]
     * @param  {[Util object]} item [Util对象]
     * @return {[type]}      [扩展后的对象]
     */
    Util.extend = function(ext,item){
        var $item = null;
        if(item==undefined){
            $item = Util;
        }else{
            for(var i in Util){
                if(Util[i]==item){
                    $item=Util[i];
                }else{
                    throw new SyntaxError("invalid item about Util");
                }
            }
        }
        if(typeof ext== "object"&&ext.name){
            $item[ext.name] = ext;
        }
        return this;
    }
    /**
     * 将字符串IP转成16进制形式
     * @param  {[string]} ipStr [ip字符串]
     * @return {[string]}       [十六进制ip值]
     */
    Util.Format.hexIp = function(ipStr){

        var ips=null,result="",temp=0;

        ips = ipStr.split(".");

        for(var i=ips.length-1;i>=0;i--){

            temp = parseInt(ips[i]).toString(16);

            if(temp.length<2)
                temp = "0"+temp;

            result += temp;

        }
        return "0x"+result;
    }
    /**
     * 将弧度转为角度
     * @param  {[Number]} arc [弧度]
     * @return {[Number]}     [角度值]
     */
    Util.Format.toAngle = function(arc){
        return arc/Math.PI*180;
    }
    /**
     * 将角度转为弧度
     * @param  {[Number]} angle [角度]
     * @return {[Number]}       [弧度值]
     */
    Util.Format.toArc = function(angle){
        return angle/180*Math.PI;
    }
    /**
     * 将16进制ip转为字符形式
     * @param  {[string]} ip32 [十六进制ip]
     * @return {[string]}      [ip字符串]
     */
    Util.Format.getIPAddress = function(ip32){
        var result=0,temp="",ips=[];
        for(var i=ip32.length-1;i>=2;i=i-2){
            temp = ip32[i-1]+""+ip32[i];
            temp = parseInt(temp,16);
            ips.push(temp)
        }
        return ips.join(".");
    }
     /**
         * 数字格式
         * @param number
         * @param decimals
         * @param dec_point
         * @param thousands_sep
         * @returns {string|*}
         */
    Util.Format.numberFormat = function(number, decimals, dec_point, thousands_sep) {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
    /**
     * 获取随机的十六进制颜色
     * @return {[string]} [颜色值]
     */
    Util.Color.getRandHexColor = function() {

        var result = "#";

        for(var i=0;i<6;i++){

            result += parseInt(Math.random()*16).toString(16);
        }
        return result;
    }
    /**
     * 获取随机的RGB【A】颜色
     * @param  {[boolean]} alpha [是否随机alpha通道]
     * @return {[string]}       [含RGB字符串]
     */
    Util.Color.getRandColor = function(alpha){
        if(alpha==undefined){
            alpha = false;
        }
        var result = [],mode = "rgb";
        for(var i=0;i<3;i++){
            result.push(parseInt(Math.random()*255));
        }
        if(alpha){
            if(!(typeof alpha!="number"&&alpha>=0&&alpha<=1)){
                alpha = Math.random();
            }
            result.push(alpha);
            mode = "rgba";
        }
        return mode+"("+result.join(",")+")";
    }
    /**
     * 将RGB字符串转为十六进制形式
     * @param  {[string]} rgbStr [rgb字符串]
     * @return {[string]}        [十六进制颜色值]
     */
    Util.Color.toHex = function(rgbStr){
        var reg = /((\d(\.\d*)?){1,3}\,?)/ig,
            temp="",
            result="#";
        var cls = rgbStr.match(reg);
        if(!cls) {
            return false;
        }
        if(cls.length > 4){
            cls.slice(0,3);
        }
        var len = cls.length;
        for(var i=0;i<len;i++){
            if(i<3) {
                temp = parseInt(cls[i]).toString(16);
            } else {
                temp = parseInt(+cls[i]*255).toString(16);
            }
            if(temp.length<2)
                temp = "0"+temp;
            result += temp;
        }
        return result;
    }
    /**
     * 将十六进制颜色转换为RGB(A)颜色
     * @param hexStr
     * @returns {*}
     */
    Util.Color.toRGB  = function(hexStr) {
        var start = hexStr.indexOf('#');
        var i=0;
        if(start == 0) {
            i=1;
        } else if(start != -1) {
            return false;
        }
        var store = [];
        for(i; i<hexStr.length -1; i+=2) {
            store.push(parseInt(hexStr.substr(i,2),16));
        }

        var ct = 'rgb' ;

        if(store.length == 4) {
            var l = store.length-1;
            store[l] = (store[l] / 255).toFixed(2);
            ct = 'rgba';
        }
        return  ct + '(' + store.join(',') + ')';
    }
    /**
     * 格式化CSS
     * @param ocss 原始CSS
     * @param flag 是否作压缩处理
     * @returns {string}
     */
    Util.Format.css = function(ocss,flag){
        var result = "";
        var flag = flag || false;
        var patt = /\s*([^\{\};]+?)\s*\{(.+?)}/g;
        var count = 0;
        var data = [],tmp;

        while((tmp = patt.exec(ocss)) !== null){

            data.push({
                s : tmp[1],
                p : tmp[2],
            })
        }
        var g = [];
        if(!flag){
            g[0] = " ";
            g[1] = "\r";
            g[2] = "\t";
        }else{
            g[2]=g[1]=g[0]="";
        }
        for(var i in data){
            var c = data[i];
            result += c.s+g[0]+"{"+g[1];
            var prosLines = c.p.split(";");
            for(var pl in prosLines){
                var line = prosLines[pl];
                line = line.replace(/[\n\r\t]/,"");
                if((/^\s*$/).test(line)){
                    continue;
                }
                result+=g[2]+line+";"+g[1];
            }
            result += "}"+g[1];
        }
        return result;
    }
    /**
     * @param str 待除空格的字符串
     * @param flag 是否除去所有空格
     * @param dir true表示除后方空格 false除前方空格
     * */
    Util.Format.trim = function(str,flag,dir){
        var result="";
        var flag = flag || false;
        var dir = dir === undefined?null:!!dir;
        if(!flag){
            var reg = null;
            if(dir===null) {
                //去除首尾空格
                reg = /^\s*(.*?)\s*$/;
            }else if(dir===false){
                //去头部空格
                reg = /^\s*(.*?)$/;
            }else{
                //去尾部空格
                reg = /^(.*?)\s*$/;
            }
            var data = reg.exec(str);
            console.log(data);
            result = data[1];
        }else{
            //去除全部空格
            result = str.replace(/\s*/g,"");
        }
        return result;
    }
    /**
     * 分割单词和中文解释
     * @param odata 原始混合串
     * @returns {Array} 英文中文对应数组
     */
    Util.Format.grepWordExplain = function (odata) {

        var reg = /((?:(?:[a-zA-Z]+)\s)+)\s*(.+)/g;

        var data = [],tmp;

        var dog = 0;

        while((tmp = reg.exec(odata)) !== null){

            data.push({
                en : tmp[1],
                cn : tmp[2],
            })
        }
        return data;
    }


    return Util;
})