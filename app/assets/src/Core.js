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

const Core = {
  app,
  submitForm,
};

export default Core;
