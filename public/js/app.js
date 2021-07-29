

console.log('client side javascrip is loading')


//select the part of the document who I want interact
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //take the input value
    const location= search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent= ''

    // add the input in the request to find informatons 
    //fetch('http://localhost:3000/weather?address='+ location)
    fetch('/weather?address='+ location)
    .then((response) => {
        response.json()
            .then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent= data.location
                    messageTwo.textContent= data.forecast
                }
            })
    })    
})
