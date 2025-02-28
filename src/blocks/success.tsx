import Link from "next/link";

interface BlockSuccess {
  block: {
    title: string;
    text: string;
    buttonText: string;
  };
}

export default function BlockSuccess({ block }: BlockSuccess) {
  return (
    <section className="custom-section">
      <div className="mx-auto w-full max-w-screen-md px-4">
        <div className="custom-holder text-center">
          <h1 className="mb-4">{block.title}</h1>
          <p className="mb-4">{block.text}</p>
          <Link
            className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition block"
            href="/"
          >
            {block.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
