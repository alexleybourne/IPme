// Created By Alex Leybourne :)

const url1 = "https://ipapi.co/json/"
const url2 = {p1: "https://ipapi.co/", p2: "/json/"}
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
    document.getElementById("locationText").style.opacity = "0"

    await sleep(400)

    location.reload()
}

function searchIP() {
    let searchIp = document.getElementById('search-input').value
    document.getElementById('search-input').value = ''
    let completedUrl = url2.p1 + searchIp + url2.p2
    console.log(searchIp)
    console.log(completedUrl)
}

//  Free IP Api -> URL 1
function requestIP(u) {
    function createNode(element) {
        return document.createElement(element)
    }
    
    function append(parent, el) {
      return parent.appendChild(el)
    }

    let thisUrl = u ? u : url1;
    
    const ul = document.getElementById('query')
    fetch(thisUrl)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
        ipAddress = data.ip
        let latitude = data.latitude
        let longitude = data.longitude
        let countryName = data.country_name
        let countryCity = data.city
        let countryCode = data.country_code

        console.log("IP Address:  " + ipAddress)

        // Getting Local Time from IP with live update
        var intervalID = window.setInterval(localTimeUpdate, 1000);

        function localTimeUpdate(){
        var localTime = new Date().toLocaleString("en-US", {timeZone: data.timezone})
        localTime = new Date(localTime)
        localTimeValue = localTime.toLocaleString()
        
        document.getElementById("timeZoneField").innerHTML = localTimeValue
        }

        var myJSON = JSON.stringify(data)

        
        // Populates info from server
        document.getElementById("ipArea").innerHTML = `<span uk-icon="icon: search; ratio: 1.5"></span> IP: ${ipAddress}`

        // Google Maps section
        let mapSRC = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAr3-W5QaQSP93-XOj7c1eWVcWCM_UErlU&q=" + `${latitude}` + "%2C" + `${longitude}` + "&zoom=10"
        
        var mapIframe = document.getElementById("map")

        mapIframe.src = mapSRC
        console.log("Google Maps link:  " + mapSRC)

        document.getElementById("locationText").innerHTML = countryCity + ", " + countryName + " " + (getFlags(countryCode))

        document.getElementById("locationField").innerHTML = countryCity + ", " + data.region + ", " + countryName + " " + (getFlags(countryCode))
        document.getElementById("coordinatesField").innerHTML = data.longitude + ", " + data.latitude
        document.getElementById("asnField").innerHTML = data.asn
        document.getElementById("orgField").innerHTML = data.org
        
        


        mapIframe.style.position = ""
        
        ipCheckLinkMaker()

      })
    .catch(function(error) {
      console.log(error)

      document.getElementById("mainDivArea").innerHTML = `<!-- Error Page -->
    <div class="scale-in-center" id="errorDino" style="margin: auto; position: absolute; z-index: 3; display: flex; flex-direction: column;" >
      <h3 style="align-self: center; color: #007bff; font-weight: bold; margin: 0px;  font-size: 45px;" >Ooops</h3>
      <h3 style="align-self: center; color: #007bff; font-weight: bold; margin: 0px;  font-size: 16px;" >Somehting Went Wrong...</h3>
      <img  style="max-width: 50%; align-self: center; margin: 20px;" src="gifs/dino.gif">
      <button class="uk-button uk-button-primary uk-button-small" style="background-color: #007bff;border-radius: 50px;width: fit-content; align-self: center; margin: 10px;" onclick="retryError()" > Retry </button>
    </div>
    
    <div style="width: 100%; min-height: 70vh; flex-wrap: wrap-reverse;" class="uk-card uk-card-default" >     
        <div id="textArea" class="fadeTransition uk-card-body uk-text-center" style="opacity: 1; display: flex; flex-direction: column; align-content: center; justify-content: center; overflow-wrap: break-word;" >
        </div>
      </div>
    </div>`
    
      
    }) 
}

// Retry Function (Error Reload Basically)

function retryError(){
    location.reload()
}


// When Map Loads
async function mapLoaded(){
    console.log("iframe loaded")
    
    
    document.getElementById("worldLoader").innerHTML = `<img class="scale-out-center" style="max-width: 70%;" src="gifs/world.gif">`
    
    await sleep(200)
    document.getElementById("map").style.opacity = "1"
    document.getElementById("textArea").style.opacity = "1"
    document.getElementById("worldLoader").innerHTML = ""
    document.getElementById("locationText").style.opacity = "1"
    
}

var attempts = 1

function ipCheckLinkMakerTryAgain() {
    if (attempts < 3) {
        attempts ++ 
        console.log("Trying to load ip quality score attempt:" + attempts)
    } else {
        console.log("Can't get data from ip quality Score")
    }
}

