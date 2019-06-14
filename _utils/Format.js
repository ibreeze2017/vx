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