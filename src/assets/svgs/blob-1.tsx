import type { SVGAttributes } from 'react';

const BlobOne = ({ fill = '#ffb147', ...props }: SVGAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="10015.io"
      viewBox="0 0 480 480"
      {...props}
    >
      <path
        fill={fill}
        d="M422.5,281.5Q369,323,347.5,376Q326,429,270.5,422.5Q215,416,149.5,418Q84,420,53,362Q22,304,56.5,250Q91,196,97.5,139.5Q104,83,159.5,75.5Q215,68,265,71.5Q315,75,347,113Q379,151,427.5,195.5Q476,240,422.5,281.5Z"
      />
    </svg>
  );
};

export default BlobOne;
