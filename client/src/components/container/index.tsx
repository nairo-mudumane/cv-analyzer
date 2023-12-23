import clsx from "clsx";

export function Container(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={clsx(props.className, "container mx-auto px-4")}>
      {props.children}
    </div>
  );
}
