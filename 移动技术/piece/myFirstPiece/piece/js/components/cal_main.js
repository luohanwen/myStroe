Date.prototype.toDayStr = Date.prototype.toDayStr || function() {
	var year = this.getFullYear();
	var mon = this.getMonth()+1;
	var day = this.getDate();
	return year + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
}

define( ["zepto", "i18n!components/nls/cube-calendar-local"], function($, localObj){
//(function($){


/*****************************************************************************
                                   日期资料
*****************************************************************************/

var lunarInfo=new Array(
0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,
0x4ae0,0xa5b6,0xa4d0,0xd250,0xd295,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,
0x497f,0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,
0x6566,0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,
0xd4a0,0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,
0x6ca0,0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,
0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,
0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,
0x95bf,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,
0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,
0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,
0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,
0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,
0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,
0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,
0x4b63,0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,
0x92e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,
0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,
0xb273,0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,
0xe968,0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,
0xd520);

var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
var nStr2 = new Array('初','十','廿','卅','□');
var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
var cmonthName = new Array('正','二','三','四','五','六','七','八','九','十','十一','腊');

//公历节日 *表示放假日
var sFtv = new Array(
"0101*元旦",
"0202 湿地",
//"0207 国际声援南非日",
"0210 气象",
"0214 情人",
//"0301 国际海豹日",
"0303 爱耳",
"0308 妇女",
"0312 植树",
"0314 警察",
"0315 权益",
//"0317 中国国医节 国际航海日",
"0321 森林",
//"0321 儿歌",
//"0322 世界水日",
"0323 气象",
//"0324 世界防治结核病日",
//"0325 全国中小学生安全教育日",
//"0330 巴勒斯坦国土日",
"0401 愚人",
"0407 卫生",
"0422 地球",
"0423 版权",
//"0424 亚非新闻工作者日",
"0501 劳动",
"0504 五四",
//"0505 碘缺乏病防治日",
"0508 红十",
"0512 护士",
"0515 家庭",
"0517 电信",
//"0518 博物",
//"0520 全国学生营养日",
"0523 牛奶",
"0531 无烟", 
"0601 儿童",
"0605 环境",
"0606 爱眼",
//"0617 防治荒漠化和干旱日",
//"0623 国际奥林匹克日",
"0625 土地",
"0626 反毒",
"0701 建党",
//"0702 国际体育记者日",
//"0707 中国人民抗日战争纪念日",
"0711 人口",
//"0730 非洲妇女日",
"0801 建军",
//"0808 中国男子节(爸爸节)",
//"0815 日本正式宣布无条件投降日",
//"0908 国际扫盲日 国际新闻工作者日",
"0910 教师",
//"0914 世界清洁地球日",
//"0916 国际臭氧层保护日",
"0918 事变",
"0920 爱牙",
"0927 旅游",
"1001*国庆",
//"1001 音乐",
//"1002 国际和平与民主自由斗争日",
"1004 动物",
//"1008 全国高血压日",
"1008 视觉",
"1009 邮政",
"1010 辛亥",
//"1013 世界保健日 国际教师节",
//"1014 世界标准日",
//"1015 国际盲人节(白手杖节)",
"1016 粮食",
//"1017 世界消除贫困日",
//"1022 世界传统医药日",
//"1024 联合国日 世界发展信息日",
//"1031 世界勤俭日",
//"1107 十月社会主义革命纪念日",
//"1108 中国记者日",
//"1109 全国消防安全宣传教育日",
//"1110 世界青年节",
"1111 光棍",
//"1112 孙中山诞辰纪念日",
//"1114 世界糖尿病日",
//"1117 国际大学生节 世界学生节",
//"1121 世界问候日 世界电视日",
//"1129 国际声援巴勒斯坦人民国际日",
//"1201 世界艾滋病日",
//"1203 世界残疾人日",
//"1205 国际经济和社会发展志愿人员日",
//"1208 国际儿童电视日",
"1209 足球",
"1210 人权",
"1212 西安",
//"1213 南京大屠杀(1937年)纪念日！紧记血泪史！",
"1221 篮球",
"1224 平安",
"1225 圣诞"
//,"1229 国际生物多样性日"
);

//某月的第几个星期几。 5,6,7,8 表示到数第 1,2,3,4 个星期几
var wFtv = new Array(
"0110 黑人",
//"0150 麻风日", //一月的最后一个星期日（月倒数第一个星期日）
"0520 母亲",
//"0530 全国助残日",
"0630 父亲",
"0932 和平",
//"0940 国际聋人节 世界儿童日",
//"0950 世界海事日",
"1011 住房",
"1013 减灾",
"1144 感恩");

//农历节日
var lFtv = new Array(
"0101*春节",
"0115 元宵",
//"0202 龙抬头节",
"0323 妈祖",
"0505 端午",
"0707 七夕",
"0815 中秋",
"0909 重阳",
"1208 腊八",
"1223 小年",
"0100*除夕");


/*****************************************************************************
                                      日期计算
*****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
 var i, sum = 348;
 for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
 return(sum+leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
 if(leapMonth(y)) return( (lunarInfo[y-1899]&0xf)==0xf? 30: 29);
 else return(0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
 var lm = lunarInfo[y-1900] & 0xf;
 return(lm==0xf?0:lm);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y,m) {
 return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}



//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

   var i, leap=0, temp=0;
   var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;

   for(i=1900; i<2100 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }

   if(offset<0) { offset+=temp; i--; }

   this.year = i;

   leap = leapMonth(i); //闰哪个月
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
      //闰月
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }

      //解除闰月
      if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

      offset -= temp;
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap)
         { this.isLeap = false; }
      else
         { this.isLeap = true; --i; }

   if(offset<0){ offset += temp; --i; }

   this.month = i;
   this.day = offset + 1;
}

function getSolarDate(lyear, lmonth, lday, isLeap) {
  var offset = 0;
  
  // increment year
  for(var i = 1900; i < lyear; i++) {
    offset += lYearDays(i);
  }

  // increment month
  // add days in all months up to the current month
  for (var i = 1; i < lmonth; i++) {
    // add extra days for leap month
    if (i == leapMonth(lyear)) {
      offset += leapDays(lyear);
    }
    offset += monthDays(lyear, i);
  }
  // if current month is leap month, add days in normal month
  if (isLeap) {
    offset += monthDays(lyear, i);
  }
   
  // increment 
  offset += parseInt(lday) - 1;

  var baseDate = new Date(1900,0,31);
  var solarDate = new Date(baseDate.valueOf() + offset * 86400000);
  return solarDate;
}


//==============================返回公历 y年某m+1月的天数
function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}

//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}


//============================== 阴历属性
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {

      this.isToday    = false;
      //瓣句
      this.sYear      = sYear;   //公元年4位数字
      this.sMonth     = sMonth;  //公元月数字
      this.sDay       = sDay;    //公元日数字
      this.week       = week;    //星期, 1个中文
      //农历
      this.lYear      = lYear;   //公元年4位数字
      this.lMonth     = lMonth;  //农历月数字
      this.lDay       = lDay;    //农历日数字
      this.isLeap     = isLeap;  //是否为农历闰月?
      //八字
      this.cYear      = cYear;   //年柱, 2个中文
      this.cMonth     = cMonth;  //月柱, 2个中文
      this.cDay       = cDay;    //日柱, 2个中文

      this.color      = '';

      this.lunarFestival = ''; //农历节日
      this.solarFestival = ''; //公历节日
      this.solarTerms    = ''; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y,n) {
   var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
   return(offDate.getUTCDate());
}





//============================== 返回阴历控件 (y年,m+1月)
/*
功能说明: 返回整个月的日期资料控件

使用方式: OBJ = new calendar(年,零起算月);

  OBJ.length      返回当月最大日
  OBJ.firstWeek   返回当月一日星期

  由 OBJ[日期].属性名称 即可取得各项值

  OBJ[日期].isToday  返回是否为今日 true 或 false

  其他 OBJ[日期] 属性参见 calElement() 中的注解
*/
function calendar(y,m) {

   var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2, tmp3;
   var cY, cM, cD; //年柱,月柱,日柱
   var lDPOS = new Array(3);
   var n = 0;
   var firstLM = 0;

   sDObj = new Date(y,m,1,0,0,0,0);    //当月一日日期

   this.length    = solarDays(y,m);    //公历当月天数
   this.firstWeek = sDObj.getDay();    //公历当月1日星期几

   ////////年柱 1900年立春后为庚子年(60进制36)
   if(m<2) cY=cyclical(y-1900+36-1);
   else cY=cyclical(y-1900+36);
   var term2=sTerm(y,2); //立春日期

   ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
   var firstNode = sTerm(y,m*2) //返回当月「节」为几日开始
   cM = cyclical((y-1900)*12+m+12);

   //当月一日与 1900/1/1 相差天数
   //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
   var dayCyclical = Date.UTC(y,m,1,0,0,0,0)/86400000+25567+10;

   for(var i=0;i<this.length;i++) {

      if(lD>lX) {
         sDObj = new Date(y,m,i+1);    //当月一日日期
         lDObj = new Lunar(sDObj);     //农历
         lY    = lDObj.year;           //农历年
         lM    = lDObj.month;          //农历月
         lD    = lDObj.day;            //农历日
         lL    = lDObj.isLeap;         //农历是否闰月
         lX    = lL? leapDays(lY): monthDays(lY,lM); //农历当月最后一天

         if(n==0) firstLM = lM;
         lDPOS[n++] = i-lD+1;
      }

      //依节气调整二月分的年柱, 以立春为界
      if(m==1 && (i+1)==term2) cY=cyclical(y-1900+36);
      //依节气月柱, 以「节」为界
      if((i+1)==firstNode) cM = cyclical((y-1900)*12+m+13);
      //日柱
      cD = cyclical(dayCyclical+i);

      //sYear,sMonth,sDay,week,
      //lYear,lMonth,lDay,isLeap,
      //cYear,cMonth,cDay
      this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cY ,cM, cD );
   }

   //节气
   tmp1=sTerm(y,m*2  )-1;
   tmp2=sTerm(y,m*2+1)-1;
   this[tmp1].solarTerms = solarTerm[m*2];
   this[tmp2].solarTerms = solarTerm[m*2+1];
   //if(m==3) this[tmp1].color = 'red'; //清明颜色

   //公历节日
   for(i in sFtv)
      if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
            if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = 'red';
         }

   //月周节日
   for(i in wFtv)
      if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            tmp1=Number(RegExp.$2);
            tmp2=Number(RegExp.$3);
            if(tmp1<5)
               this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
            else {
               tmp1 -= 5;
               tmp3 = (this.firstWeek+this.length-1)%7; //当月最后一天星期?
               this[this.length - tmp3 - 7*tmp1 + tmp2 - (tmp2>tmp3?7:0) - 1 ].solarFestival += RegExp.$5 + ' ';
            }
         }

   //农历节日
   for(i in lFtv)
      if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
         tmp1=Number(RegExp.$1)-firstLM;
         if(tmp1==-11) tmp1=1;
         if(tmp1 >=0 && tmp1<n) {
            tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
            if( tmp2 >= 0 && tmp2<this.length && this[tmp2].isLeap!=true) {
               this[tmp2].lunarFestival += RegExp.$4 + ' ';
               if(RegExp.$3=='*') this[tmp2].color = 'red';
            }
         }
      }


   //复活节只出现在3或4月
   if(m==2 || m==3) {
      var estDay = new easter(y);
      if(m == estDay.m)
         this[estDay.d-1].solarFestival = this[estDay.d-1].solarFestival+'复活';
   }

   //黑色星期五
   if((this.firstWeek+12)%7==5)
      this[12].solarFestival += '黑五';

   //今日
   //if(y==g_tY && m==g_tM) {this[g_tD-1].isToday = true;}

}




