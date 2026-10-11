import { createResource, createSignal, createEffect, onCleanup, For, Show } from "solid-js";

interface NewsArticle {
  title: string;
  description: string | null;
  image: string | null;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export default function NewsCarousel() {
  const [index, setIndex] = createSignal(0);

  const [news] = createResource(async (): Promise<NewsArticle[]> => {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

    if (!apiKey) throw new Error("GNEWS_API_KEY não configurada");

    const params = new URLSearchParams({
      country: "br",
      lang: "pt",
      max: "10",
      apikey: apiKey,
    });

    const response = await fetch(
      `/api/news?${params}`
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.articles ?? [];
  });

  const article = () => news()?.[index()];

  const previous = () => {
    const total = news()?.length ?? 0;
    if (total) setIndex((i) => (i - 1 + total) % total);
  };

  const next = () => {
    const total = news()?.length ?? 0;
    if (total) setIndex((i) => (i + 1) % total);
  };

  createEffect(() => {
    if (!news()?.length) return;

    const timer = setInterval(next, 60_000);
    onCleanup(() => clearInterval(timer));
  });

  return (
    <main class="fixed inset-0 flex flex-col overflow-hidden bg-[#202321] text-white">


      <Show
        when={!news.loading}
        fallback={
          <div class="flex h-full items-center justify-center">
            <span class="loading loading-spinner loading-lg text-white" />
          </div>
        }
      >
        <Show
          when={article()}
          fallback={
            <div class="flex h-full items-center justify-center">
              Nenhuma notícia disponível.
            </div>
          }
        >
          {(item) => (
            <article class="relative h-full w-full overflow-hidden">
              <Show when={item().image}>
                <img
                  src={item().image!}
                  alt={item().title}
                  class="absolute inset-0 h-full w-full object-cover"
                />
              </Show>

              <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

              <div class="absolute bottom-16 left-6 z-10 max-w-5xl md:bottom-20 md:left-16">
                <p class="mb-4 text-lg font-semibold uppercase tracking-widest text-sky-400">
                  {item().source.name}
                </p>

                <h2 class="text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
                  {item().title}
                </h2>

                <Show when={item().description}>
                  <p class="mt-5 max-w-3xl text-base text-gray-200 md:text-xl">
                    {item().description}
                  </p>
                </Show>

                <a
                  href={item().url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-6 inline-block font-semibold text-sky-400 hover:text-sky-300"
                >
                  Ler notícia →
                </a>
              </div>

              <button
                type="button"
                onClick={previous}
                aria-label="Notícia anterior"
                class="absolute left-3 top-1/2 z-20 -translate-y-1/2 p-3 text-3xl text-white/70 transition hover:text-white md:left-6"
              >
                ❮
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Próxima notícia"
                class="absolute right-3 top-1/2 z-20 -translate-y-1/2 p-3 text-3xl text-white/70 transition hover:text-white md:right-6"
              >
                ❯
              </button>
            </article>
          )}
        </Show>
      </Show>

      <Show when={news.error}>
        <p class="absolute bottom-5 left-6 z-30 text-red-400">
          Erro ao carregar notícias: {String(news.error?.message ?? news.error)}
        </p>
      </Show>
    </main>
  );
}
