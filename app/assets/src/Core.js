const app = `
<div class="container">
<header>
  <img src="./images/eteg-logo.png" alt="logotipo eteg tecnologia">
  <span>Walter S. A. Souza</span> 
</header>
<form id="form">
  <div class="title">
    <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
    <h2>Busca de endereço por CEP</h2>
  </div>
  <div class="inputBox">
    <input id="cep" type="text" oninput="cepMask(this)"/>    
    <label for="cep">Digite o CEP</label>
  </div> 
  <div class="inputFooter">
    <button type="submit">Enviar</button>
    <span id="error"></span>
  </div>
</form>

<hr>
  <div id="last-tickets"></div>

</div>
`;

const submitForm = async (cep) => {
  const localization = await (
    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  ).json();

  console.log(localization);

  if (localization.erro) {
    document.getElementById('error').innerHTML = 'CEP não encontrado';
    return undefined;
  }

  document.getElementById('error').innerHTML = '';

  return localization;
};

// Formatting places
const formatPlace = (place) => {
  if (place.complemento === '') {
    const formattedPlace = `
      Olá! Seguem os dados referentes ao CEP: ${place.cep}. \n
      Logradouro: ${place.logradouro}    
      Bairro: ${place.bairro} 
      Cidade: ${place.localidade} 
      Estado: ${place.uf}
    `;

    return formattedPlace;
  }

  const formattedPlace = `
    Olá! Seguem os dados referentes ao CEP: ${place.cep}. \n
    Logradouro: ${place.logradouro}   
    Complemento: ${place.complemento}  
    Bairro: ${place.bairro} 
    Cidade: ${place.localidade} 
    Estado: ${place.uf}
  `;

  return formattedPlace;
};

const Core = {
  app,
  submitForm,
  formatPlace,
};

export default Core;
