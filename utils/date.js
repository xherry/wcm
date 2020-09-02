	// 获取未来一周信息
	const	getFutureDate = function(){
		function getDays(year, month) {
		  let days = [31,28,31,30,31,30,31,30,30,31,30,31] 
		  if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
					days[1] = 29
		  }
		　　return days[month]  
		}
		function xdate(date){
			// let xdate;
			if(date<10){
			  return	 '0' + date
			}else{
				return  date
			}
		}
		let todayWeek = new Date().getDay();//获取当前星期
		let today = new Date().getDate()+1;//获取当前日期 
		let xday = xdate(today)
		let month = new Date().getMonth()+1;//获取当前月份
		let xmonth = xdate(month);
		let year = new Date().getFullYear();//获取当前年份
		let theMonths = getDays(year,month-1);//获取当前月份的总天数
		let futureWeeks = [];
		for(let i=0;i<7;i++){ //获取未来一周的日期信息
			let futureweek = {
				day:Number(xday)+i > Number(theMonths) ? xdate((Number(xday)+i)-Number(theMonths)): xdate(Number(xday)+i),
				theMoth: Number(xmonth),
				year:year,
				wm:'',
				wmId:'',
			};
			futureWeeks.push(futureweek);
		}
		let index = -1;
		futureWeeks.forEach((item,i)=>{
			if(item.day==theMonths){
				index = Number(i);
			}
		})
		if(index!=-1){
			for(let i=index+1,y=0;i<7,y<7-index-1;i++,y++){
				if(month==12){
					futureWeeks[i].theMoth = xdate(y+1);
					 futureWeeks[i].year = Number(year+1);
				}else{
					futureWeeks[i].theMoth = xdate((Number(month)+1))
				}
			}
		}
		return futureWeeks;
	};
	const toDate = function(tem){
		if(tem){
			var date = new Date(tem);
		}else{
			var date = new Date()
		}
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		var h = date.getHours() ;
		var m = date.getMinutes() ;
		var s = date.getSeconds();
		if(h<10){
			h = '0'+h
		}
		if(m<10){
			m = '0'+m
		}
		if(tem){
			return (Y + M + D + " " + h+':'+m+':'+s);
		}else{
			return (Y + M + D + " " + h+':'+m);
		}
	}	
module.exports = {
  getFutureDate: getFutureDate,
	toDate:toDate
}
