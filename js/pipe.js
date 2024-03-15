var pipe = document.getElementsByClassName('pipeBall')[0];

function upPipe() {
    gsap.to(pipe, {
        duration: 1.5,
        ease: "power2.inOut",
        height: 440,
        onComplete: function () {
            downPipe();
        },
    });
}

function downPipe() {
    gsap.to(pipe, {
        duration: 2,
        ease: "power2.inOut",
        height: 0,
    });
}