const url1 = "https://proxycheck.io/v2/"
const url2 = "https://ipapi.co/json/"

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
        let ipAddress = data.proxy
        console.log(ipAddress)
        var myJSON = JSON.stringify(data)
        document.getElementById("ipArea").innerHTML = `${ipAddress}`
        // document.getElementById("textArea").innerHTML = `${myJSON}`
      })
    .catch(function(error) {
      console.log(error)
      requestIP2()
    }) 
}

// Fallback Request

function requestIP2(){
    function createNode(element) {
        return document.createElement(element)
    }
    
    function append(parent, el) {
      return parent.appendChild(el)
    }
    
    const ul = document.getElementById('query')
    fetch(url2)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
        let ipAddress = data.ip
        let latitude = data.latitude
        let longitude = data.longitude
        console.log("Secondary Request  " + ipAddress)
        var myJSON = JSON.stringify(data)
        document.getElementById("ipArea").innerHTML = `Your Fake IP: ${ipAddress}`
        document.getElementById("textArea").innerHTML = `${myJSON}`
        document.getElementById("map").src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAr3-W5QaQSP93-XOj7c1eWVcWCM_UErlU&q=" + `${latitude}` + "%2C" + `${longitude}` + "&zoom=12"
      })
    .catch(function(error) {
      console.log(error)
      document.getElementById("ipArea").innerHTML = "IDK Whats going on"
    }) 
}


// https://www.google.com/maps/embed/v1/place?key=AIzaSyAr3-W5QaQSP93-XOj7c1eWVcWCM_UErlU&q=LONGITUDE%2CLATITUDE&zoom=12