import {Helmet} from "react-helmet";

const Metadata = () => (
  <Helmet>
    {/* Basic Meta Tags */}
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Tablet Weaving Editor is a web-based tool that allows users to design, edit, and visualize tablet weaving patterns in real-time. Create intricate designs with ease."
    />
    <meta name="author" content="Hanna Gaudasińska-Zapaśnik" />
    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta
      property="og:title"
      content="Tablet Weaving Editor - Design and Edit Patterns"
    />
    <meta
      property="og:description"
      content="A free, web-based tool to design and edit tablet weaving patterns. Create intricate designs with ease and visualize them in real-time."
    />
    <meta
      property="og:url"
      content="https://hgzdev.github.io/tablet-weaving-editor/"
    />
    {/* <meta
      property="og:image"
      content="https://hgzdev.github.io/tablet-weaving-editor/og-image.jpg"
    /> */}
    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Tablet Weaving Editor - Design and Edit Patterns"
    />
    <meta
      name="twitter:description"
      content="Create, design, and edit tablet weaving patterns using this easy-to-use, web-based tool."
    />
    <meta
      name="twitter:url"
      content="https://hgzdev.github.io/tablet-weaving-editor/"
    />
    {/* <meta
      name="twitter:image"
      content="https://hgzdev.github.io/tablet-weaving-editor/og-image.jpg"
    /> */}
    {/* Favicon */}
    <link
      rel="icon"
      href="https://hgzdev.github.io/tablet-weaving-editor/favicon.ico"
      type="image/x-icon"
    />
    <title>Tablet Weaving Editor</title>
  </Helmet>
);

export default Metadata;
