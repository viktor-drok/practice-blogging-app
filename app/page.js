import dynamic from "next/dynamic";

const LinkNewPost = dynamic(() => import("./components/LinkNewPost"), { ssr: false });
const LinkUserOwnPosts = dynamic(() => import("./components/LinkUserOwnPosts"), { ssr: false });
import AllPosts from "./components/AllPosts";
import { Suspense } from "react";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <main suppressHydrationWarning >
      <div>
        <Suspense fallback={ <div>Loading...</div> }>
          <Grid container justifyContent="center" alignItems="center" gap={ 50 } sx={ { mt: "20px" } }>
            <LinkNewPost />
            <LinkUserOwnPosts />
          </Grid>
          <AllPosts />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;