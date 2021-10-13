function sendData(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var tabURL = tabs[0].url;
        var email = document.getElementById('email').value
        var SERVER_URL = 'https://xxx.ws-us17.gitpod.io/api/v1/send/kindle/'

        var data = JSON.stringify({
            "url": tabURL,
            "email": email,
        });

        (async () => {
            const rawResponse = await fetch(SERVER_URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: data
            });
            const content = await rawResponse.text();
            // document.getElementById('status').value=content;
            console.log(content);
          })();
    }
    );
   };

var button = document.getElementById('button')
if (button){
addEventListener('click', sendData, false)}
