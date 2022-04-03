import Core from './Core.js';

const client = ZAFClient.init();
let settings;

// client.metadata().then((metadata) => {
//   settings = metadata.settings;
// });

const Main = async () => {
  const App = document.getElementById('app');
  let appBody = `<div id="main-content">${Core.app}</div>`;

  App.innerHTML = appBody;

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
    const textInput = await Core.submitForm();
    client.trigger('test', textInput);
  });
};

export default Main;
