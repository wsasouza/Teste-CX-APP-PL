const app = `
<form id="form">
  <h2>Testando escrita no Ticket</h2>
  <div>
    <input id="text" type="text" placeholder="texto simples" />
    <button type="submit">Enviar</button>
  </div>
</form>
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
