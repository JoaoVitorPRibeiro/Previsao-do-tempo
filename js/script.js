// Variaveis e seleção de elementos
const apiKey = "2f7751faa35984499c6350a32d6590a7";
const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/";



const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city"); //Ta pegando esse dado do HTML, com essa class
const tempElement = document.querySelector("#temperature span"); //Ta pegando esse dado do HTML, com essa class
const descElement = document.querySelector("#description"); //Ta pegando esse dado do HTML, com essa class
const weatherIconElement = document.querySelector("#weather-icon"); //Ta pegando esse dado do HTML, com essa class
const countryElement = document.querySelector("#country"); //Ta pegando esse dado do HTML, com essa class
const humidityElement = document.querySelector("#humidity span"); //Ta pegando esse dado do HTML, com essa class
const windElement = document.querySelector("#wind span"); //Ta pegando esse dado do HTML, com essa class

const weatherContainer = document.querySelector("#weather-data")

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Loader
const toggleLoader = () => { //Aqui você ta adicionando o loader, na hora de pesquisar, até ter todo o processo de retorno das API
    loader.classList.toggle("hide");
  };


//Funções
const getWeatherData = async(city) => { //Aqui você ta fazendo ele pegar os dados do tempo na API
    toggleLoader(); //Loader antes de solicitar a requisição dos dados da API
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL); //Ta pegando a resposta da API
    const data = await res.json(); //Transformando a resposta em JSON

    toggleLoader(); // Outro loader até receber os dados da API e converter eles em JSON

 return data 

}

// Tratamento de erro
const showErrorMessage = () => { //Aqui você ta mostrando a mensagem de erro, e apagando o elemento "hide"
    errorMessageContainer.classList.remove("hide");
  };
  
  const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  
    suggestionContainer.classList.add("hide");
  };

const showWeatherData = async (city) => {
    hideInformation();

    const data = await getWeatherData(city); //Aqui você ta pegando os dados da API, ja em JSON

    if (data.cod === "404") {
        showErrorMessage();
        return;
      }
    

    cityElement.innerText = data.name; //Na hora que você digita na barra o nome da cidade, atualiza embaixo
    tempElement.innerText = parseInt(data.main.temp) //Tratando o dado da temperatura, pois ele vem em duas casas decimais
    descElement.innerText = data.weather[0].description //Pegando a descrição dos dados JSON da API, ex: nublado, ensolarado e etc
    weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`) //Como é uma imagem, tem que dar SetAtributte, buscando o atributo src da imagem e depois buscar no objeto JSON o icon
    countryElement.setAttribute("src", `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png`) 
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`


    weatherContainer.classList.remove("hide");
}

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => { //Comando para na hora de dar "Enter", após escrever o nome, ele ja busca

//Você capta o "aperta de botão" com esse event listener

    if (e.code === "Enter") { // Se o botão for enter
        const city = e.target.value // City = o texto digitado e dado enter, logo ele roda os dados por meio do showWeatherData

        showWeatherData(city)
    }

})

// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });