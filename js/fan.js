function goTop() {
    const image = document.getElementById('fanId');
    gsap.to(image, {
        y: -195,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
    });
}

function goDown() {
    const image = document.getElementById('fanId');
    gsap.to(image, {
        y: 30,
        opacity: -10,
        duration: 1,
        ease: "power2.inOut",
    });
}

var fanCounter = 0;
function startFanRotate() {
    fanCounter = fanCounter + 1
    goTop();
    const image = document.getElementById('fanId');

    gsap.to(image, {
        rotation: -30000 * fanCounter,
        duration: 30,
        ease: "linear",
    });
}
