import Image from "next/image";

interface BlockFeatures {
  block: {
    title: string;
    repeater: {
      image: { url: string; alt: string };
      text: string;
    }[];
  };
}

export default function BlockFeatures({ block }: BlockFeatures) {
  return (
    <section className="custom-section">
      <div className="mx-auto w-full max-w-screen-md px-4">
        <div className="custom-holder">
          <h2 className="mb-4">{block.title}</h2>
          <div className="md:flex gap-4">
            {block.repeater.map((item, index) => (
              <div key={index} className="md:w-1/3">
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={100}
                  height={100}
                />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
