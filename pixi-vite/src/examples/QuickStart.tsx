import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import sampleImg from "../assets/sample.png";


export const QuickStart = () => {
  const [app] = useState<PIXI.Application>(
    new PIXI.Application({ width: 640, height: 360 })
  );
  const [sprite] = useState(
    PIXI.Sprite.from(sampleImg, {
      width: 50,
      height: 50,
    })
  );

  const ref = useRef<HTMLDivElement>(null);

  const updateLoop = () => {
    let elapsed = 0.0;
    // Tell our application's ticker to run a new callback every frame, passing
    // in the amount of time that has passed since the last tick
    app.ticker.add((delta) => {
      //! delta ~= 0.5

      // Add the time to our total elapsed time
      elapsed += delta;

      // Update the sprite's X position based on the cosine of our elapsed time.  We divide
      // by 50 to slow the animation down a bit...
      // elapsed / 50.0 = 0 ~ 2 * PI  = 0 ~ 360 degree
      // sprite.x = 100 + (-1 ~ 1) * 100 = 0 ~ 200
      sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
    });
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.appendChild(app.view as any);
      app.stage.addChild(sprite);
      updateLoop();
    }
  }, []);

  return <div ref={ref}></div>;
};
