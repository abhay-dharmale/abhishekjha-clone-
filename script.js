function revealElements() {
  document.querySelectorAll(".reveal")
    .forEach(function (elem) {
      let spanParent = document.createElement("span");
      let spanChild = document.createElement("span");

      spanParent.classList.add("parent");
      spanChild.classList.add("child");

      spanChild.innerHTML = elem.innerHTML;
      spanParent.appendChild(spanChild);

      elem.innerHTML = "";
      elem.appendChild(spanParent);
    })
}
revealElements();

function setValues(){
  gsap.set("nav a",{
    y: "-100%",
    opacity: 0
  });
  gsap.set(".home span .child",{
    y: "100%",
    opacity: 0
  });
  gsap.set(".home .row img",{
    opacity: 0
  });

  document.querySelectorAll("#Visual>g").forEach(function(e){
    let characters = e.childNodes[1].childNodes[1];

    characters.style.strokeDasharray = characters.getTotalLength() + "px";
    characters.style.strokeDashoffset = characters.getTotalLength() + "px";
  })
}
setValues();

function loaderAnime(){
  
var tl = gsap.timeline();

tl
.from(".loader .child span", {
  x: 100,
  stagger: 0.1,
  opacity: 0,
  ease: Power1.in,
  duration: 0.7,
})

  .to(".loader .parent .child", {
    y: "-100%",
    ease: Circ.easeInOut,
    duration: 1,
  })

  .to(".loader",{
    height: 0,
    ease: Circ.easeInOut,
    duration: 1,
  })

  .to(".green",{
    height: "100%",
    top:0,
    duration: 1,
    delay: -1,
    ease: Circ.easeInOut,
  })
  .to(".green",{
    height: 0,
    duration: .4,
    delay: -.2,
    ease: Circ.easeOut,
    onComplete: function(){
      homePageAnime();
    }
})

}
loaderAnime();

function svgAnime(){

  gsap.to("#Visual>g>g>path, #Visual>g>g>polyline",{
    strokeDashoffset: 0,
    duration: 1.7,
    delay: -.5,
    ease: "power3.inOut",
  })
}

function homePageAnime(){
  let tl = gsap.timeline();

  tl
  .to("nav a",{
    y: 0,
    opacity: 1,
    ease: Expo.easeInOut,
    duration: .7,
    stagger: .05
  })
  .to(".home span .child",{
    y: 0,
    opacity: 1,
    delay: -1.8,
    ease: Expo.easeInOut,
    duration: 1.9,
    stagger: .05
  })
  .to(".home .row img",{
    opacity: 1,
    delay: -.5,
    onComplete: function(){
      svgAnime();
    }
  });
}

function hoverCard1() {
  const cursor = document.querySelector(".cursor");
  const cnt2 = document.querySelector(".cnt2");

  document.addEventListener("mousemove", function (dets) {
    cursor.style.left = dets.x - 50 + "px";
    cursor.style.top = dets.y - 0 + "px";
  });

  let visibleImage;

  cnt2.addEventListener("mousemove", (dets) => {
    visibleImage = dets.target;
    cursor.children[dets.target.dataset.index].style.opacity = 1;
    visibleImage.style.filter = "grayscale(1)";

    document.querySelectorAll(".work, .extra, .archive, .home").forEach(function (element) {
      element.style.backgroundColor = dets.target.dataset.color;
    });
  });

  cnt2.addEventListener("mouseleave", () => {
    if (visibleImage) {
      cursor.children[visibleImage.dataset.index].style.opacity = 0;
      visibleImage.style.filter = "grayscale(0)";

      document.querySelectorAll(".work, .extra, .archive, .home").forEach(function (element) {
        element.style.backgroundColor = "#f2f2f2";
      });
    }
  });
}
function hoverCard2() {
  const cursor = document.querySelector(".cursor");
  const cnt1 = document.querySelector(".cnt1");

  document.addEventListener("mousemove", function (dets) {
    cursor.style.left = dets.x - 50 + "px";
    cursor.style.top = dets.y + 250 + "px";
  });

  let visibleImage;

  cnt1.addEventListener("mousemove", (dets) => {
    visibleImage = dets.target;
    cursor.children[dets.target.dataset.index].style.opacity = 1;
    visibleImage.style.filter = "grayscale(1)";

    document.querySelectorAll(".work, .extra, .archive, .home").forEach(function (element) {
      element.style.backgroundColor = dets.target.dataset.color;
    });
  });

  cnt1.addEventListener("mouseleave", () => {
    if (visibleImage) {
      cursor.children[visibleImage.dataset.index].style.opacity = 0;
      visibleImage.style.filter = "grayscale(0)";

      document.querySelectorAll(".work, .extra, .archive, .home").forEach(function (element) {
        element.style.backgroundColor = "#f2f2f2";
      });
    }
  });
}
hoverCard1();
hoverCard2();

function locomotiveSCroll(){
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({
    scroller: '#main',
    markers: false
  });
  
  var scroll = new LocomotiveScroll( {
      el: document.querySelector( '#main' ),
      smooth: true,
      multiplier: 1.0,
      getDirection: true,
  });
  
  // Update scroll position
  scroll.on( 'scroll', ( instance ) => {
      ScrollTrigger.update();
      document.documentElement.setAttribute( 'data-scrolling', instance.direction );
  });
  
  // Scroll position for ScrollTrigger
  ScrollTrigger.scrollerProxy( '#main', {
      scrollTop( value ) {
          return arguments.length ? scroll.scrollTo( value, 0, 0 ) : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.querySelector( '#main' ).style.transform ? "transform" : "fixed"
  } );
  
  
  ScrollTrigger.addEventListener( 'refresh', () => scroll.update() );
  ScrollTrigger.refresh();

}
locomotiveSCroll()