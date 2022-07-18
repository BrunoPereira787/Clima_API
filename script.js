
const divClimate = ({name, country, temp, feelsLike, max, min, description}) => {

    const div = document.createElement('div')
    div.innerHTML += `
        <h4 class="mb-1 sfw-normal">${name}, ${country}</h4>
        <p class="mb-2">Current temperature: <strong class="temp">${temp}°C</strong></p>
        <p>Feels like: <strong>${feelsLike}°C</strong></p>
        <p>Max: <strong>${max}°C</strong>, Min: <strong>${min}°C</strong></p>

        <div class="d-flex flex-row align-items-center">
            <p class="mb-0 me-4">${description}</p>
            <i class="fas fa-cloud fa-3x" style="color: #eee;"></i>
        </div>
    `

    document.querySelector('[data-js="card"]').appendChild(div)
}


const loadAPI = async () =>{
    const input = document.querySelector('[data-js="input"]').value
    if(input === '') return

    input.replaceAll(" ","%20")

    const key = 'b67a8d230e01d38f6b051cfb9efa5df6'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${key}`

    const resultado = await fetch(url)
    const json = await resultado.json()

    if(json.cod !== 200) return
    
    return json
     
}


const checkWeather =  async () =>{
    const cityClimate = await loadAPI()
    
    if(cityClimate){
        const cityClimateObj = {
            name: cityClimate.name,
            country: cityClimate.sys.country,
            feelsLike: cityClimate.main.feels_like,
            temp: cityClimate.main.temp,
            max: cityClimate.main.temp_max,
            min: cityClimate.main.temp_min,
            description: cityClimate.weather[0].description
        }
        document.querySelector('[data-js="card"]').innerHTML = ''
    
        divClimate(cityClimateObj)

        document.querySelector('[data-js="input"]').value = ''
    } else {
        document.querySelector('[data-js="card"]').innerHTML = 'Digite alguma cidade valida'
    }
}



document.addEventListener('keypress', ({code}) => code === "Enter" ? checkWeather() : false)

document.querySelector('[data-js="checkWeather"]').addEventListener('click', checkWeather)

