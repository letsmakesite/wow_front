interface BlockArticle {
  block: {
    title: string;
    text: string;
  };
}

export default function BlockArticle({ block }: BlockArticle) {
  return (
    <section className="custom-section">
      <div className="mx-auto w-full max-w-screen-md px-4">
        <div className="custom-holder">
          <article>
            <h1 className="mb-8">{block.title}</h1>
            <div
              className="block-article-text"
              dangerouslySetInnerHTML={{ __html: block.text }}
            />
          </article>
        </div>
      </div>
    </section>
  );
}
