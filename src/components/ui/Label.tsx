import React from "react";

export interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {}

export const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label
      className={`mb-1 block font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
