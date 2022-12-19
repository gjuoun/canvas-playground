import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import sampleImg from "../assets/carrot.png";

export const Mask = () => {
  const [app] = useState<PIXI.Application>(
    new PIXI.Application({ background: "#1099bb", width: 640, height: 360 })
  );

  const [frame] = useState(() => {
    const frame = new PIXI.Graphics();
    frame.beginFill(0x666666);
    frame.lineStyle({ color: 0xffff13, width: 4, alignment: 0 });
    frame.drawRect(0, 0, 208, 208);
    // center the frame
    frame.position.set(320 - 104, 180 - 104);
    return frame;
  });

  const [text] = useState(() => {
    let text = new PIXI.Text(
      "This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n" +
        "You can put anything in the container and it will be masked!",
      {
        align: "center",
        fontSize: 24,
        fill: 0x1010ff,
        wordWrap: true,
        wordWrapWidth: 180,
      }
    );
    text.x = 10;
    return text;
  });

  const [maskContainer] = useState(() => {
    let maskContainer = new PIXI.Container();
    // ! mask
    let mask = new PIXI.Graphics();
    // Add the rectangular area to show， any color is fine
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, 200, 200);
    mask.endFill();
    //! Set the mask to use our graphics object from above
    maskContainer.mask = mask;
    // Add the mask as a child, so that the mask is positioned relative to its parent
    maskContainer.addChild(mask);
    // Offset by the window's frame width
    maskContainer.position.set(4, 4);
    return maskContainer;
  });

  const ref = useRef<HTMLDivElement>(null);

  const updateLoop = () => {
    // Add a ticker callback to scroll the text up and down
    let elapsed = 0.0;
    app.ticker.add((delta) => {
      // Update the text's y coordinate to scroll it
      elapsed += delta;
      text.y = 10 + -100.0 + Math.cos(elapsed / 50.0) * 100.0;
    });
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.appendChild(app.view as any);

      app.stage.addChild(frame);

      frame.addChild(maskContainer);
      maskContainer.addChild(text);

      updateLoop();
    }
  }, []);

  return <div ref={ref}></div>;
};
