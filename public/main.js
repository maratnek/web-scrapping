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
    formData.append('myFile', file)
  
    fetch('/scrap-service', {
      method: 'POST',
      //body: formData
      body: file
    })
    .then(response => {
        console.log('Responce', response)
        response.json()
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
});

document.querySelector('#csvFile').addEventListener('change', event => {
    //handleImageUpload(event)
  })

const handleImageUpload = event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('myFile', files[0])
  
    fetch('/scrap-service', {
      method: 'POST',
      body: formData
    })
    .then(response => {
        console.log('Responce', response)
        response.json()
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
  }