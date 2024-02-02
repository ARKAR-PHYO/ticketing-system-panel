import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
// const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>(
//   ({ ...other }, ref) => <Link ref={ref} {...other} />
// );

const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>(function RouterLink(
  { ...other },
  ref
) {
  return <Link ref={ref} {...other} />;
});

export default RouterLink;
