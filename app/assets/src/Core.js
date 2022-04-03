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
  <button type="submit">Enviar</button>
</form>

</div>
`;

const submitForm = async () => {
  const text = await document.getElementById('text').value;
  return text;
};

const Core = {
  app,
  submitForm,
};

export default Core;
