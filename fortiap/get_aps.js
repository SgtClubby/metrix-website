let serialmap = new Map();

const interval = setInterval(function() {
    var request = new XMLHttpRequest()

    request.open('GET', 'https://api.metrix.pw/api/get_aps', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (data) {
            data.forEach((aps) => {
                    cloudkey = aps.cloud_key
                    serial = aps.serial
                    if (!cloudkey) return 
                    if (serialmap.has(serial)) {
                        return 
                    } else {
                        serialmap.set(serial) 
                        $( `#leaderboard` ).append(`
                            <div class="lb-row">
                                <div class="level">${serial}</div><div class="name">${cloudkey}</div>
                            </div>` 
                        );
                    }
            })
        }
    }
    request.send()
  }, 500);
