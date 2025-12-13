import logoSquare from "../assets/logo-square-dark.svg";

function LoadingPage() {
  return (
    <div className="grid w-full h-[calc(100vh-64px)] place-content-center overflow-hidden">
      <img src={logoSquare} alt="loading" className="max-w-14 animate-bounce" />
      <span className="mb-32 font-mono font-extralight text-sm tracking-tight animate-pulse">loading</span>
    </div>
  );
}

export default LoadingPage;
