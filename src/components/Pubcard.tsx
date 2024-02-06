import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"publication">["data"];
  secHeading?: boolean;
}

export default function Pubcard({
  href,
  frontmatter,
  secHeading = true,
}: Props) {
  const { title, pubDatetime, modDatetime, ogImage, tags, type } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "text-lg font-medium decoration-dashed hover:underline text-balance",
  };

  return (
    <li className="mb-12">
      <div className="grid sm:grid-cols-4 gap-3 grid-cols-1">
        <div className="col-span-1">
          <img src={`${ogImage}`} alt={title} width={200} height={400} />
        </div>
        <div className="col-span-3">
          <span className="px-2 py-1 text-xs font-medium bg-skin-accent text-skin-base rounded-md">
            {type}
          </span>
          <a
            href={href}
            className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
          >
            {secHeading ? (
              <h2 {...headerProps}>{title}</h2>
            ) : (
              <h3 {...headerProps}>{title}</h3>
            )}
          </a>
          <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />

          <div className="flex mt-2 flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-nowrap font-medium text-skin-accent rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
