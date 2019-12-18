const url = "http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,reverse,mobile,proxy,query"

requestIP()

function requestIP() {
    function createNode(element) {
        return document.createElement(element)
    }
    
    function append(parent, el) {
      return parent.appendChild(el)
    }
    
    const ul = document.getElementById('query')
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
        let ipAddress = data.query
        console.log(ipAddress)
        var myJSON = JSON.stringify(data)
        document.getElementById("ipArea").innerHTML = `${ipAddress}`
        document.getElementById("textArea").innerHTML = `${myJSON}`
      })
    .catch(function(error) {
      console.log(error)
    }) 
}


