import React from "react";

export type PropsWithAs<O extends object, I extends object = {}> = O &
  I & {
    as?: keyof JSX.IntrinsicElements | React.ComponentType<O>;
  };
