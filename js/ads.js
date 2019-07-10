var admobid = {}
if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
    admobid = {
        banner: 'ca-app-pub-3868593263837372/2584828446',
        interstitial: 'ca-app-pub-3868593263837372/2257525381'
    };
} else {
    admobid = {
        banner: 'ca-app-pub-3868593263837372/2584828446',
        interstitial: 'ca-app-pub-3868593263837372/2257525381'
    }
}

function initApp() {

    document.addEventListener('deviceready', function () {
        
        admob.banner.config({
            id: admobid.banner,
            isTesting: true,
            autoShow: true,
        })
        admob.banner.prepare()

        admob.interstitial.config({
            id: admobid.interstitial,
            isTesting: true,
            autoShow: false,
        })
        admob.interstitial.prepare()

        document.getElementById('showAd').disabled = true
        document.getElementById('showAd').onclick = function () {
            admob.interstitial.show()
        }

    }, false)

    document.addEventListener('admob.banner.events.LOAD_FAIL', function (event) {
        console.log(event)
    })

    document.addEventListener('admob.interstitial.events.LOAD_FAIL', function (event) {
        console.log(event)
    })

    document.addEventListener('admob.interstitial.events.LOAD', function (event) {
        console.log(event)
        document.getElementById('showAd').disabled = false
    })

    document.addEventListener('admob.interstitial.events.CLOSE', function (event) {
        console.log(event)

        admob.interstitial.prepare()
    })

}