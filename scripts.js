const url1 = "https://ipapi.co/json/"
var ipAddress = ""



requestIP()
hacky()


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
        document.getElementById("ipArea").innerHTML = `Your Fake IP: ${ipAddress}`
        document.getElementById("textArea").innerHTML = `${myJSON}`

        let mapSRC = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAr3-W5QaQSP93-XOj7c1eWVcWCM_UErlU&q=" + `${latitude}` + "%2C" + `${longitude}` + "&zoom=12"
        document.getElementById("map").src = mapSRC
        console.log("Google Maps link:  " + mapSRC)

        let ipCheckSRC = "https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/" + `${ipAddress}`
        document.getElementById("myIframe").src = ipCheckSRC
        console.log(ipCheckSRC)
        
        requestIP2()
      })
    .catch(function(error) {
      console.log(error)
    }) 
}

// Proxy Check

var apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.WzM5OCwxNTc2Njk1Njg5LDIwMDBd.hsk_EHDv8a3nNDe4XAk8BnqLjoapgLBHPbKpgRUB7VI"
// var urlBuild = "https://www.iphunter.info:8082/v1/ip/" + `${ipAddress}`
// var url2 = urlBuild
var url2 = "https://ip.teoh.io/vpn-detection"

function requestIP2() {
    function createNode(element) {
        return document.createElement(element)
    }
    
    function append(parent, el) {
      return parent.appendChild(el)
    }
    
    const ul = document.getElementById('query')
    fetch(url2, { 'X-Key': `${apiKey}`},  {mode: 'no-cors'})
    .then((resp) => resp.json())
    .then(function(data) {
        // var merged = [].concat.apply([], data)
        console.log("Proxy Status:  " + data)
        // let usingProxy = data.proxy
        // console.log(usingProxy)
        var myJSON = JSON.stringify(data)
        // document.getElementById("ipArea").innerHTML = `${usingProxy}`
        document.getElementById("textArea").innerHTML = `${myJSON}`
      })
    .catch(function(error) {
      console.log(error)
    }) 
}

function frameload(){
    
        alert("iframe loaded")
       
}

// Iframe Test
function hacky(){
    var iframe = document.getElementById("myIframe")

    //For ex; say you have a button called mybutton in thispage.html page
    //you can access it as follows.
    // var sendButton = document.getElementsByClassName('icon-arrow-right2')
    // sendButton.click()
}