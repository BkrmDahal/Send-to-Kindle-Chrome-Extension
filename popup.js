$(document).ready(function() {
   $("button").click(function() {
       var xhr = new XMLHttpRequest();
       var url = "https://webhook.site/0e185470-c8d4-4de0-b384-71746486e3ab";
       var email = $('#email').val();
       var currentURL = window.location.href
       console.log(currentURL)
       xhr.open("POST", url, true);
       xhr.setRequestHeader("Content-Type", "application/json");
       xhr.onreadystatechange = function() {
           if (xhr.readyState === 4 && xhr.status === 200) {
               var json = JSON.parse(xhr.responseText);
               console.log(json)

           }
       };
       var data = JSON.stringify({
           "email": email, 
           "url": currentURL
       });
       xhr.send(data);
   });
});
