// Created By Alex Leybourne :)

const url1 = "https://ipapi.co/json/"
var ipAddress = ""
var ipCheckSRC = ""
var vpnDetected = "loading"

requestIP()

// Sleep Function
async function sleep(time) {
    return new Promise(r => setTimeout(r, time))
}

async function reloadPage() {

    document.getElementById("map").style.opacity = "0"
    document.getElementById("textArea").style.opacity = "0"

    await sleep(400)

    location.reload()
}

//  Free IP Api -> URL 1
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

        document.getElementById("ipScore").innerHTML = myJSON

        // Populates info from server
        document.getElementById("ipArea").innerHTML = `<span uk-icon="icon: search; ratio: 1.5"></span> IP: ${ipAddress}`

        // Google Maps section
        let mapSRC = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAr3-W5QaQSP93-XOj7c1eWVcWCM_UErlU&q=" + `${latitude}` + "%2C" + `${longitude}` + "&zoom=4"
        
        var mapIframe = document.getElementById("map")

        mapIframe.src = mapSRC
        console.log("Google Maps link:  " + mapSRC)


        mapIframe.style.position = ""
        
        ipCheckLinkMaker()

      })
    .catch(function(error) {
      console.log(error)

      async function errorNotification(){
        

      // Error Banner / Alert
      document.getElementById("notificationArea").innerHTML = `
        <div id="notification" class="uk-alert-danger uk-animation-slide-top uk-text-center" uk-alert >
            <a class="uk-alert-close" uk-close></a>
            <p>ERROR IP request failed. Please try again.</p>
        </div>`
      }
        async function closeNotification(){
            var notifications = document.getElementById("notification")
            await sleep(1000)
            UIkit.alert(notifications).close()
        }

    }) 
}

// When Map Loads
async function mapLoaded(){
    console.log("iframe loaded")
    
    
    document.getElementById("worldLoader").innerHTML = `<img class="scale-out-center" style="max-width: 70%;" src="gifs/world.gif">`
    
    await sleep(200)
    document.getElementById("map").style.opacity = "1"
    document.getElementById("textArea").style.opacity = "1"
    document.getElementById("worldLoader").innerHTML = ""
    
}

// Iframe Test
function ipCheckLinkMaker(){
    
    ipCheckSRC = "https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/" + `${ipAddress}`
    console.log("iP Quality Check link:  " + ipCheckSRC)
    
    ////////////////////////////
    // Cors Anywhere To Grab ip Quality Score Data

    // Demo          :   https://robwu.nl/cors-anywhere.html
    // Source code   :   https://github.com/Rob--W/cors-anywhere/
    // Documentation :   https://github.com/Rob--W/cors-anywhere/#documentation

    // Created by Rob W ( Thanks :) )
    // https://github.com/Rob--W

    var cors_api_url = 'https://cors-anywhere.herokuapp.com/'
    var pageScrape = ""
    
    function doCORSRequest(options, printResult) {
        var x = new XMLHttpRequest();
        x.open(options.method, cors_api_url + options.url)
        x.onload = x.onerror = function() {
        printResult(
            options.method + ' ' + options.url + '\n' +
            x.status + ' ' + x.statusText + '\n\n' +
            (x.responseText || ''))

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
            
            var ipScore = (document.getElementsByClassName("partner-markets")[1])
            try { 
                var ipNum = ipScore.getElementsByTagName('span')[0].innerHTML
                dataUpdate() 
            }
            catch(err) {
                console.log("Error: " + err + ".") 
                // errorBanner()
            }
            
            function dataUpdate() {
               
                console.log("IP Score:  " + ipNum)

                document.getElementById("ipScore").innerHTML = ("Level of Risk = " + ipNum + " / 100")


                // Description of IP and Level of Risk
                var ipDescription = document.getElementsByClassName("partner-markets")[0]
                var ipDescriptionDelete = ipDescription.getElementsByTagName("span")[0]
                var ipDescription2 = ipDescription
                var riskLevel = ipDescriptionDelete.innerHTML
                console.log("IP Risk Level:  " + riskLevel)
                document.getElementById("riskLevel").innerHTML = riskLevel

                ipDescription2.getElementsByTagName("span")[0].innerHTML = ""
                console.log("IP Description:  " + ipDescription2.innerHTML)

                document.getElementById("ipDescription").innerHTML = ipDescription2.innerHTML.replace( /- /g,'')

                if (ipNum > 40){
                
                    document.getElementById("ipArea").innerHTML = `VPN IP: ${ipAddress}`
                    var vpnDetected = "Yes"
                } else {
                    var vpnDetected = "No"
                }
            }

        })
    
        
    })()

    ///////////////////////////

}


async function errorBanner(){

    await sleep(200)

    // Error Banner / Alert
    document.getElementById("notificationBannerArea").innerHTML = `
    <div id="notification" class="uk-alert-danger uk-animation-slide-top uk-text-center" uk-alert >
        <a class="uk-alert-close" uk-close></a>
        <p>Could not Connect to VPN & PROXY Detection Server</p>
    </div>`

    var notifications = document.getElementById("notification")
    await sleep(1000)
    UIkit.alert(notifications).close()
    
}