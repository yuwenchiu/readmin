// import afterThoughtImg from "../assets/after-thought.webp";
// import bookManagementImg from "../assets/book-management.webp";
// import shareBookImg from "../assets/share-book.webp";
import { Link } from "react-router";
import bookBg from "@/assets/book-bg.webp";
import bookContent from "@/assets/book-content.webp";
import { Button } from "@/components/ui/button";

// function FeatureBlock({
//   title,
//   img,
//   imgAlign = "left",
//   content,
// }: {
//   title: string;
//   img: string;
//   imgAlign?: "left" | "right";
//   content: string;
// }) {
//   return (
//     <div className="flex h-60 w-full place-items-center justify-center gap-x-10 rounded-4xl bg-white">
//       {imgAlign == "left" && <img src={img} alt={title} className="max-w-52" />}
//       <div className="grid h-fit max-w-[300px] gap-y-5">
//         <h1 className="text-xl font-medium">{title}</h1>
//         <p className="text-left text-base font-light">{content}</p>
//       </div>
//       {imgAlign == "right" && (
//         <img src={img} alt={title} className="max-w-52" />
//       )}
//     </div>
//   );
// }

function Home() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <header className="mt-36 flex flex-col items-center 2xl:mt-80">
        <h1 className="text-5xl font-thin tracking-wider 2xl:text-6xl">
          Read Admin for YOU
        </h1>
        <h2 className="mt-8 mb-12 w-[480px] text-center text-base/7 font-light 2xl:mt-10 2xl:mb-16 2xl:text-lg/7">
          Not just a personal library, but a place where your books and thoughts
          live, and shared moments come together.
        </h2>

        <section className="flex gap-x-4">
          <Link to="/register">
            <Button>Build my shelf</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Back to library</Button>
          </Link>
        </section>
      </header>

      <main className="mt-10 2xl:mt-32">
        <div className="relative">
          <img
            src={bookContent}
            alt="article"
            className="absolute top-[150px] left-[72px] max-w-[1080px]"
          />
          <img src={bookBg} alt="book" />
        </div>
      </main>

      {/* <main className="flex w-full flex-col gap-y-9">
        <FeatureBlock
          title="Keep your books in one place"
          img={bookManagementImg}
          content="Whether it’s an eBook or a paperback, easily manage everything you own in one personalized shelf."
        />
        <FeatureBlock
          title="Share with people you love"
          img={shareBookImg}
          imgAlign="right"
          content="Be part of a family, and let your shelves come together—so everyone knows what’s on each other’s shelves!"
        />
        <FeatureBlock
          title="Keep the thoughts that matter"
          img={afterThoughtImg}
          content="Add personal notes and reflections to every book—your library becomes your memory."
        />
      </main> */}
    </div>
  );
}

export default Home;
