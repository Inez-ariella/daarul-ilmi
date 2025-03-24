
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 font-bold text-xl"
    >
      <span className="bg-gradient-to-r from-daarul-primary to-daarul-accent bg-clip-text text-transparent">
        DAARUL ILMI
      </span>
    </Link>
  );
}
