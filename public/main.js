const form = document.getElementById('formCsv');
form.addEventListener('submit', ev => {
    ev.defaultPrevented = false;
    ev.preventDefault();
    const file = document.getElementById('csvFile').files[0];
    //const files = ev.target.files;
    console.log(file);

    const formData = new FormData()
    formData.append('csvFile', file)

  let ul =  document.getElementById('content');
    ul.innerHTML = '';
    fetch('/scrap-service', {
      method: 'POST',
      mode: 'no-cors',
      //body: formData
      body: file
    })
    .then(response => {
        //console.log('Responce', response)
        return response.text();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
});

const formStore = document.getElementById('formStore');
formStore.addEventListener('submit', ev => {
    console.log('Url', url);
    ev.defaultPrevented = false;
    ev.preventDefault();
    const url = document.getElementById('storeUrl');


    // const formData = new FormData()
    // formData.append('csvFile', file)

  let ul =  document.getElementById('content');
    ul.innerHTML = '';
    fetch('/scrap-store', {
      method: 'POST',
      mode: 'no-cors',
      body: url 
    })
    .then(response => {
        //console.log('Responce', response)
        return response.text();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
});


const source = new EventSource('/events');

source.addEventListener('message', message => {
  console.log('Got', message);

  const data = JSON.parse(event.data);
  //const data = event.data.json();
  // Display the event data in the `content` div
  let li =  document.createElement('li');
  li.classList.add('collection-item');
  li.classList.add('blue-grey')
  li.innerHTML = `New data: <a class="lightgreen" href="${data.URL}">${data.URL}</a> ${data.Orders} <span class="chip green">${data.Count}</span>`;
  document.querySelector('#content').appendChild(li); 
});
;