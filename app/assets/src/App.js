import Main from './Main.js';
// Start client and resize app
let client = ZAFClient.init();
console.log(client);

//Listening events
client.on('app.registered', (e) => {
  client.invoke('resize', { width: '100%', height: '500px' });
});

// checking return params
const data = await client.get(['ticket.id', 'ticket.requester.id']);
const ticket_id = data['ticket.id'];

// listening test event
client.on('published', (place) => {
  client.request({
    url: `/api/v2/tickets/${ticket_id}.json`,
    type: 'PUT',
    data: {
      ticket: {
        comment: {
          body: place,
        },
      },
    },
  });
});

// Create screen context
Main();
