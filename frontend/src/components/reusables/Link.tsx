import { Link as RouterLink } from 'react-router-dom';
import Hoverable from './Hoverable';

interface LinkProps {
  to: string;
  text: string;
  color?: string;
}

export default function Link({to, text, color}: LinkProps) {
  if (color == undefined) {
    color = 'inherit'
  }
  return <RouterLink className={`p-2 text-decoration-none text-` + color} to={to}>
    <Hoverable text={text} color={color}></Hoverable>
  </RouterLink>
}