import dynamic from "next/dynamic";

const Header = dynamic(() => import("./components/Header"), { ssr: false });
const TestPost = dynamic(() => import("./components/LinkNewPost"), { ssr: false });
import Posts from "./components/posts/page";
import { Suspense } from "react";

const Home = () => {
  return (
    <main>
      <div>
        <Suspense fallback={ <div>Loading...</div> }>
          <Header />
          <TestPost />
          <Posts />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;