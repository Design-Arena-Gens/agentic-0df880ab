import Image from 'next/image';
import Link from 'next/link';
import { getTodayPost } from '../lib/getTodayPost';
import { PostActions } from '../components/PostActions';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const post = await getTodayPost();
  const imageUrl = `/api/image?title=${encodeURIComponent(post.title)}&keywords=${encodeURIComponent(post.keywords.slice(0,6).join(','))}`;

  return (
    <main className="container">
      <div className="header">
        <div>
          <div className="title">AI LinkedIn Daily Posts</div>
          <div className="subtitle">Ready-to-post content generated from today's AI trends</div>
        </div>
        <span className="badge">{post.dateLabel}</span>
      </div>

      <div className="card">
        <h3 style={{marginTop:0}}>{post.title}</h3>
        <textarea className="textarea" readOnly value={post.body} />
        <PostActions body={post.body} hashtags={post.hashtags} imageUrl={imageUrl} />

        <div className="section">
          <div className="kv"><strong>Primary topic</strong><span>{post.primaryTopic}</span></div>
          <div className="kv"><strong>Keywords</strong><span>{post.keywords.slice(0,10).join(', ')}</span></div>
          <div className="kv"><strong>Sources</strong><span>{post.sources.map((s, i) => (
            <>
              <a key={s.url} href={s.url} target="_blank">{s.name}</a>{i < post.sources.length - 1 ? ' ? ' : ''}
            </>
          ))}</span></div>
        </div>

        <div className="section">
          <img className="preview" src={imageUrl} alt="Post image preview" />
        </div>
      </div>

      <div className="footer">Tip: Paste the text and image into LinkedIn. Adjust tone slightly to match your voice.</div>
    </main>
  );
}
