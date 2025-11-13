"use client";

export function PostActions({ body, hashtags, imageUrl }: { body: string; hashtags: string[]; imageUrl: string; }) {
  return (
    <div className="actions">
      <button className="button" onClick={() => navigator.clipboard.writeText(body)}>Copy post</button>
      <a className="button secondary" href={imageUrl} target="_blank" rel="noopener noreferrer">Open image</a>
      <button className="button secondary" onClick={() => navigator.clipboard.writeText(hashtags.join(' '))}>Copy hashtags</button>
    </div>
  );
}
