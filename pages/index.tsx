import { MantineProvider } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { BioSection } from "../components/sections/BioSection";
import { HeroSection } from "../components/sections/HeroSection";
import styles from "../styles/Home.module.css";
import { ContactSection } from "../components/sections/ContactSection/ContactSection";
import { ResourcesSection } from "../components/sections/ResourcesSection";
import { Footer } from "../components/common/layout/Footer/Footer";
import { getContentFromCMS } from "../lib/api/content";

interface IProps {
  content: any;
}

const Home: NextPage<IProps> = (props: IProps) => {
  const { content } = props;

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        black: "#101113" /* dark 9 */,
        fontFamily:
          "Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        headings: {
          fontFamily: "Rowdies",
          sizes: {
            h1: {
              fontSize: "4rem",
            },
          },
        },
        other: { contentWidth: 1200 },
      }}
    >
      <div>
        <Head>
          <title>Bill O&apos;Connor&apos;s Landing Page</title>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤘🏻</text></svg>"
          />
        </Head>

        {/* Hero Section */}

        <main className={styles.main}>
          <HeroSection content={content?.hero} />
          <BioSection content={content?.bio} />
          <ResourcesSection content={content?.resources} />
          <ContactSection content={content?.contact} />
          <Footer />
        </main>
      </div>
    </MantineProvider>
  );
};

export async function getStaticProps() {
  // TODO: this should all happen in a serverless function that returns
  // formatted data
  // filter blogs for published
  // filter content for value present
  const content = await getContentFromCMS();

  return {
    props: { content },
  };
}

export default Home;
