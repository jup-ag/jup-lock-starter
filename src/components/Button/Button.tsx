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
        "border-[5px] text-black bg-(--pop-yellow) shadow-(--pop-shadow-pink-yellow) font-medium hover:cursor-pointer",
        "active:translate-y-[2px] active:shadow-(--pop-shadow-yellow-yellow)",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// export { styles as ButtonStyles };
