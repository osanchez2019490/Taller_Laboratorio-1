console.clear();

gsap.registerPlugin(Draggable, InertiaPlugin);

const slidesContainer = document.querySelector(".slides-container");
const slides = gsap.utils.toArray(".slide");
const snapPoints = slides.map((_, i) => -(window.innerWidth * i));
let direction;
let currentSlide = 0;

Draggable.create(slidesContainer, {
  type: "x",
  bounds: {
    minX: snapPoints[slides.length - 1],
    maxX: 0
  },
  onDrag: function () {
    direction = this.deltaX;
  },
  inertia: true,
  snap: {
    x: function (v) {
      console.log("creating snap points", Date.now(), v);
      if (direction < 0 && currentSlide < slides.length - 1) {
        currentSlide++;
      } else if (direction > -1 && currentSlide > 0) {
        currentSlide--;
      }
      return snapPoints[currentSlide];
    }
  }
});