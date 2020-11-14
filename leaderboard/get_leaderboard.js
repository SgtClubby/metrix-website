var request = new XMLHttpRequest()

var user = name

request.open('GET', 'https://api.metrix.pw/api/leaderboard', true)
request.onload = function () {
    // Begin accessing JSON data here

    var data = JSON.parse(this.response)
    if (data) {
        data.forEach((user) => {
            rngxp = 10
            curlvl = user.level
            curexp = user.exp
            const nxtLvlexp = 150 * (Math.pow(1.5, curlvl) - 1)
            const prevLvlexp = 150 * (Math.pow(1.5, curlvl - 1) - 1)
            var rankupxp = nxtLvlexp.toFixed(0) - prevLvlexp.toFixed(0)
            var difference = curexp - prevLvlexp.toFixed(0)
            if (difference > rankupxp) count = 100
            remaining_xp = rankupxp - difference
                $( `#leaderboard` ).append(`
                    <div class="lb-row">
                        <div class="level">Level ${user.level}</div><div class="name">${user.name}</div><div class="score">${user.exp} XP</div>
                        <div class="progress"><progress id="progressid" value="${difference}" max="${rankupxp}"></progress></div>
                    </div>` 
                );
        })
    }
}

request.send()


document.addEventListener('DOMContentLoaded', () => {
    let elements = []
    let container = document.querySelector('#leaderboard')
    // Add each row to the array
    container.querySelectorAll('.lb-row').forEach(el => elements.push(el))
    // Clear the container
    container.innerHTML = ''
    // Sort the array from highest to lowest
    elements.sort((a, b) => b.querySelector('.score').textContent - a.querySelector('.score').textContent)
    // Put the elements back into the container
    elements.forEach(e => container.appendChild(e))
  })
