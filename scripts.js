const url1 = "https://ipapi.co/json/"
var ipAddress = ""
var fraudScore = ""
var ipCheckSRC = ""

requestIP()

function requestIP() {
    function createNode(element) {
        return document.createElement(element)
    }
    
    function append(parent, el) {
      return parent.appendChild(el)
    }
    
    const ul = document.getElementById('query')
    fetch(url1)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
        ipAddress = data.ip
        let latitude = data.latitude
        let longitude = data.longitude
        console.log("IP Address:  " + ipAddress)

        var myJSON = JSON.stringify(data)
        document.getElementById("ipArea").innerHTML = `Your IP: ${ipAddress}`
        document.getElementById("textArea").innerHTML = `${myJSON}`

        let mapSRC = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAr3-W5QaQSP93-XOj7c1eWVcWCM_UErlU&q=" + `${latitude}` + "%2C" + `${longitude}` + "&zoom=12"
        document.getElementById("map").src = mapSRC
        console.log("Google Maps link:  " + mapSRC)

        ipCheckLinkMaker()

      })
    .catch(function(error) {
      console.log(error)
    }) 
}

// Iframe Test
function ipCheckLinkMaker(){
    
    ipCheckSRC = "https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/" + `${ipAddress}`
    console.log("iP Quality Check link:  " + ipCheckSRC)
    
    ////////////////////////////
    // Cors Anywhere To Grab ip Quality Score Data

    var cors_api_url = 'https://cors-anywhere.herokuapp.com/'
    var pageScrape = ""
    
    function doCORSRequest(options, printResult) {
        var x = new XMLHttpRequest();
        x.open(options.method, cors_api_url + options.url)
        x.onload = x.onerror = function() {
        printResult(
            options.method + ' ' + options.url + '\n' +
            x.status + ' ' + x.statusText + '\n\n' +
            (x.responseText || '')
        )
        }
        if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        }
        x.send(options.data)
    }
    
    // Bind event
    (function() {
        var outputField = document.getElementById('output')
        
    
        doCORSRequest({
            method: "POST",
            url: `${ipCheckSRC}`,
        }, function printResult(result) {
            outputField.innerHTML = result
            pageScrape = result
        })
    
        
    })()
    
    if (typeof console === 'object') {
        console.log('// To test a local CORS Anywhere server, set cors_api_url. For example:')
        console.log('cors_api_url = "http://localhost:8080/"')
    }

    ///////////////////////////
          
}
