export default function Disclaimer() {
  return (
    <div className="min-h-[80dvh] flex justify-center px-6 py-16 text-white">
      <div className="max-w-3xl space-y-6">

        <h1 className="text-3xl font-bold">Disclaimer</h1>

        <p className="text-white/70 leading-relaxed">
          Arclane is an indexing and cataloging project. We do not host,
          upload or store any files, media, videos, or copyrighted content.
          All external links are user-submitted or publicly available on
          the internet.
        </p>

        <p className="text-white/70 leading-relaxed">
          Arclane merely provides metadata, descriptions, categories and
          redirections to third-party websites. We have no control over
          the content, availability, safety or legality of those external
          sites.
        </p>

        <p className="text-white/70 leading-relaxed">
          If you believe a link violates your rights or points to illegal
          material, please contact us. We will review and remove the entry
          if necessary as part of our moderation policy.
        </p>

        <p className="text-white/70 leading-relaxed">
          By using Arclane, you agree that all access to external websites
          is done at your own risk. Always follow your local laws and ensure
          responsible usage of the internet.
        </p>

      </div>
    </div>
  );
}
