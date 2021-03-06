(function(){
    const HOST =  'https://weixin.jirengu.com'
    const DAYTIME_SEPERSTOR = 12  /*daytime_seperstor*/
    const ENTER_KEY = 13
    const DAY_MAPS = {
        "周一" : "Mon",
        "周二" : "Tue",
        "周三" : "Wed",
        "周四" : "Thu",
        "周五" : "Fri",
        "周六" : "Sat",
        "周日" : "Sun",
    }
    let myLocation;

    function formatTime(date){
        let currentHours = date.getHours()
        let currentMinutes = date.getMinutes()
        if(currentMinutes < 10){
            currentMinutes = '0' + currentMinutes
        }
        let suffix = currentHours > DAYTIME_SEPERSTOR ? 'pm' : 'am'
        return `${currentHours}:${currentMinutes} ${suffix}`
    }

    function getImgUrl(code){
        return `https://weixin.jirengu.com/images/weather/code/${code}.png`;
    }

    function setupTime(){
        let currentTime = new Date()
        let timeNode = document.getElementById('time')
        timeNode.textContent = formatTime(currentTime)
        setTimeout(setupTime, 60 * 1000)
    }
    setupTime()

    $.ajax(`${HOST}/weather/`)
        .done((info) => {
            console.log(info)
            let weather = info.weather[0]
            myLocation = weather['city_name']
            let localNode = document.getElementById('location')
            localNode.textContent = myLocation
            showWeather(weather)
        })
    document.addEventListener('keydown', (event) => {
        if(event.keyCode === ENTER_KEY) {
            let inputNode = document.getElementById('inp-city');
            let userInput = inputNode.value;



            $.ajax(`${HOST}/weather/cityid?location=${userInput}`)
                .done((res) => {
                    console.log(res)
                    let matchedCity = res.results[0];
                    let cityId = matchedCity.id;
                    $.ajax(`${HOST}/weather/now?cityid=${cityId}`)
                        .done((weatherInfo) => {
                            console.log(weatherInfo)
                            let weather = weatherInfo.weather[0];
                            showWeather(weather);
                        });
                });
        }
    });
    function showWeather(weather){
        let todayInfo = weather.now
        let tTempNode = document.getElementById('t-temp')
        tTempNode.textContent = todayInfo.temperature + '°'

        let stat= document.getElementById('t-text')
        stat.textContent = todayInfo.text

        let tImg = document.getElementById('t-img')
        tImg.src = getImgUrl(todayInfo.code)

        let tWind = document.getElementById('t-wind')
        tWind.textContent = '风力 '+ parseInt(todayInfo['wind_scale']) + '级'

        let tWindDir = document.getElementById('t-wind-d')
        tWindDir.textContent = '风向 '+ todayInfo['wind_direction']

        myLocation = weather['city_name']
        let localNode = document.getElementById('location')
        localNode.textContent = myLocation


        let futures = weather.future
        let fdates = document.querySelectorAll('#future .f-date')
        let fimgs = document.querySelectorAll('#future .f-img')
        let ftemps = document.querySelectorAll('#future .f-temp')

        fdates.forEach((fdate, index) => {
            let perDay = futures[index]
            fdate.textContent = DAY_MAPS[perDay.day]
            let fimg = fimgs[index]
            fimg.src = getImgUrl(perDay.code1)
            let ftemp = ftemps[index]
            ftemp.textContent = perDay.high + '°/ '+ perDay.low +'°'
        })
    }
})()