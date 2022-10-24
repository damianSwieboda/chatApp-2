const socket = io();

const $messageForm = document.querySelector('#message-form')
const $sendMessageInput = $messageForm.querySelector('input')
const $sendMessageButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#message-template').innerHTML

const {} = qs.parse('?a=b&c=d', { ignoreQueryPrefix: true });


$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    socket.emit('message', $sendMessageInput.value, (error)=>{
        if(error){
            return console.log(error)
        }
        console.log("Message delivered")
    })
})

socket.on('message', (message)=>{

    // console.log(name)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('LTS')
    })
    $messages.insertAdjacentHTML('beforeend', html)
  
})

