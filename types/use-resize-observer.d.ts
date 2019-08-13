declare module "use-resize-observer" {
  export default function useResizeObserver<E extends HTMLElement>(): [
    React.RefObject<E>,
    number,
    number
  ];
}
