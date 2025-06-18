import { Request, Response } from 'express';

// Generate Open Graph image SVG
export function generateOGImage(req: Request, res: Response) {
  const { title, description } = req.query;
  
  const pageTitle = title || 'Wittingly Ventures - AI Consulting & Strategy';
  const pageDesc = description || 'Transform your business with proven AI frameworks';
  
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#gradient)"/>
    
    <!-- Brand -->
    <text x="60" y="80" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" opacity="0.9">
      Wittingly Ventures
    </text>
    
    <!-- Title -->
    <text x="60" y="200" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">
      ${String(pageTitle).substring(0, 50)}
    </text>
    
    <!-- Description -->
    <text x="60" y="280" font-family="Arial, sans-serif" font-size="24" fill="white" opacity="0.9">
      ${String(pageDesc).substring(0, 80)}
    </text>
    
    <!-- CTA -->
    <rect x="60" y="350" width="200" height="60" rx="30" fill="white" opacity="0.2"/>
    <text x="160" y="390" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">
      Learn More
    </text>
    
    <!-- Decorative elements -->
    <circle cx="1000" cy="150" r="80" fill="white" opacity="0.1"/>
    <circle cx="1100" cy="250" r="50" fill="white" opacity="0.08"/>
    <circle cx="950" cy="300" r="30" fill="white" opacity="0.06"/>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
  res.send(svg);
}