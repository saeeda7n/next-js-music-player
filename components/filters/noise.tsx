import React from "react";

export const ImageNoise = () => {
  return (
    <svg className="hidden">
      <filter id="coverFilter">
        <feTurbulence
          baseFrequency="0.65 0.65"
          type="fractalNoise"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="80"
          result="displacementMap"
        />
        <feComposite operator="in" in2="SourceGraphic" result="turbulence" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.1" />
          <feFuncG type="linear" slope="1.1" />
          <feFuncB type="linear" slope="1.1" />
        </feComponentTransfer>

        <feBlend in="SourceGraphic" mode="hard-light" />
      </filter>
    </svg>
  );
};

export const TextNoise = () => {
  return (
    <svg className="hidden">
      <filter id="textFilter">
        <feTurbulence
          baseFrequency="0.65 0.65"
          type="fractalNoise"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="4"
          result="displacementMap"
        />
        <feComposite operator="in" in2="SourceGraphic" result="turbulence" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.1" />
          <feFuncG type="linear" slope="1.1" />
          <feFuncB type="linear" slope="1.1" />
        </feComponentTransfer>

        <feBlend in="SourceGraphic" mode="hard-light" />
      </filter>
    </svg>
  );
};
