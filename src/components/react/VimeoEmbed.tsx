interface VimeoEmbedProps {
  id: string;
  title?: string;
  aspectRatio?: 'cinema' | 'letterbox' | 'square';
}

export function VimeoEmbed({
  id,
  title = 'Video',
  aspectRatio = 'cinema',
}: VimeoEmbedProps) {
  const ratioClass =
    aspectRatio === 'letterbox'
      ? 'aspect-[2.39/1]'
      : aspectRatio === 'square'
        ? 'aspect-square'
        : 'aspect-video';

  return (
    <div className={`relative w-full overflow-hidden rounded-lg bg-black ${ratioClass}`}>
      <iframe
        src={`https://player.vimeo.com/video/${id}?byline=0&portrait=0&title=0`}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