//======================================= 返回该年的复活节(春分后第一次满月周后的第一主日)
function easter(y) {

   var term2=sTerm(y,5); //取得春分日期
   var dayTerm2 = new Date(Date.UTC(y,2,term2,0,0,0,0)); //取得春分的公历日期控件(春分一定出现在3月)
   var lDayTerm2 = new Lunar(dayTerm2); //取得取得春分农历

   if(lDayTerm2.day<15) //取得下个月圆的相差天数
      var lMlen= 15-lDayTerm2.day;
   else
      var lMlen= (lDayTerm2.isLeap? leapDays(y): monthDays(y,lDayTerm2.month)) - lDayTerm2.day + 15;

   //一天等于 1000*60*60*24 = 86400000 毫秒
   var l15 = new Date(dayTerm2.getTime() + 86400000*lMlen ); //求出第一次月圆为公历几日
   var dayEaster = new Date(l15.getTime() + 86400000*( 7-l15.getUTCDay() ) ); //求出下个周日

   this.m = dayEaster.getUTCMonth();
   this.d = dayEaster.getUTCDate();

}

//====================== 中文日期
function cDay(d){
   var s;

   switch (d) {
      case 10:
         s = '初十'; break;
      case 20:
         s = '二十'; break;
         break;
      case 30:
         s = '三十'; break;
         break;
      default :
         s = nStr2[Math.floor(d/10)];
         s += nStr1[d%10];
   }
   return(s);
}



