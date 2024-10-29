// text style 
{/* <h2 class="text-[1.8rem] roboto-black my-[1em] text-[var(--colorFour)]">Weather App</h2> */}

const API_KEY = '88266b22c7794d92c3ca67d03e2fc369'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

document.addEventListener('DOMContentLoaded',function(){
   
const searchButton = document.querySelector('button')
const resultInsertContainer = document.getElementById('resultInsertContainer');


searchButton.addEventListener('click',function(){
    // inputBox -> city 
    const inputBoxValueTrim = document.getElementById('inputBox').value.trim()
    if(!inputBoxValueTrim) return showError('enter city name')
    const encodedInput = encodeURIComponent(inputBoxValueTrim)
    fetchData(encodedInput)
})


})

function showData(...data){
    // console.log(data[0]);
    
      // temp value is kelvin value 
    //    kelvin  (273.15 k) value to degree  converting   (temp - 273.15) result celsius
    const kelvinValue = 273.15
    const celsius = Math.round(data[0]?.main?.temp-kelvinValue);
    const windSpeed = Math.round(data[0]?.wind?.speed)
    
    resultInsertContainer.children[0].children[1].innerText= (celsius) ? `${celsius} \u00B0C` :`....`
    resultInsertContainer.children[1].children[1].innerText= (data[1]) ? `${data[1]}` : `......`
    resultInsertContainer.children[2].children[1].innerText= (windSpeed) ? `${windSpeed} \u006d\u002f\u0073` : `.....`
}

async function fetchData(cityName){
   document.getElementById('inputBox').value=''
   const response = await  fetch(`${BASE_URL}?q=${cityName}&appId=${API_KEY}`)
   if(!response.ok) throw new Error("Response Error:");
   const data = await response.json()
   return showData(data,cityName);
}

function showError(err){
   alert(err)
}