// const file = document.getElementById('csvFile').files[0];
// fetch(url + '/scrap-service', {
//   body: file,
//   method: 'POST',
//   headers: {
//     'content-type': file.type // likely there for common types
//   }
// }).then(res => console.log('Result'));


const form = document.getElementById('formCsv');
form.addEventListener('submit', ev => {
    ev.defaultPrevented = false;
    ev.preventDefault();
const file = document.getElementById('csvFile').files[0];
    //const files = ev.target.files;
    console.log(file);

    const formData = new FormData()
    formData.append('csvFile', file)
  
    fetch('/scrap-service', {
      method: 'POST',
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

const source = new EventSource('/events');

source.addEventListener('message', message => {
  console.log('Got', message);

  const data = JSON.parse(event.data);
  //const data = event.data.json();
  // Display the event data in the `content` div
  let li =  document.createElement('li');
  li.classList.add('collection-item');
  li.classList.add('blue-grey')
  li.innerHTML = `New data: ${data.URL} ${data.Orders}`;
  document.querySelector('#content').appendChild(li); 
});