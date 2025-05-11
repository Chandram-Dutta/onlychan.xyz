import { animate } from "animejs";
import { useEffect, useRef } from "react";

function Name() {
  const root = useRef(null);

  useEffect(() => {
    const spans = root.current.querySelectorAll("span");
    animate({
      targets: spans,
      translateY: [
        { value: "-2.75rem", easing: "easeOutExpo", duration: 600 },
        { value: 0, easing: "easeOutBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        value: "-1turn",
        delay: 0,
      },
      delay: animate.stagger(50),
      easing: "easeInOutCirc",
      loopDelay: 1000,
      loop: true,
    });
  }, []);

  return (
    <div ref={root}>
      <span>c</span>
      <span>h</span>
      <span>a</span>
      <span>n</span>
      <span>d</span>
      <span>r</span>
      <span>a</span>
      <span>m</span>
    </div>
  );
}

export default Name;
