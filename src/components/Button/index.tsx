import React, { type ComponentProps } from "react";

import { cn } from "../../styles/cn";
import { pixelatedBorderStyle } from "../../styles/pixelated";

export const Button: React.FC<ComponentProps<"button">> = ({
  children,
  className,
  style,
  ...props
}) => {
  const customStyle = {
    ...style,
    ...pixelatedBorderStyle,
  };

  return (
    <button
      style={customStyle}
      className={cn(
        "border-[5px] text-black bg-(--pop-yellow) shadow-(--pop-shadow-pink-yellow) font-medium enabled:hover:cursor-pointer py-1",
        "enabled:active:translate-y-[2px] enabled:active:shadow-(--pop-shadow-yellow-yellow)",
        "disabled:opacity-20",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
