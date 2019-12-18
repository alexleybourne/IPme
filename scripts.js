const url1 = "https://ipapi.co/json/"
var ipAddress = ""
var fraudScore = ""



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

        iframeProxyCheck()

      })
    .catch(function(error) {
      console.log(error)
    }) 
}

// Proxy Check


function frameload(){
    var iframe = document.getElementById("myIframe")

    alert("iframe loaded")
    console.log("iFrame loaded Successfully")
       
    // var fraudScore = iframe.getElementsByClassName('partner-markets')
    // document.getElementById("fraudText").innerHTML = `${fraudScore}`

    var test = iframe.getElementById( 'partner-markets' )
    console.log( test.textContent )


    // var elmnt = iframe.contentWindow.document.getElementById('partner-markets')[0]
    // elmnt.innerHTML.focus()

    console.log(fraudScore)
}

// Iframe Test
function iframeProxyCheck(){
    var iframe = document.getElementById("myIframe")

    let ipCheckSRC = "https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/" + `${ipAddress}`
    iframe.src = ipCheckSRC
    console.log("iFrame src link:  " + ipCheckSRC)
}

