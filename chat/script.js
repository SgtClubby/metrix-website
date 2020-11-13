const socket = io('https://chat.metrix.pw/')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const url = "https://api.metrix.pw/api/user/me"
const token = localStorage.getItem('token');
let name;
$(function() {
  if (!token) {
    return window.location.replace("../login")
  }
  fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'token': token
      },
      redirect: 'follow',
      }).then((res) => {
          return res.json()
      }).then((json) => {
          if(json._id){
            name = json.username
          }

  }).then(function () {
    appendMessage('You joined')
    $(".linklist").append(`<li>You</li>`)
    socket.emit('new-user', name)

    socket.on('chat-message', data => {
      appendMessage(`${data.name}: ${data.message}`)
      $('html, body').animate({scrollTop:$(document).height()}, 'fast');
    })

    socket.on('user-connected', name => {
      if (name === null) return
      appendMessage(`${name} connected`)
      $(".linklist").append(`<li class="${name}">${name}</li>`)
    })

    socket.on('user-disconnected', name => {
      if (name === null) return
      appendMessage(`${name} disconnected`)
      $(`.${name}`).remove()
    })

    messageForm.addEventListener('submit', e => {
      e.preventDefault()
      if (!messageInput.value){
        return
      }
      const message = messageInput.value
      appendMessage(`You: ${message}`)
      socket.emit('send-chat-message', message)
      messageInput.value = ''
      $('html, body').animate({scrollTop:$(document).height()}, 'fast');
    })

    function appendMessage(message) {
      const messageElement = document.createElement('div')
      messageElement.innerText = message
      messageContainer.append(messageElement)
    }
  })
})