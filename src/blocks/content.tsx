import Image from "next/image";
import clsx from "clsx";

interface BlockContent {
  block: {
    title: string;
    text: string;
    image: {
      url: string;
      alt: string;
    };
    imageLeft: string;
  };
}

export default function BlockContent({ block }: BlockContent) {
  return (
    <section className="custom-section">
      <div className="mx-auto w-full max-w-screen-md px-4">
        <div className="custom-holder">
          <div className="md:flex items-center gap-4">
            <div
              className={clsx("md:w-1/2", {
                "order-1": block.imageLeft === "1",
              })}
            >
              <h1 className="mb-4">{block.title}</h1>
              <p>{block.text}</p>
            </div>
            <div className="md:w-1/2">
              <Image
                src={block.image.url}
                alt={block.image.alt}
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
