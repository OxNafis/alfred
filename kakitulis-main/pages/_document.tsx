import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/images/alfred.ai.png"/>
                    <meta name="title" content="Alfred.ai: Your AI Copywriter"/>
                    <meta name="description" content="Alfred.ai is an AI copywriter, providing powerful AI-driven content generation for marketers,
            writers, and businesses. Discover the potential of AI-powered content creation with Alfred.ai"/>
                    <meta property="og:site_name" content="Alfred.ai"/>

                    <meta property="og:title" content="Alfred.ai: Your AI Copywriter"/>
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:title" content="Generate any UI component in seconds."/>
                    <meta
                        name="twitter:description"
                        content="Alfred.ai is an AI copywriter, providing powerful AI-driven content generation for marketers, writers, and businesses."
                    />
                    <meta
                        property="og:image"
                        content="alfred.ai.png"
                    />
                    <meta
                        name="twitter:image"
                        content="alfred.ai.png"
                    />
                    <script src="https://my.hellobar.com/ad70057c85f0c544997c44ae0968d20f1b802252.js"
                            type="text/javascript" charSet="utf-8" ></script>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
