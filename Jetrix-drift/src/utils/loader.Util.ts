import { gsap, Power4, Linear } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

function loaderAnimation() {
  const mainCircle = document.querySelector("#mainCircle") as SVGCircleElement | null;
  const mainContainer = document.querySelector("#mainContainer") as SVGGElement | null;
  const car = document.querySelector("#car") as SVGGElement | null;
  const mainSVG = document.querySelector(".mainSVG") as SVGSVGElement | null;
  const circlePath = document.querySelector("#circlePath") as SVGPathElement | null;

  // Safety check for required elements
  if (!mainCircle || !mainContainer || !car || !mainSVG || !circlePath) {
    console.error("Required SVG elements not found");
    return () => {}; // Return empty cleanup function
  }

  const circleRadius = mainCircle.getAttribute("r");
  if (circleRadius) {
    gsap.set(circlePath, {
      attr: {
        r: circleRadius,
      },
    });
  }

  try {
    MorphSVGPlugin.convertToPath("#circlePath");
  } catch (e) {
    console.warn("MorphSVGPlugin may not be properly registered", e);
  }

  const mainCircleRadius = Number(circleRadius) || 130;
  const numDots = mainCircleRadius / 2;
  const step = 360 / numDots;

  TweenMax.set(mainSVG, { visibility: "visible" });
  TweenMax.set(car, { transformOrigin: "50% 50%" });
  TweenMax.set("#carRot", {
    transformOrigin: "0% 0%",
    rotation: 30,
  });

  const circleBezier = MorphSVGPlugin.pathDataToBezier(
    circlePath.getAttribute("d"),
    {
      offsetX: -20,
      offsetY: -5,
    }
  );

  const mainTl = gsap.timeline();

  function makeDots() {
    let d, angle, tl;

    for (let i = 0; i < numDots; i++) {
      const puffTemplate = document.querySelector("#puff");
      if (!puffTemplate) {
        console.error("Puff template not found");
        break;
      }
      d = puffTemplate.cloneNode(true);
      mainContainer.appendChild(d);

      angle = step * i;

      TweenMax.set(d, {
        x: Math.cos((angle * Math.PI) / 180) * mainCircleRadius + 400,
        y: Math.sin((angle * Math.PI) / 180) * mainCircleRadius + 300,
        rotation: Math.random() * 360,
        transformOrigin: "50% 50%",
      });

      tl = gsap.timeline({ repeat: -1 });
      tl.from(d, 0.2, {
        scale: 0,
        ease: Power4.easeIn,
      }).to(d, 1.8, {
        scale: Math.random() + 2,
        alpha: 0,
        ease: Power4.easeOut,
      });

      mainTl.add(tl, i / (numDots / tl.duration()));
    }

    const carTl = gsap.timeline({ repeat: -1 });
    carTl.to(car, tl.duration(), {
      bezier: {
        type: "cubic",
        values: circleBezier,
        autoRotate: true,
      },
      ease: Linear.easeNone,
    });

    mainTl.add(carTl, 0.05);
  }

  makeDots();
  mainTl.time(120);

  gsap.to(mainContainer, {
    duration: 20,
    rotation: -360,
    svgOrigin: "400 300",
    repeat: -1,
    ease: "none",
  });

  mainTl.timeScale(1.1);

  // CLEANUP (important in React)
  return () => {
    gsap.killTweensOf("*");
    if (mainContainer) {
      mainContainer.innerHTML = "";
    }
  };
}

export default loaderAnimation;
