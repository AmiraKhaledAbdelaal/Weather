let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let daytoday=document.getElementById('daytoday')
let monthtoday=document.getElementById('monthtoday')
let locationtoday=document.getElementById('locationtoday')
let temp1=document.getElementById('temp1')
let imgtoday=document.getElementById('imgtoday')
let texttoday=document.getElementById('texttoday')
let humidity=document.getElementById('humidity')
let gust_mph=document.getElementById('gust_mph')
let compass=document.getElementById('compass')
let dayafter=document.getElementsByClassName('dayafter')
let maxtemp=document.getElementsByClassName('maxtemp')
let mintemp=document.getElementsByClassName('mintemp')
let imgnext=document.getElementsByClassName('imgnext')
let textblue=document.getElementsByClassName('text-blue')
let searchbar=document.getElementById('search-bar')
let currentvalue="cairo"
let btn=document.getElementById('btn1')



let arrayapi
async function getapi(city){
    let responseapi =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6b0a24650a534618b9102915231708&q=${city}&days=3&aqi=no&alerts=no`)
    arrayapi= await responseapi.json()
    // console.log(arrayapi);
    getweatherday()
}
getapi(currentvalue)

 function getweatherday(){
    
    let date=new Date()
    daytoday.innerHTML=days[date.getDay()]
    monthtoday.innerHTML=`${date.getDate()} ${month[date.getMonth()]}`

    locationtoday.innerHTML= arrayapi.location.name
    temp1.innerHTML=`${arrayapi.current.temp_c}<sup>0</sup>C`
    // imgtoday.setAttribute("src", arrayapi.current.condition.icon)
    imgtoday.setAttribute("src",`https:${arrayapi.current.condition.icon}`)

    texttoday.innerHTML=arrayapi.current.condition.text
    humidity.innerHTML=arrayapi.current.humidity+'%'
    gust_mph.innerHTML=arrayapi.current.wind_kph+'km/h'
    compass.innerHTML=arrayapi.current.wind_dir

    dayafter.innerHTML=days[date.getDay()+1]

    let forcastt=arrayapi.forecast.forecastday
    
    for(let i=0; i<2; i++){
        dayafter[i].innerHTML=days[new Date (forcastt[i+1].date).getDay()]
        
        maxtemp[i].innerHTML=`${forcastt[i+1].day.maxtemp_c}<sup> 0</sup>C`
        mintemp[i].innerHTML=`${forcastt[i+1].day.mintemp_c}<sup> 0</sup>`
        imgnext[i].setAttribute("src",`https:${forcastt[1].day.condition.icon}`)
        textblue[i].innerHTML=forcastt[i+1].day.condition.text
        

    }

}
searchbar.addEventListener("keyup",function(){
    currentvalue=searchbar.value
    console.log(currentvalue)
    getapi(currentvalue)


})

