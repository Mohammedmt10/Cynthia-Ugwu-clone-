var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function bound1stpage(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y:'-10',
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    })

    .to(".boundingelem",{
      y:0,
      ease: Expo.easeInOut,
      delay: 0.7,
      duration: 2,
      stagger:0.2  
    })
    .from("#ggfooter",{
        y:'-10',
        opacity: 0,
        duration: 2,
        delay: -1,
        ease: Expo.easeInOut 
      })

}

function circlemousefollower(xscale,yscale){
    window.addEventListener("mousemove",function(detls){
        document.querySelector("#minicircle").style.transform = `translate(${detls.clientX}px,${detls.clientY}px) scale(${xscale},${yscale})`;
    })
}

function skewcircle(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(detls){
        clearTimeout(timeout)
        xscale = gsap.utils.clamp(0.75,1.25,detls.clientX - xprev);
        yscale = gsap.utils.clamp(0.75,1.25,detls.clientY - yprev);
        xprev = detls.clientX;
        yprev = detls.clientY;
        circlemousefollower(xscale,yscale);
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${detls.clientX}px,${detls.clientY}px) scale(1,1)`;
        },100)
    })
}



document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;
    
    elem.addEventListener("mousemove",function(detls){
        diffrot = detls.clientX - rotate;
        rotate = detls.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:detls.clientY - elem.getBoundingClientRect().top,
            left:detls.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot*.8),
        });
    }); 
    }
);
document.querySelectorAll(".elem").forEach(function(elem){
    elem.addEventListener("mouseleave",function(detls){

        gsap.to(elem.querySelector("img"),{
            opacity:0,        
        });
    }); 
    }
);
skewcircle();
circlemousefollower();
bound1stpage();