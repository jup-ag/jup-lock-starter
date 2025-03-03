import type { ComponentProps } from "react";

import { cn } from "../../../styles/cn";

type Props = ComponentProps<"div">;
export const Field: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <div className={cn("space-y-2.5", className)} {...props}>
      {children}
    </div>
  );
};
