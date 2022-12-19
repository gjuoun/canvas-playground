import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import sampleImg from "../assets/carrot.png";

export const Bunny = () => {
  const [app] = useState<PIXI.Application>(
    new PIXI.Application({ background: "#1099bb" })
  );
  const [container] = useState(new PIXI.Container());

  const [sprites] = useState(() => {
    const texture = PIXI.Texture.from(sampleImg);

    const sprites = Array.from(Array(1).keys()).map((i) => {
      const bunny = new PIXI.Sprite(texture);
      bunny.anchor.set(0.5);
      bunny.x = (i % 5) * 40;
      bunny.y = Math.floor(i / 5) * 40;
      console.log("bunny: ", bunny);

      return bunny;
    });

    return sprites;
  });

  const ref = useRef<HTMLDivElement>(null);

  const updateLoop = () => {
    // Listen for animate update
    app.ticker.add((delta) => {
      // rotate the container!
      // use delta to create frame-independent transform
      container.rotation -= 0.001 * delta;
      // sprites.forEach((sprite) => {
      //   // rotate the sprite
      //   sprite.rotation += 0.01 * delta;
      // });
    });
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.appendChild(app.view as any);

      app.stage.addChild(container);

      container.addChild(...sprites);
      // Move container to the center
      container.x = app.screen.width / 2;
      container.y = app.screen.height / 2;

      // Center bunny sprite in local container coordinates
      container.pivot.x = container.width / 2;
      container.pivot.y = container.height / 2;

      updateLoop();
    }
  }, []);

  return <div ref={ref}></div>;
};
