const app = `
<div class="container">
  <header>
    <img src="./images/eteg-logo.png" alt="logotipo eteg tecnologia">
    <span>Walter S. A. Souza</span> 
  </header>
  <form id="form">
    <div class="title">
      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
      <h2>Busca de localidade por CEP</h2>
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

  <div class="tickets">
    <hr>
    <h2>Tickets do solicitante:</h2> 
    <div id="last-tickets"></div>
  </div>
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

// Request tickets from customer
const requestTickets = async (tickets) => {
  const ticketsFormatted = await tickets.results.map((ticket) => {
    const ticketLink = ticket.url.replace('api/v2', 'agent').split('.json')[0];
    const created = ticket.created_at;
    return {
      title: ticket.raw_subject ? ticket.raw_subject : ticket.description,
      created,
      link: ticketLink,
    };
  });

  ticketsFormatted.forEach((ticket, index) => {
    const createdFormatted = formatDate(ticket.created);
    const ticketList = `
      <a href="${ticket.link}" target="_blank">${index + 1}. ${ticket.title}</a>
      <p>criado em ${createdFormatted}</p>      
    `;
    document.getElementById('last-tickets').innerHTML = ticketList;
  });
};

function formatDate(date) {
  const cdate = new Date(date);
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  date = cdate.toLocaleDateString('pt-BR', options);
  return date;
}

const Core = {
  app,
  submitForm,
  formatPlace,
  requestTickets,
  formatDate,
};

export default Core;
