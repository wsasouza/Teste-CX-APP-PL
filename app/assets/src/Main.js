import Core from './Core.js';

const client = ZAFClient.init();

// client.metadata().then((metadata) => {
//   settings = metadata.settings;
// });

const Main = async () => {
  const App = document.getElementById('app');
  let appBody = `<div id="main-content">${Core.app}</div>`;

  App.innerHTML = appBody;

  // Jquery - float label
  $(function () {
    $('input').focus(function () {
      $(this).parent().addClass('active');
      $('input').focusout(function () {
        if ($(this).val() == '') {
          $(this).parent().removeClass('active');
        } else {
          $(this).parent().addClass('active');
        }
      });
    });
  });

  document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cep = await document.getElementById('cep').value;

    // if the cep format is valid
    if (cep !== '' && cep.length === 9) {
      const place = await Core.submitForm(cep);

      if (place) {
        const formattedPlace = Core.formatPlace(place);
        client.trigger('published', formattedPlace);
      }
    }
    form.reset();
  });
};

export default Main;
