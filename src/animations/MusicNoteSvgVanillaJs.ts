interface MusicNoteProps {
  fill?: string;
  width?: string;
  height?: string;
  stroke?: string;
  strokeWidth?: string;
  className?: string;
  x: number;
  y: number;
  type: "threeSemitones" | "oneSemitone" | "twoSemitones";
}

export const MusicNoteSvg = ({
  fill,
  width = "200",
  height = "200",
  x,
  y,
  stroke = "#000000",
  strokeWidth = "12",
  className,
  type = "threeSemitones",
}: MusicNoteProps) => {
  const ns = "http://www.w3.org/2000/svg";
  const svg: SVGSVGElement = document.createElementNS(ns, "svg");
  svg.setAttribute("fill", fill || "");
  svg.setAttribute("class", className || "");
  svg.setAttribute("height", height);
  svg.setAttribute("width", width);
  svg.setAttribute("version", "1.1");
  svg.setAttribute("xmlns", ns);
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("viewBox", "0 0 511.999 511.999");
  svg.setAttribute("xml:space", "preserve");
  svg.setAttribute("stroke", stroke);
  svg.setAttribute("stroke-width", strokeWidth);
  svg.setAttribute("style", `top:${y}px; left:${x}px`);
  let html;
  if (type == "threeSemitones") html = ThreeSemitones();
  if (type == "twoSemitones") html = TwoSemitones();
  if (type == "oneSemitone") html = OneSemitone();
  //console.log("SVG HTML:", svg.innerHTML);
  svg.innerHTML = "\n" + html.replace(/\n/g, " ").replace(/\s+/g, " ") + "\n";
  //console.log("Created SVG:", svg);
  return svg;
};

const TwoSemitones = () =>
  `<g id="TwoSemitones" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
></g>
  <g id="SVGRepo_iconCarrier">
    <g>
      <g>
        <path d="M473.759,345.032c0-33.671,0-309.782,0-308.7c0-11.316-5.272-21.985-14.261-28.86c-8.989-6.874-20.668-9.167-31.589-6.202 L193.874,64.804c-28.27,7.674-47.895,33.336-47.895,62.63c0,5.912,0,179.704,0,261.432c-11.14-0.276-22.986,1.023-34.987,4.099 c-47.736,12.232-79.844,47.868-71.714,79.598c8.129,31.73,53.419,47.535,101.155,35.304 c44.874-11.498,75.928-43.678,72.739-73.853V167.414l193.393-52.5v184.97c-11.14-0.276-22.986,1.023-34.987,4.099 c-47.736,12.231-79.844,47.868-71.713,79.598c8.13,31.729,53.419,47.535,101.155,35.304 C445.892,407.385,476.947,375.207,473.759,345.032z"></path>
      </g>
    </g>
  </g>`;

const ThreeSemitones = () =>
  ` <g id="ThreeSemitones" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <path d="M339.141,71.203l-154.63-69.7c-5.261-2.373-11.367-1.913-16.213,1.22c-4.846,3.132-7.774,8.508-7.774,14.28v204.643 l-72.49,9.243c-9.236,1.207-17.915,4.912-25.098,10.713c-10.41,8.405-16.924,20.362-18.341,33.667 c-1.417,13.304,2.431,26.364,10.838,36.773c8.406,10.409,20.363,16.924,33.667,18.341c1.808,0.193,3.609,0.288,5.401,0.288 c11.402,0,22.378-3.86,31.374-11.124l57.898-46.751c3.915-3.18,6.873-7.258,8.69-11.812c1.316-2.414,2.065-5.182,2.065-8.125 V110.996l118.392,54.091c0.736,0.335,1.484,0.595,2.237,0.818v125.441l-72.49,9.243c-9.235,1.207-17.913,4.912-25.098,10.712 c-21.488,17.354-24.854,48.953-7.503,70.441c9.884,12.242,24.392,18.601,39.02,18.601c11.052,0,22.173-3.63,31.421-11.098 l57.898-46.751c3.915-3.179,6.873-7.257,8.689-11.811c1.316-2.414,2.065-5.182,2.065-8.125V86.702 C349.156,80.016,345.236,73.95,339.141,71.203z"></path>
        </g>
      </g>
      <g>
        <g>
          <path d="M450.692,181.356c-9.389,0-17.001,7.612-17.001,17.001v204.5l-73.624,9.386c-9.236,1.207-17.915,4.912-25.098,10.713 c-21.489,17.352-24.856,48.951-7.503,70.441c9.884,12.242,24.392,18.601,39.02,18.601c11.052,0,22.173-3.63,31.421-11.098 l57.897-46.751c2.685-2.181,4.916-4.786,6.644-7.675c3.227-3.094,5.245-7.44,5.245-12.263V198.357 C467.693,188.968,460.082,181.356,450.692,181.356z"></path>
        </g>
      </g>
    </g>`;

const OneSemitone = () =>
  ` <g id="OneSemitone" strokeWidth="0"></g>
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M233.095,126.686V344.69c-22.085-3.386-47.475-1.694-73.188,6.011 C95.1,370.12,52.869,420.25,65.58,462.669s75.551,61.064,140.358,41.645c64.807-19.419,107.039-69.549,94.328-111.968V165.707 c0.585-0.211,1.388-0.437,2.459-0.646c28.632-5.565,58.703,7.847,77.172,29.597c19.338,22.773,28.562,50.896,35.46,79.452 l0.245,1.029c1.452,5.949,6.429,10.68,12.865,11.514c8.353,1.083,16.002-4.807,17.092-13.158c5.043-38.683,5.2-77.706-8.867-114.699 c-12.955-34.065-36.765-63.066-67.499-82.639c-18.964-12.078-40.572-21.501-62.835-25.266c-0.767-0.121-1.446-0.227-2.031-0.32 c-0.885-0.09-1.628-0.165-2.228-0.226c-0.309-0.028-0.582-0.051-0.816-0.072c-0.095-0.017-0.174-0.031-0.238-0.043 c-0.113-0.022-0.17-0.033-0.17-0.033c-0.202-0.039-0.41-0.068-0.613-0.105V33.584C300.265,15.037,285.228,0,266.679,0 c-18.549,0-33.584,15.037-33.584,33.584L233.095,126.686L233.095,126.686z"></path>
    </g>
  `;
