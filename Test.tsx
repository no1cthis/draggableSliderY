import gsap, { Back } from "gsap";
import Draggable from "gsap/Draggable";
import { useCallback, useEffect, useRef } from "react";

import cl from "./test.module.scss";

interface TestProps {}

const Test: React.FC<TestProps> = () => {
  const isPressed = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const finishY = useRef(0);
  const top = useRef(0);
  const yHistory = useRef<number[]>([]);
  const speed = useRef(-1);
  const direction = useRef(0);
  const smoothId = useRef(0);

  const start = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!ref.current || !innerRef.current) return;

      cancelAnimationFrame(smoothId.current);

      isPressed.current = true;
      top.current = parseInt(innerRef.current.style.top);
      const rect = ref.current.getBoundingClientRect();
      startY.current = e.nativeEvent.clientY - rect.top;
      //   console.log(
      //     window.innerHeight - top.current,
      //     innerRef.current.clientHeight
      //   );
      //   console.log(window.innerHeight - top.current, window.innerHeight);
    },
    []
  );
  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();

      if (!isPressed.current || !ref.current || !innerRef.current) return;
      const rect = ref.current.getBoundingClientRect();

      yHistory.current.shift();
      yHistory.current.push(
        startY.current - (e.nativeEvent.clientY - rect.top)
      );

      //   console.log(yHistory.current);
      const newTop =
        top.current -
        (startY.current - (e.nativeEvent.clientY - rect.top)) * 1.5;
      innerRef.current.style.top = `${newTop}px`;

      finishY.current = newTop;
    },
    []
  );

  const finish = useCallback(() => {
    isPressed.current = false;
    const last = yHistory.current.length - 1;
    direction.current = yHistory.current[last] - yHistory.current[0];
    speed.current = Math.abs(direction.current);
    smooth();
  }, []);

  const smooth = () => {
    if (!innerRef.current) return;

    yHistory.current.shift();
    yHistory.current.push(0);
    speed.current -= 2;
    top.current = parseInt(innerRef.current.style.top);
    const newTop =
      direction.current < 0
        ? top.current + speed.current * 0.05
        : top.current - speed.current * 0.05;
    innerRef.current.style.top = `${newTop}px`;

    if (
      window.innerHeight - top.current < window.innerHeight / 2 ||
      (speed.current < 0 &&
        window.innerHeight - top.current < window.innerHeight)
    ) {
      cancelAnimationFrame(smoothId.current);
      gsap.to(innerRef.current, { top: 0 });
    }

    if (
      window.innerHeight - top.current >
        innerRef.current.clientHeight + window.innerHeight / 2 ||
      (speed.current < 0 &&
        window.innerHeight - top.current > innerRef.current.clientHeight)
    ) {
      cancelAnimationFrame(smoothId.current);
      gsap.to(innerRef.current, {
        top: -(innerRef.current.clientHeight - window.innerHeight),
      });
    }

    smoothId.current = requestAnimationFrame(smooth);
    if (speed.current < 0) cancelAnimationFrame(smoothId.current);
  };

  useEffect(() => {
    for (let i = 0; i < 20; i++) yHistory.current.push(0);
    if (!innerRef.current) return;
    innerRef.current.style.top = `0px`;
  }, []);
  return (
    <div className={cl.wrapper} ref={ref}>
      <div
        className={cl.wrapper__inner}
        onMouseDown={start}
        onMouseUp={finish}
        onMouseMove={onMove}
        onMouseLeave={(e) => {
          e.preventDefault();
          isPressed.current = false;
        }}
        ref={innerRef}
      >
        <div style={{ width: 100, height: 100, backgroundColor: "red" }}></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "yellow" }}
        ></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "green" }}
        ></div>
        <div style={{ width: 100, height: 100, backgroundColor: "red" }}></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "yellow" }}
        ></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "green" }}
        ></div>
        <div style={{ width: 100, height: 100, backgroundColor: "red" }}></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "yellow" }}
        ></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "green" }}
        ></div>
        <div style={{ width: 100, height: 100, backgroundColor: "red" }}></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "yellow" }}
        ></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "green" }}
        ></div>
        <div style={{ width: 100, height: 100, backgroundColor: "red" }}></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "yellow" }}
        ></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "green" }}
        ></div>
        <div style={{ width: 100, height: 100, backgroundColor: "red" }}></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "yellow" }}
        ></div>
        <div
          style={{ width: 100, height: 100, backgroundColor: "green" }}
        ></div>
      </div>
    </div>
  );
};

export default Test;