var worktime = {};
//worktime.y2011 = {"d0402":{"w":"上班"},"d0403":{"w":"放假"},"d0404":{"w":"放假"},"d0405":{"w":"放假"},"d0430":{"w":"放假"},"d0501":{"w":"放假"},"d0502":{"w":"放假"},"d0604":{"w":"放假"},"d0605":{"w":"放假"},"d0606":{"w":"放假"},"d0910":{"w":"放假"},"d0911":{"w":"放假"},"d0912":{"w":"放假"},"d1001":{"w":"放假"},"d1002":{"w":"放假"},"d1003":{"w":"放假"},"d1004":{"w":"放假"},"d1005":{"w":"放假"},"d1006":{"w":"放假"},"d1007":{"w":"放假"},"d1008":{"w":"上班"},"d1009":{"w":"上班"},"d1231":{"w":"上班"}};
//worktime.y2012 = {    "d0101": {        "w": "放假"    },    "d0102": {        "w": "放假"    },    "d0103": {        "w": "放假"    },    "d0121": {        "w": "上班"    },    "d0122": {        "w": "放假"    },    "d0123": {        "w": "放假"    },    "d0124": {        "w": "放假"    },    "d0125": {        "w": "放假"    },    "d0126": {        "w": "放假"    },    "d0127": {        "w": "放假"    },    "d0128": {        "w": "放假"    },    "d0129": {        "w": "上班"    },    "d0331": {        "w": "上班"    },    "d0401": {        "w": "上班"    },    "d0402": {        "w": "放假"    },    "d0403": {        "w": "放假"    },    "d0404": {        "w": "放假"    },    "d0428": {        "w": "上班"    },    "d0429": {        "w": "放假"    },    "d0430": {        "w": "放假"    },    "d0501": {        "w": "放假"    },    "d0622": {        "w": "放假"    },    "d0623": {        "w": "放假"    },    "d0624": {        "w": "放假"    },    "d0929": {        "w": "上班"    },    "d0930": {        "w": "放假"    },    "d1001": {        "w": "放假"    },    "d1002": {        "w": "放假"    },    "d1003": {        "w": "放假"    },    "d1004": {        "w": "放假"    },    "d1005": {        "w": "放假"    },    "d1006": {        "w": "放假"    },    "d1007": {        "w": "放假"    }};
//worktime.y2013 = {    "d0101": {        "w": "放假"    },    "d0102": {        "w": "放假"    },    "d0103": {        "w": "放假"    },    "d0105": {        "w": "上班"    },    "d0106": {        "w": "上班"    },    "d0209": {        "w": "放假"    },    "d0210": {        "w": "放假"    },    "d0211": {        "w": "放假"    },    "d0212": {        "w": "放假"    },    "d0213": {        "w": "放假"    },    "d0214": {        "w": "放假"    },    "d0215": {        "w": "放假"    },    "d0216": {        "w": "上班"    },    "d0217": {        "w": "上班"    },    "d0404": {        "w": "放假"    },    "d0405": {        "w": "放假"    },    "d0406": {        "w": "放假"    },    "d0407": {        "w": "上班"    },    "d0427": {        "w": "上班"    },    "d0428": {        "w": "上班"    },    "d0429": {        "w": "放假"    },    "d0430": {        "w": "放假"    },    "d0501": {        "w": "放假"    },    "d0608": {        "w": "上班"    },    "d0609": {        "w": "上班"    },    "d0610": {        "w": "放假"    },    "d0611": {        "w": "放假"    },    "d0612": {        "w": "放假"    },    "d0919": {        "w": "放假"    },    "d0920": {        "w": "放假"    },    "d0921": {        "w": "放假"    },    "d0922": {        "w": "上班"    },    "d0929": {        "w": "上班"    },    "d1001": {        "w": "放假"    },    "d1002": {        "w": "放假"    },    "d1003": {        "w": "放假"    },    "d1004": {        "w": "放假"    },    "d1005": {        "w": "放假"    },    "d1006": {        "w": "放假"    },    "d1007": {        "w": "放假"    },    "d1012": {        "w": "上班"    }};
worktime.y2011 = {"d0402":{"w":"班"},"d0403":{"w":"假"},"d0404":{"w":"假"},"d0405":{"w":"假"},"d0430":{"w":"假"},"d0501":{"w":"假"},"d0502":{"w":"假"},"d0604":{"w":"假"},"d0605":{"w":"假"},"d0606":{"w":"假"},"d0910":{"w":"假"},"d0911":{"w":"假"},"d0912":{"w":"假"},"d1001":{"w":"假"},"d1002":{"w":"假"},"d1003":{"w":"假"},"d1004":{"w":"假"},"d1005":{"w":"假"},"d1006":{"w":"假"},"d1007":{"w":"假"},"d1008":{"w":"班"},"d1009":{"w":"班"},"d1231":{"w":"班"}};
worktime.y2012 = {    "d0101": {        "w": "假"    },    "d0102": {        "w": "假"    },    "d0103": {        "w": "假"    },    "d0121": {        "w": "班"    },    "d0122": {        "w": "假"    },    "d0123": {        "w": "假"    },    "d0124": {        "w": "假"    },    "d0125": {        "w": "假"    },    "d0126": {        "w": "假"    },    "d0127": {        "w": "假"    },    "d0128": {        "w": "假"    },    "d0129": {        "w": "班"    },    "d0331": {        "w": "班"    },    "d0401": {        "w": "班"    },    "d0402": {        "w": "假"    },    "d0403": {        "w": "假"    },    "d0404": {        "w": "假"    },    "d0428": {        "w": "班"    },    "d0429": {        "w": "假"    },    "d0430": {        "w": "假"    },    "d0501": {        "w": "假"    },    "d0622": {        "w": "假"    },    "d0623": {        "w": "假"    },    "d0624": {        "w": "假"    },    "d0929": {        "w": "班"    },    "d0930": {        "w": "假"    },    "d1001": {        "w": "假"    },    "d1002": {        "w": "假"    },    "d1003": {        "w": "假"    },    "d1004": {        "w": "假"    },    "d1005": {        "w": "假"    },    "d1006": {        "w": "假"    },    "d1007": {        "w": "假"    }};
worktime.y2013 = {    "d0101": {        "w": "假"    },    "d0102": {        "w": "假"    },    "d0103": {        "w": "假"    },    "d0105": {        "w": "班"    },    "d0106": {        "w": "班"    },    "d0209": {        "w": "假"    },    "d0210": {        "w": "假"    },    "d0211": {        "w": "假"    },    "d0212": {        "w": "假"    },    "d0213": {        "w": "假"    },    "d0214": {        "w": "假"    },    "d0215": {        "w": "假"    },    "d0216": {        "w": "班"    },    "d0217": {        "w": "班"    },    "d0404": {        "w": "假"    },    "d0405": {        "w": "假"    },    "d0406": {        "w": "假"    },    "d0407": {        "w": "班"    },    "d0427": {        "w": "班"    },    "d0428": {        "w": "班"    },    "d0429": {        "w": "假"    },    "d0430": {        "w": "假"    },    "d0501": {        "w": "假"    },    "d0608": {        "w": "班"    },    "d0609": {        "w": "班"    },    "d0610": {        "w": "假"    },    "d0611": {        "w": "假"    },    "d0612": {        "w": "假"    },    "d0919": {        "w": "假"    },    "d0920": {        "w": "假"    },    "d0921": {        "w": "假"    },    "d0922": {        "w": "班"    },    "d0929": {        "w": "班"    },    "d1001": {        "w": "假"    },    "d1002": {        "w": "假"    },    "d1003": {        "w": "假"    },    "d1004": {        "w": "假"    },    "d1005": {        "w": "假"    },    "d1006": {        "w": "假"    },    "d1007": {        "w": "假"    },    "d1012": {        "w": "班"    }};


