
$(function() {
    window.onload = () => {
        let hour = 0;
        let minute = 0;
        let seconds = 0;
        let totalSeconds = 3600;
        let intervalId = null;
        
        function startTimer(elem) {
        --totalSeconds;
        hour = Math.floor(totalSeconds / 3600);
        minute = Math.floor((totalSeconds - hour*3600)/60);
        seconds = totalSeconds - (hour*3600 + minute*60);
    
        document.getElementById(`${elem}-timer`).innerHTML = `${hour}:${minute}:${seconds}`;

        }
    
        function startButton(elem) {
            intervalId = setInterval(startTimer(elem), 1000);
        }
       
        document.getElementById('reset-btn').addEventListener('click', () => {
        totalSeconds = 3600;
        document.getElementById("timer").innerHTML = '0:00:00';
        });

        startButton("Titania")
    }
})