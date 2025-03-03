import React, { type ComponentProps } from "react";

import { pixelatedBorderStyle } from "../../styles/pixelated";
import { cn } from "../../styles/cn";

export type InputProps = ComponentProps<"input">;

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        `relative inline-block border-[5px] bg-(--pop-yellow) text-black text-lg shadow-(--pop-shadow-yellow-yellow) w-full`,
        className,
      )}
      style={pixelatedBorderStyle}
    >
      <input
        className={`w-full font-minecraft px-1 bg-transparent focus:outline-none`}
        {...props}
      />
    </div>
  );
};