var festival_main = {
	"2013_01_01":"元旦",
	"2013_02_10":"春节" ,
	"2013_04_04":"清明节" ,
	"2013_05_01":"劳动节" ,
	"2013_06_12":"端午节",
	"2013_09_19":"中秋节",
	"2013_10_01":"国庆节"
	};
var HuangLi = {};
function showDetailBox(){
	$("#detailDialog").fadeIn(150);
}

var count_t =false; 
var now_time_bj = 0; 
/*
function clock(time){
		 
		 if(!count_t&&time){count_t=true; time *=1000;}  
  	 var bj = time?new Date(time):new Date();
  	 now_time_bj = bj.valueOf();
	  
	  setInterval(function(){
	  	   now_time_bj+=1000;
	  	   var d = new Date(now_time_bj);
	  	   	var str = d.getHours().toString().leftpad(2)+":"+d.getMinutes().toString().leftpad(2)+":"+d.getSeconds().toString().leftpad(2);
  	 			time_span.html(str);
  	 			
	  	},1000);
	  	$("#beijingTime").show();
}*/
var pResizeTimer = null;

	// Generic calendar body
	// @param: date elem_id
	var config = {
		start_on_monday : true
	};
	var record = {
		elem_id : "",
		nav_date : new Date()
	};
    
	//var cal_content='<div class="cal_header" id="cal_header"><div id="festival_sel" ><span style="color:#dedede;font-size:12px;margin-left:15px;line-height:28px;">节&nbsp;日&nbsp;安&nbsp;排</span><div id="festival_sel_btn"></div></div><div class="lunar_Info" id="lunar_Info"></div><div id="beijingTime"  style="float:left;color: white;line-height: 23px;height:26px;margin:38px 0px 0px 10px;display:none;"><span>北京时间：</span><span id="beijing_time"></span></div><div class="cal_today_btn"></div><div style="clear:both"></div><div id="day_select" class="day_select"><ul><li class="prev_btn" id="prev_btn"></li><li class="cal_year" id="cal_year">year</li><li id="sel_btn" class="sel_btn">	</li><li class="cal_month" m_v="0">1月</li><li class="cal_month" m_v="1">2月</li><li class="cal_month" m_v="2">3月</li><li class="cal_month" m_v="3">4月</li><li class="cal_month" m_v="4">5月</li><li class="cal_month" m_v="5">6月</li><li class="cal_month" m_v="6">7月</li><li class="cal_month" m_v="7">8月</li><li class="cal_month" m_v="8">9月</li><li class="cal_month" m_v="9">10月</li><li class="cal_month" m_v="10">11月</li><li class="cal_month" m_v="11">12月</li><li class="next_btn" id="next_btn">		</li></ul></div></div>
	var cal_hd = '<div id="cal_header" class="cal_header"><div id="day_select" class="day_select"><ul >' +
      '<li id="prev_year_btn" class="prev_btn">&lt;&lt;</li>' + 
      '<li id="prev_btn" class="prev_btn">&lt;</li>' +  
      '<li class="lunar_Info" id="lunar_Info"></li>' +
      '<li id="next_btn" class="next_btn">&gt;</li>' +
      '<li id="next_year_btn" class="next_btn">&gt;&gt;</li>' +
      '<li class="cal_today_btn" id="cal_return_btn">'+localObj['back']+'</li>' + 
      '</ul></div> </div>';
	var cal_content =  cal_hd + '<div class="cal_content" id="cal_content"></div><div id="open_sel_div"></div><div id="festival_sel_div"></div>';

	var detail_dialog = '<div id="detailDialog"><div id="detail_header"></div>' + 
      '<div  id="leftContent"></div><div id="rightContent"><div id="hl_yi"><div class="hl_yi"></div>' +
      '<div id="hl_yi_detail"></div></div><div style="clear:both;"></div><div id="hl_ji">' +
      '<div class="hl_ji"></div><div id="hl_ji_detail"></div></div><div style="clear:both"></div></div>' +
      '<div id="detail_footer"></div></div>';

	$.fn.init_cal = function(date,callback){
		if(!date) {
			date = new Date();
		}
		var _this = $(this);
		var w_ = $(window).width();
		if(w_ > 540)
			w_ = 540;
		_this.width(w_);
		//alert($(this).attr("id"));
		_this.html(cal_content);
		 //window.time_span = $("#beijing_time");
		//setTimeout(function(){$("head").append('<script src="http://utility.hao123.com/time.php?callback=clock"></script>');},10);
		
		
		_this.append(detail_dialog);
		var elem_id = 'cal_content';
		var input_date = new Date(date.valueOf());
		generic_cal(date,elem_id,callback,input_date, _this);
		record.elem_id = elem_id;
		record.nav_date = date_part(date);
		$("#cal_return_btn").click(function(){
			callback();
		});
		
		$("#cal_today_btn").click(function(){
			record.nav_date = date_part(new Date());
			generic_cal(record.nav_date,elem_id,callback,input_date, _this);
		});
		$("#day_select .cal_month").each(function(){
			$(this).click(function(){
				record.nav_date.setMonth($(this).attr("m_v"));
				generic_cal(record.nav_date,elem_id,callback,input_date, _this);
			});
		});
		$("#prev_btn").click(function(){
			record.nav_date = add_date(record.nav_date,-1,"month");
			generic_cal(record.nav_date,elem_id,callback,input_date, _this);
		});
    $("#prev_year_btn").click(function(){
      record.nav_date = add_date(record.nav_date,-1,"year");
      generic_cal(record.nav_date,elem_id,callback,input_date, _this);
    });
		$("#next_btn").click(function(){
			record.nav_date = add_date(record.nav_date,1,"month");
			generic_cal(record.nav_date,elem_id,callback,input_date, _this);
		});
    $("#next_year_btn").click(function(){
      record.nav_date = add_date(record.nav_date,1,"year");
      generic_cal(record.nav_date,elem_id,callback,input_date, _this);
    });
		$("#sel_btn,#cal_year").click(function(){
			templates.mousedown_hide_ele("open_sel_div");
			$("#open_sel_div").show();
		});
		$("#festival_sel").click(function(){
			templates.mousedown_hide_ele("festival_sel_div");
			$("#festival_sel_div").show();
		});
		//templates.init_sel_year();
		//templates.init_sel_festival();
		/*$(document).mouseleave(function(ev){
			clearTimeout(pResizeTimer);
			$("#detailDialog").hide();
		});
		$("#"+c_id).mouseleave(function(ev){
			clearTimeout(pResizeTimer);
			$("#detailDialog").hide();
		});*/
		
	};
	var generic_cal = function(date,elem_id,callback,input_date, cal_element){
		var preDate = new Date(date.valueOf());
		var _this = cal_element;
		if(window.cal_resize != 'undefined') {
			$(window).unbind('resize', window.cal_resize);
		}
		window.cal_resize = function() {
			_this.init_cal(preDate, callback);
		}
		$(window).resize(window.cal_resize);
		var date_cal = date || new Date();
		var cd=new Date();
		date_cal = date_part(date_cal);
		date_part(cd);
		var dd = start_date(date_cal);
		var ed = add_date(dd,1,"month");
		var sd = week_start(dd);
		var rows=Math.ceil((ed.valueOf()-sd.valueOf())/(60*60*24*1000*7));
		var w_ = $(window).width();
		if(w_ > 497)
			w_ = 497;

		var height=(Math.round(1 / rows * 1000000) / 10000)*282/100,width = w_/7;
		var str = new StringBuffer(),html = '';
		//str.append('<ul><li id="next_btn" class="next_btn">&gt;</li></ul>');
		str.append('<table class="cal_table" id="cal_table"><thead class="cal_thead"><tr>');
		//<th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th><th>周日</th>
		str.append('</tr></thead><tbody>');
		var wk_day = localObj.weekDaysShort;// ["一","二","三","四","五","六","日"];
		for (var j=0; j<7; j++){
			str.append('<th>').append(wk_day[j]).append('</th>');
		}
		// 节假日和节气

		try{
		//var image = "url(images/calendarBg_"+rows+".png)";
		//$(".cal_content").css("background",image);
		for (var i=0; i<rows; i++){
			str.append("<tr>");
				for (var j=0; j<7; j++){
					var date_detail = sd.toDayStr();//sd.getFullYear()+"-"+(sd.getMonth()+1)+"-"+sd.getDate();
					var s_m = sd.getMonth()+1,s_d =sd.getDate(), h_t = (s_m < 10? ('0' + s_m): s_m)+''+ (s_d < 10 ? ('0' + s_d) : s_d);
					var workT="";
					try{
						var work_T = worktime["y"+sd.getFullYear()];
						
						if(work_T)
							workT = work_T["d"+h_t];
					}catch(e)
					{}
					str.append("<td  day_v='").append(date_detail).append("' colNum=").append(j).append(" style='height:").append(height).append("px;width:").append(width).append("px;");
					var color = "";
					var l_d = templates.lunar_Info(sd);
					color = l_d.color;
					if(j==0)
						str.append("border-left:0px;");
					var cls = "",week_c = "";
					if (sd<dd)
					{
						cls='cal_before';
						color="";
					}
					else if (sd>=ed)
					{
						cls='cal_after';
						color = "";
					}
					else if (sd.valueOf()==cd.valueOf())
						cls='cal_now';
					else if (input_date && sd.valueOf() == input_date.valueOf()) {
						cls='cal_select';
					}
					if(sd.getDay()==0||sd.getDay()==6)
						week_c = 'cal_week';
					str.append("' class='").append(cls).append("' > ");
					//var cellIm = cellImage["d"+date_detail];
					str.append("<div class='cal_month_body ").append(week_c);
					/*if(cellIm)
					{
						str.append(" '  style='background-image:url(").append(cellIm.imageURL).append("); overflow:hidden;' title='").append(cellIm.imageDesc).append("'>");
					}else
					{*/
						str.append(" '  style='overflow:hidden;'>").append('<div class="grid_bg" style="display:none;z-index:0;width:95%;height:96%;position:relative;left:2px;top:1px;"></div>');
					//}
					
					if(workT)
					{
						var classN = "";
						//if(workT.w=="上班")
						if(workT.w=="班")
							classN = "workN";
						else
							classN = "rest";
            if(localObj["zh-cn"])
						str.append("<div class='").append(classN).append("'>").append(workT.w).append("</div>");
					}
					//临时调整节气
					switch(date_detail){
						case '2011-11-22':l_d.l_day='廿七';color="";break;
						case '2011-11-23':l_d.l_day='小雪';color="#32CD32";break;
						case '2012-1-1'  :l_d.l_day='元旦';color:"#46BAEC";break;
						case '2012-1-20':l_d.l_day='廿七';color="";break;
						case '2012-1-21':l_d.l_day='大寒';color="#32CD32";break;
					}
          if(! localObj["zh-cn"]) {
            l_d.l_day = "";
          }
					str.append("<div class='cal_num_day'>").append(templates.month_day(sd)).append("</div><div class='cal_lunar_day' style='color:").append(color).append("'>").append(l_d.l_day).append('</div></div></td>');
					sd=add_date(sd,1,"day");
				}
			str.append("</tr>");
		}
		}catch(e){
			alert(e.message);
		}
		str.append('</tbody></table>');
		
		$("#"+elem_id).html(str.toString());
		$("#cal_year").html(date_cal.getFullYear());
		$("#day_select .cal_month").each(function(){
			$(this).removeClass("month_selected");
			if($(this).attr("m_v")==date_cal.getMonth())
			{
				$(this).addClass("month_selected");
			}
		});
		//alert(templates.lunar_year(date_cal));
		//XXX
		/*if(date_cal.getFullYear()==2012 && date_cal.getMonth()==0){
			$("#lunar_Info").html("2012年1月 辛卯年【兔年】");
		}else{
			$("#lunar_Info").html(templates.lunar_year(date_cal));
		}*/
		$("#lunar_Info").html(templates.lunar_year(date_cal));
		/*
		 *yang:确定弹出层的位置，c_height+m_top>410 位置应为 c_top : m_top - c_height; c_height+m_top <410   c_top : m_top +5
		 *     m_left - c_width > 0 c_left = m_left - c_width  else  c_left = m_left
		 *  暂时将pos.x默认为鼠标相对于日历的坐标
		 */
		 var colNum =0 ;
		 if(false)
		$("#detailDialog").mouseover(function(ev){
			clearTimeout(pResizeTimer);
			var pos = utils.getMousePosition(ev);
			var c_height = $("#detailDialog").height();
					var c_width =  $("#detailDialog").width();
					var c_top=0,c_left=0;
					if(pos.y+c_height>=410)
					{
						c_top = pos.y-c_height-5;
					}
					else
					{
						c_top = pos.y+5;
					}
					var pos_x = colNum*width+Math.ceil(width/2)+20;
					if(pos_x-c_width>0)
					{
						c_left = pos_x - c_width+20;
					}
					else
					{
						if(pos_x+c_width>540)
						{
							c_left = 540-c_width-25;
						}
						else
						{
							c_left=pos_x-30;
						}
					}
					$("#detailDialog").hide();
					$("#detailDialog").css({"top":c_top,"left":c_left});
					pResizeTimer = setTimeout('showDetailBox()', 400);
		});
		//if(false)
		$("#cal_table td").each(function(){   
			// $(this).hover(
			// 	function(ev){
			// 		var $THIS = $(this);
			// 		setTimeout(function(){
			// 						$(".grid_bg").hide();
			// 						$THIS.find(".cal_month_body").children().filter(".grid_bg").show();
			// 			},1);
			// 	},
			// 	function(ev){
			// 		$(this).find(".cal_month_body").children().filter(".grid_bg").hide();
			// 	}
			// );
			$(this).click(
				function(ev) {
					var day = $(this).attr('day_v');
					var weekDay = $(this).attr('colNum');
					weekDay = (new Number(weekDay) + 1) % 7;
					if(callback &&  typeof (callback) == 'function') {
						callback.call(null,day,weekDay);
					}
				}
			);
		});
		if(false)
		$("#cal_table td").each(function(){   
			$(this).hover(
				function(ev){
					clearTimeout(pResizeTimer);
					var day = $(this).attr('day_v');
					hl_Dialog.generic_Content(day);
					var pos = utils.getMousePosition(ev);
			//		$(".cal_month_body").removeClass("grid_bg");
			//		$(this).find(".cal_month_body").addClass("grid_bg");
				//$("#grid_bg_info").remove();
			
				//	$(this).find(".cal_month_body").prepend('<div id="grid_bg_info" style="z-index:0;width:95%;height:96%;position:relative;left:2px;top:1px;"></div>');
					var c_height = $("#detailDialog").height();
					var c_width =  $("#detailDialog").width();
					var c_top=0,c_left=0;
					var p_l = 0,p_t = 0;  // 0 ：表示框在鼠标上面 1表示下  p_l :  0 表示框在鼠标左边  1表示左
					if(pos.y+c_height>=410)
					{
						c_top = pos.y-c_height-5;
						p_t = 0;
					}
					else
					{
						p_t = 1;
						c_top = pos.y+5;
					}
					var col_num = Number($(this).attr("colNum"));
					 colNum =col_num;
					var pos_x = col_num*width+Math.ceil(width/2)+20;
					if(pos_x-c_width>0)
					{
						c_left = pos_x - c_width+30;
						p_l=0;
					}
					else
					{
						if(pos_x+c_width>540)
						{
							c_left = 540-c_width-25;
							p_l=1;
						}
						else
						{
							c_left=pos_x-30;
							p_l=1;
						}
					}
					hl_Dialog.setPosition(p_l,p_t);
					var position = $("#detailDialog").position();
					$("#detailDialog").hide();
					$("#detailDialog").css({"top":c_top,"left":c_left});
					pResizeTimer = setTimeout('showDetailBox()', 400);
					var $THIS = $(this);
					setTimeout(function(){
									$(".grid_bg").hide();
									$THIS.find(".cal_month_body").children().filter(".grid_bg").show();
						},1)
				},
				function(ev){
					//var 
					/*for(var i in ev)
					{
						alert(i+"---"+ev[i]);
					}*/
					clearTimeout(pResizeTimer);
					var pos = utils.getMousePosition(ev);
					if(typeof ev.toElement !='undefined'){
						var te = ev.toElement;
						if(te.id=="detailDialog"||te.id=="leftContent"||te.id=="rightContent"||te.id=="detail_header"|| te.id=="detail_footer")
						{
							
							
							
						}else
						{
							//$(this).find(".cal_month_body").removeClass("grid_bg");
						$(this).find(".cal_month_body").children().filter(".grid_bg").hide();
							$("#detailDialog").hide();
							
						}
					}
					else
					{
						var tar = ev.relatedTarget;
						
						if(tar.id=="detailDialog"||tar.id=="leftContent"||tar.id=="rightContent"||tar.id=="detail_header"|| tar.id=="detail_footer")
						{
							
							
						}
						else
						{
							//$(this).find(".cal_month_body").removeClass("grid_bg");
							$(this).find(".cal_month_body").children().filter(".grid_bg").hide();
				//$("#grid_bg_info").remove();
						//console.log(0);
							$("#detailDialog").hide();
							
						}
					}
					//$("#detailDialog").hide();
				}
			);
			
		});
	
	};

	var hl_Dialog = {
		generic_Content : function(date){
			var d = date.split("-");
			var day = new Date(d[0],(d[1]-1),d[2],0,0,0,0);
			
			// add huangli left content
			var html = new StringBuffer();
			var info = templates.lunar_Info_detail(day);
			var info_f =  templates.lunar_Info(day);
			switch(date){
				case '2011-11-22':info_f.l_day_full='';break;
				case '2011-11-23':info_f.l_day_full='小雪';break;
				case '2012-1-1'  :info_f.l_day_full='元旦';break;
				case '2012-1-20' :info_f.l_day_full='';break;
				case '2012-1-21' :info_f.l_day_full='大寒';break;
				case '2012-1-22' :info_f.l_day_full='除夕';break;
				case '2012-1-23' :info_f.l_day_full='春节';break;
			}
			html.append('<div class="hl_num_left">').append(d[2]).append('</div><div class="header_right"><div class="hl_dayInfo">')
				.append(d[0]+'年'+d[1]+'月'+d[2]+'日').append(' 星期'+numToWeek(day.getDay())).append('</div>').append('<div class="detail_lunar">').append(info.lunar).append(' '+info.y_Info).append('</div></div><div style="clear:both;padding-left:80px;padding-right:4px;line-height:15px;color:red;">').append(info_f.l_day_full).append("</div>");//<div class="hl_week">').append('</div>');
			$("#leftContent").html(html.toString());
			var hl_h = new StringBuffer();
			
			hl_h.append('<div class="hl_h_lunar">').append(info.lunar).append('</div><div class="hl_h_lunar_detail">').append(info.y_Info).append('</div>');
			//$("#hl_header").html(hl_h.toString());
			$("#hl_yi_detail").html(info.huangliY);
			$("#hl_ji_detail").html(info.huangliJ);
		
		},
		// 设置detail框的箭头方向
		setPosition : function(p_l,p_t){  // p_t: 0表示框在鼠标上面 1表示下  p_l :  0 表示框在鼠标左边  1表示左
			$("#detail_header").removeClass();	
			$("#detail_footer").removeClass();	
			
			if(p_l==0&&p_t==1)   // 表示框在鼠标左下方
			{
				$("#detail_header").addClass("detail_top_right");
				$("#detail_footer").addClass("detail_down_normal");
			}
			if(p_l==0&&p_t==0)  // 左上
			{
				$("#detail_header").addClass("detail_top_normal");
				$("#detail_footer").addClass("detail_down_right");
			}
			if(p_l==1&&p_t==0)  // 右上
			{
				$("#detail_header").addClass("detail_top_normal");
				$("#detail_footer").addClass("detail_down_left");
			}
			if(p_l==1&&p_t==1)  // 右下
			{
				$("#detail_header").addClass("detail_top_left");
				$("#detail_footer").addClass("detail_down_normal");
			}
		
		}
	};
	///	<summary>
	///		This method is internal.
	///	</summary>
	/// <private />
	function StringBuffer(){
		this._strings = new Array();
	};
	var templates = {
		month_day : function(date){
			var d = date || new Date();
			return d.getDate();
		},
		lunar_Info : function(date){
			
			var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
			var day = date.getDate();
			var cld_day = cld[day - 1];
			var lunar_detail = {
				l_day : "",
				l_month : "",
				l_day_full:""
			};
			lunar_detail.l_day = cDay(cld_day.lDay);
			lunar_detail.l_month = cld_day.lMonth;
			lunar_detail.color = "";
			var s,s2;
			s=cld_day.lunarFestival;
			  if(s.length>0) { // 农历节日
				if(s.length>6)
				{
					s2 = s.toString();
					s = s.substr(0, 4)+'...';
				 }
				lunar_detail.color = "#32CD32";
			  }
			  else { // 廿四节气
				s=cld_day.solarTerms;
				s2=s.toString();
				if(s.length>0){
					  lunar_detail.color = "#32CD32";             
					  if((s =='清明')||(s =='芒种')||(s =='夏至')||(s =='冬至')){
						lunar_detail.color = "#32CD32";
						if(s =='清明') s = '清明';
					  }             
				}
				else 
				{ // 公历节日
					  s=cld_day.solarFestival;
					  s2 = s.toString();
					  if(s.length>0) {
						if(s.length>6)
						  {
							
							s = s.substr(0, 4)+'..';
						  }
						lunar_detail.color = "#46BAEC";
					  }
				}
			  }
			  if(s.length>0)
			  {
				  lunar_detail.l_day = s;
				  lunar_detail.l_day_full = s2;
			  }
			//var info = templates.getChinaNum(lunar_detail.l_month)+"月"+lunar_detail.l_day;
			 
			//var info = lunar_detail.l_day;
			return lunar_detail;
		},
		lunar_Info_detail : function(date){
			
			var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
			var year = date.getFullYear();
			var day = date.getDate();
			var cld_day = cld[day - 1];
			var festival=[];
			var info = {
				lunar:"",
				y_Info:"",
				huangliY:"无",
				huangliJ:"无"
			};
			info.lunar = '农历' + (cld_day.isLeap ? '闰 ' : '')+templates.getChinaNum(cld_day.lMonth)+"月"+ cDay(cld_day.lDay);
			info.y_Info = cld_day.cYear + '年 '+ cld_day.cMonth + '月 ' + cld_day.cDay + '日';
			try {
				if(year>2009&&year<2013) // 杨
				{
							if (eval("HuangLi.y" + year) == null) {
								var filename="http://www.365rili.com/js/huangli/"+year+".js";
								$.getScript(filename,function(){
									var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
										+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));

									info.huangliY = hl.y;
									info.huangliJ = hl.j;
								
								}); 
							}
							else
							{
								var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
										+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));
								info.huangliY = hl.y;
								info.huangliJ = hl.j;
								
							}
							
				}
				else
				{
					
				}
				
			} catch (e) {
				alert(e.message);
			}
			
			
			return info;
		},
		lunar_year : function(date){

			var l_year;
      if(localObj["zh-cn"])
        l_year = date.getFullYear()+'年'+(date.getMonth()+1)+'月 ';
      else l_year = date.getFullYear()+' '+ localObj.months[(date.getMonth()+1)];
			//+cyclical(date.getFullYear() - 1900 + 36) + '年【'+ Animals[(date.getFullYear() - 4) % 12] + '年】';
			return l_year;
		},
		getChinaNum :function(Num) {
			var monthEn;
			switch(Num){
				case 1 : monthEn = "一";break;
				case 2 : monthEn = "二";break;
				case 3 : monthEn = "三";break;
				case 4 : monthEn = "四";break;
				case 5 : monthEn = "五";break;
				case 6 : monthEn = "六";break;
				case 7 : monthEn = "七";break;
				case 8 : monthEn = "八";break;
				case 9 : monthEn = "九";break;
				case 10 : monthEn = "十";break;
				case 11 : monthEn = "十一";break;
				case 12 : monthEn = "腊";break;
			}
			return monthEn;
		},
		init_sel_festival : function(){
				var festival_m = festival_main;
				if(festival_main)
				{
					var str = new StringBuffer();
					str.append('<div id="festival_sel_body">');
					for(var i in festival_main){
							str.append('<div date="'+i).append('">').append(festival_main[i]+'</div>');
					}
					str.append('</div>');	
				}
				$("#festival_sel_div").html(str.toString());
				$("#festival_sel_body>div").each(function(){
					$(this).click(function(){
						var y = $(this).attr("date").split("_");
						
						record.nav_date.setFullYear(y[0]);
						record.nav_date.setMonth(Number(y[1])-1);
						generic_cal(record.nav_date,record.elem_id);
						$("#festival_sel_div").hide();
					});
					$(this).hover(function(){
						$(this).addClass("year_bg");
					},
					function(){
						$(this).removeClass("year_bg");
					});
			});
		},
		init_sel_year : function(){
			var str = new StringBuffer();
			str.append('<div id="sel_body">');
			for(var i=1900;i<2050;i++)
			{
				str.append('<div>').append(i).append('</div>');
			}
			str.append('</div>');
			
			// 设置日期选择的初始位置
			var scroll_top = record.nav_date.getFullYear()-1900;
			
			//$("#sel_body").attr("scrollTop",scroll_top*div_height);
			$("#open_sel_div").html(str.toString());
			//var div_height = $("#sel_body>div").height();
			$("#sel_body>div").each(function(){
				$(this).click(function(){
					var y = $(this).html();
					record.nav_date.setFullYear(y);
					generic_cal(record.nav_date,record.elem_id);
					$("#open_sel_div").hide();
				});
				$(this).hover(function(){
					$(this).addClass("year_bg");
				},
				function(){
					$(this).removeClass("year_bg");
				});
			});

		},
		mousedown_hide_ele : function(id){

			$(document).bind("mousedown."+id, function(r) {
				var p = r.target;
				var q = document.getElementById(id);
			
				while (true) {
						if (p == q) {
							return true
						} else {
							if (p == document) {
								$(document).unbind("mousedown."+id);
								$("#"+id).hide();
									return false
								} else {
									p = $(p).parent()[0]
								}
							}
						}
				});
		}
	};
	function numToWeek(inStr){
    return localObj.weekDaysShort[(inStr + 6) % 7];
		/*switch (inStr) {
			case 1:
				return '一';
			case 2:
				return '二';
			case 3:
				return '三';
			case 4:
				return '四';
			case 5:
				return '五';
			case 6:
				return '六';
			case 0:
				return '日';
		}*/
	}
	var utils = {
		getEvent : function(ev) {
			return window.event ? window.event : (ev ? ev : null);
		},
		getMousePosition : function(ev) {
			var evt = this.getEvent(ev);
			if (evt.pageX || evt.pageY) {
				return {
					x : evt.pageX,
					y : evt.pageY
				};
			}
			return {
				x : evt.clientX + document.documentElement.scrollLeft
						- document.documentElement.clientLeft,
				y : evt.clientY + document.documentElement.scrollTop
						- document.documentElement.clientTop
			};
		}
	};
	var cacheMgr = {
		cldCache : {}, // 注意！这里存的是calendarObj.js中定义的calendar对象，不是数据文件载入的cldObj
		getCld : function(year, month) {
			var key = getMonthKey(year, month);
			var cld = this.cldCache[key];
			if (typeof cld == 'undefined') {
				cld = new calendar(year, month);
				this.cldCache[key] = cld;
			}
			return cld;
		}
	}
	function getMonthKey(year, month) { // 传入的month为0-11的数值
			return year.toString() + (month + 1).toString().leftpad(2) // 返回yyyyMM格式的字符串
	}
	var date_part = function(date){
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);	
		return date;
	};
	String.prototype.leftpad = function(len, str){
		if (!str) {
			str = '0';
		}
		
		var s = '';
		for (var i = 0; i < len - this.length; i++) {
			s += str;
		}
		return s + this;
	};
	var week_start = function(date){
			var shift=date.getDay();
			if (config.start_on_monday){
				if (shift==0) shift=6
				else shift--;
			}
			return date_part(add_date(date,-1*shift,"day"));
	};
	var add_date = function(date,inc,mode){
		var ndate=new Date(date.valueOf());
		switch(mode){
			case "day": ndate.setDate(ndate.getDate()+inc); break;
			case "week": ndate.setDate(ndate.getDate()+7*inc); break;
			case "month": ndate.setMonth(ndate.getMonth()+inc); break;
			case "year": ndate.setYear(ndate.getFullYear()+inc); break;
			case "hour": ndate.setHours(ndate.getHours()+inc); break;
			case "minute": ndate.setMinutes(ndate.getMinutes()+inc); break;
			default:
				return new Date();
		}
		return ndate;
	};
	var start_date = function(date){
		date.setDate(1);
		return date_part(date);
	};
	StringBuffer.prototype.append = function(str){
		this._strings.push(str);
		return this;
	};
	StringBuffer.prototype.toString = function(){
		var str = arguments.length == 0 ? '' : arguments[0];
		return this._strings.join(str);
	};

//})(Zepto);
return $;
});
