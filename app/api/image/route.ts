import { NextRequest } from 'next/server';

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'AI Trend';
  const keywords = (searchParams.get('keywords') || '').split(',').filter(Boolean).slice(0,6);

  const width = 1200;
  const height = 630;

  const gradientId = 'g' + Math.random().toString(36).slice(2);
  const bg = `#0A66C2`;
  const bg2 = `#111827`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg}" />
        <stop offset="100%" stop-color="${bg2}" />
      </linearGradient>
      <style>
        .title { font: 700 56px system-ui, -apple-system, Segoe UI, Roboto; fill: #fff; }
        .chip { font: 600 24px system-ui, -apple-system, Segoe UI, Roboto; fill: #0A66C2; }
      </style>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#${gradientId})"/>
    <g transform="translate(64, 96)">
      <text class="title">
        <tspan x="0" dy="0">${escapeXml(title)}</tspan>
      </text>
      <g transform="translate(0, 120)">
        ${keywords.map((k, i) => {
          const x = (i % 3) * 360;
          const y = Math.floor(i / 3) * 70;
          return `<g transform=\"translate(${x}, ${y})\"><rect rx=\"12\" ry=\"12\" width=\"320\" height=\"48\" fill=\"#fff\" opacity=\"0.92\" /><text class=\"chip\" x=\"16\" y=\"32\">#${escapeXml(k)}</text></g>`;
        }).join('')}
      </g>
      <g transform="translate(0, 300)">
        <text fill="#D1D5DB" font-family="system-ui, -apple-system, Segoe UI, Roboto" font-size="22" font-weight="600">AI LinkedIn Daily ? agentic</text>
      </g>
    </g>
  </svg>`;

  return new Response(svg, { status: 200, headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 's-maxage=3600, stale-while-revalidate=600' } });
}
