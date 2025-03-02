import ContactForm from "@/components/form";

interface BlockContact {
  block: {
    title: string;
  };
}

export default function BlockContact({ block }: BlockContact) {
  return (
    <section className="custom-section">
      <div className="mx-auto w-full max-w-screen-md px-4">
        <div className="custom-holder">
          <h1 className="mb-8">{block.title}</h1>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