// Gets data from IPQUALITYSCORE
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
            
            var ipScore = (document.getElementsByClassName("partner-markets")[1])
            try { 
                var ipNum = ipScore.getElementsByTagName('span')[0].innerHTML
                dataUpdate() 
            }
            catch(err) {
                console.log("Error: " + err + ".") 
                ipCheckLinkMakerTryAgain()
            }
            
            function dataUpdate() {
               
                console.log("IP Score:  " + ipNum)

                
                // Description of IP and Level of Risk
                var ipDescription = document.getElementsByClassName("partner-markets")[0]
                var ipDescriptionDelete = ipDescription.getElementsByTagName("span")[0]
                var ipDescription2 = ipDescription
                var riskLevel = ipDescriptionDelete.innerHTML
                console.log("IP Risk Level:  " + riskLevel)
                document.getElementById("riskLevel").innerHTML = ipNum + " / 100 - " + riskLevel

                ipDescription2.getElementsByTagName("span")[0].innerHTML = ""

                var ipDescriptionFull = ipDescription2.innerHTML.replace( /- /g,'')
                ipDescriptionFull = ipDescriptionFull.replace(/<\/?span[^>]*>/g,"")

                document.getElementById("descriptionField").innerHTML = ipDescriptionFull

                console.log("IP Description:  " + ipDescriptionFull)

                if (ipNum > 30){
                    // var vpnDetected = "Yes"
                    document.getElementById("proxyField").innerHTML = "Detected"

                } else {
                    // var vpnDetected = "No"
                    document.getElementById("proxyField").innerHTML = "None Detected"
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

// Country Flags

function getFlags(code){
    if(code == 'AD') return '🇦🇩'
    if(code == 'AE') return '🇦🇪'
    if(code == 'AF') return '🇦🇫'
    if(code == 'AG') return '🇦🇬'
    if(code == 'AI') return '🇦🇮'
    if(code == 'AL') return '🇦🇱'
    if(code == 'AM') return '🇦🇲'
    if(code == 'AO') return '🇦🇴'
    if(code == 'AQ') return '🇦🇶'
    if(code == 'AR') return '🇦🇷'
    if(code == 'AS') return '🇦🇸'
    if(code == 'AT') return '🇦🇹'
    if(code == 'AU') return '🇦🇺'
    if(code == 'AW') return '🇦🇼'
    if(code == 'AX') return '🇦🇽'
    if(code == 'AZ') return '🇦🇿'
    if(code == 'BA') return '🇧🇦'
    if(code == 'BB') return '🇧🇧'
    if(code == 'BD') return '🇧🇩'
    if(code == 'BE') return '🇧🇪'
    if(code == 'BF') return '🇧🇫'
    if(code == 'BG') return '🇧🇬'
    if(code == 'BH') return '🇧🇭'
    if(code == 'BI') return '🇧🇮'
    if(code == 'BJ') return '🇧🇯'
    if(code == 'BL') return '🇧🇱'
    if(code == 'BM') return '🇧🇲'
    if(code == 'BN') return '🇧🇳'
    if(code == 'BO') return '🇧🇴'
    if(code == 'BQ') return '🇧🇶'
    if(code == 'BR') return '🇧🇷'
    if(code == 'BS') return '🇧🇸'
    if(code == 'BT') return '🇧🇹'
    if(code == 'BV') return '🇧🇻'
    if(code == 'BW') return '🇧🇼'
    if(code == 'BY') return '🇧🇾'
    if(code == 'BZ') return '🇧🇿'
    if(code == 'CA') return '🇨🇦'
    if(code == 'CC') return '🇨🇨'
    if(code == 'CD') return '🇨🇩'
    if(code == 'CF') return '🇨🇫'
    if(code == 'CG') return '🇨🇬'
    if(code == 'CH') return '🇨🇭'
    if(code == 'CI') return '🇨🇮'
    if(code == 'CK') return '🇨🇰'
    if(code == 'CL') return '🇨🇱'
    if(code == 'CM') return '🇨🇲'
    if(code == 'CN') return '🇨🇳'
    if(code == 'CO') return '🇨🇴'
    if(code == 'CR') return '🇨🇷'
    if(code == 'CU') return '🇨🇺'
    if(code == 'CV') return '🇨🇻'
    if(code == 'CW') return '🇨🇼'
    if(code == 'CX') return '🇨🇽'
    if(code == 'CY') return '🇨🇾'
    if(code == 'CZ') return '🇨🇿'
    if(code == 'DE') return '🇩🇪'
    if(code == 'DJ') return '🇩🇯'
    if(code == 'DK') return '🇩🇰'
    if(code == 'DM') return '🇩🇲'
    if(code == 'DO') return '🇩🇴'
    if(code == 'DZ') return '🇩🇿'
    if(code == 'EC') return '🇪🇨'
    if(code == 'EE') return '🇪🇪'
    if(code == 'EG') return '🇪🇬'
    if(code == 'EH') return '🇪🇭'
    if(code == 'ER') return '🇪🇷'
    if(code == 'ES') return '🇪🇸'
    if(code == 'ET') return '🇪🇹'
    if(code == 'FI') return '🇫🇮'
    if(code == 'FJ') return '🇫🇯'
    if(code == 'FK') return '🇫🇰'
    if(code == 'FM') return '🇫🇲'
    if(code == 'FO') return '🇫🇴'
    if(code == 'FR') return '🇫🇷'
    if(code == 'GA') return '🇬🇦'
    if(code == 'GB') return '🇬🇧'
    if(code == 'GD') return '🇬🇩'
    if(code == 'GE') return '🇬🇪'
    if(code == 'GF') return '🇬🇫'
    if(code == 'GG') return '🇬🇬'
    if(code == 'GH') return '🇬🇭'
    if(code == 'GI') return '🇬🇮'
    if(code == 'GL') return '🇬🇱'
    if(code == 'GM') return '🇬🇲'
    if(code == 'GN') return '🇬🇳'
    if(code == 'GP') return '🇬🇵'
    if(code == 'GQ') return '🇬🇶'
    if(code == 'GR') return '🇬🇷'
    if(code == 'GS') return '🇬🇸'
    if(code == 'GT') return '🇬🇹'
    if(code == 'GU') return '🇬🇺'
    if(code == 'GW') return '🇬🇼'
    if(code == 'GY') return '🇬🇾'
    if(code == 'HK') return '🇭🇰'
    if(code == 'HM') return '🇭🇲'
    if(code == 'HN') return '🇭🇳'
    if(code == 'HR') return '🇭🇷'
    if(code == 'HT') return '🇭🇹'
    if(code == 'HU') return '🇭🇺'
    if(code == 'ID') return '🇮🇩'
    if(code == 'IE') return '🇮🇪'
    if(code == 'IL') return '🇮🇱'
    if(code == 'IM') return '🇮🇲'
    if(code == 'IN') return '🇮🇳'
    if(code == 'IO') return '🇮🇴'
    if(code == 'IQ') return '🇮🇶'
    if(code == 'IR') return '🇮🇷'
    if(code == 'IS') return '🇮🇸'
    if(code == 'IT') return '🇮🇹'
    if(code == 'JE') return '🇯🇪'
    if(code == 'JM') return '🇯🇲'
    if(code == 'JO') return '🇯🇴'
    if(code == 'JP') return '🇯🇵'
    if(code == 'KE') return '🇰🇪'
    if(code == 'KG') return '🇰🇬'
    if(code == 'KH') return '🇰🇭'
    if(code == 'KI') return '🇰🇮'
    if(code == 'KM') return '🇰🇲'
    if(code == 'KN') return '🇰🇳'
    if(code == 'KP') return '🇰🇵'
    if(code == 'KR') return '🇰🇷'
    if(code == 'KW') return '🇰🇼'
    if(code == 'KY') return '🇰🇾'
    if(code == 'KZ') return '🇰🇿'
    if(code == 'LA') return '🇱🇦'
    if(code == 'LB') return '🇱🇧'
    if(code == 'LC') return '🇱🇨'
    if(code == 'LI') return '🇱🇮'
    if(code == 'LK') return '🇱🇰'
    if(code == 'LR') return '🇱🇷'
    if(code == 'LS') return '🇱🇸'
    if(code == 'LT') return '🇱🇹'
    if(code == 'LU') return '🇱🇺'
    if(code == 'LV') return '🇱🇻'
    if(code == 'LY') return '🇱🇾'
    if(code == 'MA') return '🇲🇦'
    if(code == 'MC') return '🇲🇨'
    if(code == 'MD') return '🇲🇩'
    if(code == 'ME') return '🇲🇪'
    if(code == 'MF') return '🇲🇫'
    if(code == 'MG') return '🇲🇬'
    if(code == 'MH') return '🇲🇭'
    if(code == 'MK') return '🇲🇰'
    if(code == 'ML') return '🇲🇱'
    if(code == 'MM') return '🇲🇲'
    if(code == 'MN') return '🇲🇳'
    if(code == 'MO') return '🇲🇴'
    if(code == 'MP') return '🇲🇵'
    if(code == 'MQ') return '🇲🇶'
    if(code == 'MR') return '🇲🇷'
    if(code == 'MS') return '🇲🇸'
    if(code == 'MT') return '🇲🇹'
    if(code == 'MU') return '🇲🇺'
    if(code == 'MV') return '🇲🇻'
    if(code == 'MW') return '🇲🇼'
    if(code == 'MX') return '🇲🇽'
    if(code == 'MY') return '🇲🇾'
    if(code == 'MZ') return '🇲🇿'
    if(code == 'NA') return '🇳🇦'
    if(code == 'NC') return '🇳🇨'
    if(code == 'NE') return '🇳🇪'
    if(code == 'NF') return '🇳🇫'
    if(code == 'NG') return '🇳🇬'
    if(code == 'NI') return '🇳🇮'
    if(code == 'NL') return '🇳🇱'
    if(code == 'NO') return '🇳🇴'
    if(code == 'NP') return '🇳🇵'
    if(code == 'NR') return '🇳🇷'
    if(code == 'NU') return '🇳🇺'
    if(code == 'NZ') return '🇳🇿'
    if(code == 'OM') return '🇴🇲'
    if(code == 'PA') return '🇵🇦'
    if(code == 'PE') return '🇵🇪'
    if(code == 'PF') return '🇵🇫'
    if(code == 'PG') return '🇵🇬'
    if(code == 'PH') return '🇵🇭'
    if(code == 'PK') return '🇵🇰'
    if(code == 'PL') return '🇵🇱'
    if(code == 'PM') return '🇵🇲'
    if(code == 'PN') return '🇵🇳'
    if(code == 'PR') return '🇵🇷'
    if(code == 'PS') return '🇵🇸'
    if(code == 'PT') return '🇵🇹'
    if(code == 'PW') return '🇵🇼'
    if(code == 'PY') return '🇵🇾'
    if(code == 'QA') return '🇶🇦'
    if(code == 'RE') return '🇷🇪'
    if(code == 'RO') return '🇷🇴'
    if(code == 'RS') return '🇷🇸'
    if(code == 'RU') return '🇷🇺'
    if(code == 'RW') return '🇷🇼'
    if(code == 'SA') return '🇸🇦'
    if(code == 'SB') return '🇸🇧'
    if(code == 'SC') return '🇸🇨'
    if(code == 'SD') return '🇸🇩'
    if(code == 'SE') return '🇸🇪'
    if(code == 'SG') return '🇸🇬'
    if(code == 'SH') return '🇸🇭'
    if(code == 'SI') return '🇸🇮'
    if(code == 'SJ') return '🇸🇯'
    if(code == 'SK') return '🇸🇰'
    if(code == 'SL') return '🇸🇱'
    if(code == 'SM') return '🇸🇲'
    if(code == 'SN') return '🇸🇳'
    if(code == 'SO') return '🇸🇴'
    if(code == 'SR') return '🇸🇷'
    if(code == 'SS') return '🇸🇸'
    if(code == 'ST') return '🇸🇹'
    if(code == 'SV') return '🇸🇻'
    if(code == 'SX') return '🇸🇽'
    if(code == 'SY') return '🇸🇾'
    if(code == 'SZ') return '🇸🇿'
    if(code == 'TC') return '🇹🇨'
    if(code == 'TD') return '🇹🇩'
    if(code == 'TF') return '🇹🇫'
    if(code == 'TG') return '🇹🇬'
    if(code == 'TH') return '🇹🇭'
    if(code == 'TJ') return '🇹🇯'
    if(code == 'TK') return '🇹🇰'
    if(code == 'TL') return '🇹🇱'
    if(code == 'TM') return '🇹🇲'
    if(code == 'TN') return '🇹🇳'
    if(code == 'TO') return '🇹🇴'
    if(code == 'TR') return '🇹🇷'
    if(code == 'TT') return '🇹🇹'
    if(code == 'TV') return '🇹🇻'
    if(code == 'TW') return '🇹🇼'
    if(code == 'TZ') return '🇹🇿'
    if(code == 'UA') return '🇺🇦'
    if(code == 'UG') return '🇺🇬'
    if(code == 'UM') return '🇺🇲'
    if(code == 'US') return '🇺🇸'
    if(code == 'UY') return '🇺🇾'
    if(code == 'UZ') return '🇺🇿'
    if(code == 'VA') return '🇻🇦'
    if(code == 'VC') return '🇻🇨'
    if(code == 'VE') return '🇻🇪'
    if(code == 'VG') return '🇻🇬'
    if(code == 'VI') return '🇻🇮'
    if(code == 'VN') return '🇻🇳'
    if(code == 'VU') return '🇻🇺'
    if(code == 'WF') return '🇼🇫'
    if(code == 'WS') return '🇼🇸'
    if(code == 'XK') return '🇽🇰'
    if(code == 'YE') return '🇾🇪'
    if(code == 'YT') return '🇾🇹'
    if(code == 'ZA') return '🇿🇦'
    if(code == 'ZM') return '🇿🇲'
    return '🏳'
}