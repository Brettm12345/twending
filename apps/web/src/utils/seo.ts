import type { MetaHTMLAttributes } from "react";

export const seo = ({
  title,
  description,
  image,
  keywords,
}: {
  title: string;
  description: string;
  image: string;
  keywords: string[];
}): MetaHTMLAttributes<HTMLMetaElement>[] =>
  [
    { title },
    { charSet: "utf-8" },
    { property: "keywords", content: keywords.join(",") },
    { property: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    ...(image
      ? [
          {
            property: "og:image",
            content: image,
          },
          {
            property: "og:image:width",
            content: "1200",
          },
          {
            property: "og:image:height",
            content: "630",
          },
          {
            name: "twitter:image",
            content: image,
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
        ]
      : []),
  ] as const;
