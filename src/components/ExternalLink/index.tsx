import type { ComponentProps } from "react";

export const ExternalLink: React.FC<ComponentProps<"a">> = (props) => {
  return <a {...props} target="_blank" rel="noopener" />;
};
