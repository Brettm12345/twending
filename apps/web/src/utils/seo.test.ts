import { describe, expect, it } from "vitest";
import { seo } from "./seo";

describe("seo", () => {
  it("returns the base metadata when no image is provided", () => {
    const metadata = seo({
      title: "Twending",
      description: "Trending repositories by language",
      image: "",
      keywords: ["github", "trending", "typescript"],
    });

    expect(metadata).toEqual(
      expect.arrayContaining([
        { title: "Twending" },
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        { property: "keywords", content: "github,trending,typescript" },
        {
          property: "description",
          content: "Trending repositories by language",
        },
      ]),
    );
    expect(metadata).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: "og:image" }),
        expect.objectContaining({ name: "twitter:image" }),
      ]),
    );
  });

  it("includes open graph and twitter image metadata when an image is provided", () => {
    const image = "https://example.com/og.png";

    const metadata = seo({
      title: "Twending",
      description: "Trending repositories by language",
      image,
      keywords: ["github"],
    });

    expect(metadata).toEqual(
      expect.arrayContaining([
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
      ]),
    );
  });
});
