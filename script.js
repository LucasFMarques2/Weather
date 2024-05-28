async function getAddress(){
    const cep = document.getElementById('cep').value

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado');
        }

        console.log(data);
        document.getElementById('rua').textContent = data.logradouro;
        document.getElementById('bairro').textContent = data.bairro;
        document.getElementById('uf').textContent = data.uf;

    } catch (error) {
        console.log(error.message);
        document.getElementById('rua').textContent = '';
        document.getElementById('bairro').textContent = '';
        document.getElementById('uf').textContent = '';
        alert('CEP não encontrado ou não informado');
    }
}

async function getWeather(){
    const lat = document.getElementById('latitude').value
    const lon = document.getElementById('longitude').value

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
        const data = await response.json();
        console.log(data);

        const currentHour = new Date().getHours();
        const temperatures = data.hourly.temperature_2m;
        const currentTemperature = temperatures[currentHour];

        document.getElementById('weather').textContent = `Previsão de tempo de acordo com a região: ${currentTemperature}°C`;

    } catch (error) {
        console.log('deu bom n', error);
        document.getElementById('currentTemperature').textContent = 'Não foi possível obter a temperatura';
    }

}

document.getElementById('sendButton').addEventListener('click', (event)=>{

    event.preventDefault();
    getAddress();
    getWeather();

    document.querySelector('.cepHeader').classList.remove('hide');
    document.querySelector('.infoCep').classList.remove('hide');
    document.querySelector('.infoCep').classList.remove('hide');
    document.querySelector('.resultWeather').classList.remove('hide');
})