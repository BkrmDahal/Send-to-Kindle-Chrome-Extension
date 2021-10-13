function sendData(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var tabURL = tabs[0].url;
        var email = document.getElementById('email').value
        var SERVER_URL = 'https://xxx.ws-us17.gitpod.io/api/v1/send/kindle/'
        var data = JSON.stringify({
            "url": tabURL,
            "email": email
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

        // var xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function() {
        //     var json = JSON.parse(xhr.responseText);
        //     document.getElementById('button').value = 'SUCCESS'
        // };

        // xhr.open("POST", 'https://webhook.site/0e185470-c8d4-4de0-b384-71746486e3ab');
        // xhr.send(data);
    }
    );
   };

var button = document.getElementById('button')
if (button){
addEventListener('click', sendData, false)}
