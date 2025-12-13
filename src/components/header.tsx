import { Link } from "react-router";
import readminLogo from "../assets/readmin-logo.svg";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 flex h-16 place-items-center justify-between px-8">
      <Link to="/">
        <img src={readminLogo} alt="readmin" className="max-h-7" />
      </Link>
      <section className="flex gap-x-2.5">
        <Link to="/login">
          <Button variant="secondary">Log in</Button>
        </Link>
        <Link to="/register">
          <Button>Get Started</Button>
        </Link>
      </section>
    </header>
  );
}

export default Header;
