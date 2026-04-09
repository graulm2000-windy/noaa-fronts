windyPlugin({
    name: 'noaa-fronts',
    version: '1.0.0',
    title: 'NOAA Fronts',
    icon: '🌦️',
    description: 'Surface Analysis & Forecasts from NOAA/WPC',
    author: 'Raul',
}, function () {

    const { map } = windyAPI;

    const NOAA = {
        current: "https://www.wpc.ncep.noaa.gov/sfc/analysis/sa.gif",
        h24:     "https://www.wpc.ncep.noaa.gov/sfc/analysis/24hr.gif",
        h48:     "https://www.wpc.ncep.noaa.gov/sfc/analysis/48hr.gif",
        h72:     "https://www.wpc.ncep.noaa.gov/sfc/analysis/72hr.gif",
        usa:     "https://ocean.weather.gov/UA/Latest/USA_latest.gif"
    };

    const bounds = [
        [15, -150],
        [65, -50]
    ];

    let currentOverlay = null;

    function showOverlay(url) {
        if (currentOverlay) {
            currentOverlay.setOpacity(0);
            setTimeout(() => {
                map.removeLayer(currentOverlay);
                loadNewOverlay(url);
            }, 300);
        } else {
            loadNewOverlay(url);
        }
    }

    function loadNewOverlay(url) {
        currentOverlay = L.imageOverlay(url, bounds, { opacity: 0 }).addTo(map);
        setTimeout(() => currentOverlay.setOpacity(0.75), 50);
    }

    function setActiveButton(btnId) {
        document.querySelectorAll('.button-row button')
            .forEach(btn => btn.classList.remove('active-btn'));
        document.getElementById(btnId).classList.add('active-btn');
    }

    return {
        onopen: () => {
            setActiveButton('btnCurrent');
            showOverlay(NOAA.current);

            document.getElementById('btnCurrent').onclick = () => {
                setActiveButton('btnCurrent');
                showOverlay(NOAA.current);
            };

            document.getElementById('btn24').onclick = () => {
                setActiveButton('btn24');
                showOverlay(NOAA.h24);
            };

            document.getElementById('btn48').onclick = () => {
                setActiveButton('btn48');
                showOverlay(NOAA.h48);
            };

            document.getElementById('btn72').onclick = () => {
                setActiveButton('btn72');
                showOverlay(NOAA.h72);
            };

            document.getElementById('btnUSA').onclick = () => {
                setActiveButton('btnUSA');
                showOverlay(NOAA.usa);
            };
        },

        onclose: () => {
            if (currentOverlay) {
                currentOverlay.setOpacity(0);
                setTimeout(() => {
                    map.removeLayer(currentOverlay);
                    currentOverlay = null;
                }, 300);
            }
        }
    };
});