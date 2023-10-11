import { LinkProps, Link as RouterLink } from "react-router-dom";

export default function Link(props: LinkProps) {
  return <RouterLink {...props} className={props.className + ' link'}>

  </RouterLink>
}