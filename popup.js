function scrapeThePage() {
  // Keep this function isolated - it can only call methods you set up in content scripts
  var htmlCode = document.documentElement.outerHTML;
  return htmlCode;
}

function sendData() {
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function (tabs) {
    // show process in button
    document.getElementById('button').innerHTML = "processing..."

    //get url and other detail
    var tabURL = tabs[0].url;
    var email = document.getElementById('email').value
    var SERVER_URL = 'https://8000-lavender-constrictor-j4nwm0bh.ws-us17.gitpod.io/api/v1/send/kindle/' // need to chnage this to backend api
    

    // We have to convert the function to a string
    const scriptToExec = `(${scrapeThePage})()`;

    // Run the script in the context of the tab
    chrome.tabs.executeScript(tabs[0].id, {
      code: scriptToExec
    }, function (results) {

      var html = results[0]
      var data = JSON.stringify({
        "url": tabURL,
        "email": email,
        "html": html
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
        const status = await rawResponse.ok;
        console.log(status)
        if (status) {
          document.getElementById('button').innerHTML = "success"
        } else {
          document.getElementById('button').innerHTML = "failed"
        }
      })();
    });
  });
};

var button = document.getElementById('button').addEventListener('click', sendData)