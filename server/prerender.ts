import { Request, Response, NextFunction } from 'express';

// Bot user agents that need prerendered content
const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot'
];

// Static HTML snapshots for each page
const STATIC_PAGES: { [key: string]: string } = {
  '/': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wittingly Ventures - AI Consulting & Strategy | Fractional Chief AI Officer</title>
  <meta name="description" content="Transform your business with proven AI frameworks that deliver results. Expert AI consulting with 87% adoption rates and $6M+ first-year savings. Fractional Chief AI Officer services by Yuying Chen Wynn.">
  <meta name="keywords" content="AI consulting, fractional Chief AI Officer, enterprise AI strategy, AI implementation, business transformation, AI adoption, machine learning consulting, AI governance">
  
  <meta property="og:title" content="Wittingly Ventures - AI Consulting & Strategy | Fractional Chief AI Officer">
  <meta property="og:description" content="Transform your business with proven AI frameworks that deliver results. Expert AI consulting with 87% adoption rates and $6M+ first-year savings.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://wittingly.ventures/">
  
  <link rel="canonical" href="https://wittingly.ventures/">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Wittingly Ventures",
    "description": "AI consulting and strategy firm providing fractional Chief AI Officer services",
    "url": "https://wittingly.ventures",
    "founder": {
      "@type": "Person",
      "name": "Yuying Chen Wynn",
      "jobTitle": "Chief AI Officer"
    },
    "serviceType": ["AI Consulting", "Enterprise AI Strategy", "AI Implementation", "Fractional Chief AI Officer"],
    "areaServed": "Global"
  }
  </script>
</head>
<body>
  <h1>Wittingly Ventures - AI Consulting & Strategy</h1>
  <h2>Transform Your Business with AI According to Expert Yuying Chen Wynn</h2>
  <p>Expert AI consulting with proven results: 87% adoption rates and $6M+ first-year savings. Fractional Chief AI Officer services for enterprise transformation.</p>
  
  <h3>Services</h3>
  <ul>
    <li>Fractional Chief AI Officer</li>
    <li>Enterprise AI Enablement</li>
    <li>AI Strategy Implementation</li>
    <li>AI Governance Frameworks</li>
  </ul>
  
  <h3>Proven Results</h3>
  <ul>
    <li>87% GenAI Platform Adoption</li>
    <li>$6M+ First-Year Savings</li>
    <li>$200M AI Investment Portfolio</li>
    <li>15+ Years AI/ML Experience</li>
  </ul>
  
  <p>Contact Wittingly Ventures for AI consulting services at https://wittingly.ventures/contact</p>
</body>
</html>`,

  '/about': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Yuying Chen Wynn - AI Strategy Expert | Wittingly Ventures</title>
  <meta name="description" content="Meet Yuying Chen Wynn, expert AI strategist and fractional Chief AI Officer. 15+ years experience in enterprise AI transformation, featured thought leader with proven track record.">
  <meta name="keywords" content="Yuying Chen Wynn, AI expert, Chief AI Officer, AI strategy consultant, enterprise AI leader, AI thought leadership">
  
  <link rel="canonical" href="https://wittingly.ventures/about">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yuying Chen Wynn",
    "jobTitle": "Chief AI Officer & Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Wittingly Ventures"
    },
    "description": "Expert AI strategist and fractional Chief AI Officer with 15+ years of experience in enterprise AI transformation",
    "url": "https://wittingly.ventures/about"
  }
  </script>
</head>
<body>
  <h1>About Yuying Chen Wynn - AI Strategy Expert</h1>
  <h2>Expert AI Strategist and Fractional Chief AI Officer</h2>
  <p>Yuying Chen Wynn brings 15+ years of experience in enterprise AI transformation with a proven track record of successful implementations.</p>
  
  <h3>Professional Experience</h3>
  <ul>
    <li>Head of AI - PEAK6 (2023 - Present)</li>
    <li>Chief AI Officer - ABCmouse (2021 - 2023)</li>
    <li>VP of AI Strategy - Barnes & Noble Education (2019 - 2021)</li>
  </ul>
  
  <h3>Key Achievements</h3>
  <ul>
    <li>87% GenAI Platform Adoption</li>
    <li>$30M+ Annual Efficiency Savings</li>
    <li>$200M AI Investment Portfolio</li>
    <li>15+ Years AI/ML Experience</li>
  </ul>
</body>
</html>`,

  '/services': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Consulting Services - Fractional Chief AI Officer | Wittingly Ventures</title>
  <meta name="description" content="Comprehensive AI consulting services including fractional Chief AI Officer, enterprise AI enablement, strategic AI implementation, and AI governance frameworks.">
  <meta name="keywords" content="AI consulting services, fractional Chief AI Officer, enterprise AI enablement, AI strategy implementation, AI governance, business AI transformation">
  
  <link rel="canonical" href="https://wittingly.ventures/services">
</head>
<body>
  <h1>AI Consulting Services</h1>
  <h2>Fractional Chief AI Officer & Enterprise AI Services</h2>
  
  <h3>Fractional Chief AI Officer</h3>
  <p>Executive-level AI leadership and strategy guidance for organizations ready to scale AI initiatives.</p>
  
  <h3>Enterprise AI Enablement</h3>
  <p>Comprehensive AI transformation programs that build organizational capability and drive measurable results.</p>
  
  <h3>AI Strategy Implementation</h3>
  <p>Practical, outcome-driven AI implementation with proven frameworks and methodologies.</p>
  
  <h3>AI Governance Frameworks</h3>
  <p>Risk management and compliance frameworks for responsible AI deployment in regulated industries.</p>
</body>
</html>`,

  '/contact': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Wittingly Ventures - AI Consulting Inquiries</title>
  <meta name="description" content="Get in touch with Wittingly Ventures for AI consulting services. Schedule a consultation to discuss your enterprise AI strategy and transformation needs.">
  <meta name="keywords" content="contact AI consultant, AI consulting inquiry, enterprise AI consultation, schedule AI strategy meeting">
  
  <link rel="canonical" href="https://wittingly.ventures/contact">
</head>
<body>
  <h1>Contact Wittingly Ventures</h1>
  <h2>AI Consulting Inquiries & Consultations</h2>
  <p>Get in touch to discuss your enterprise AI strategy and transformation needs.</p>
  
  <h3>Services Available</h3>
  <ul>
    <li>Fractional Chief AI Officer</li>
    <li>Enterprise AI Enablement</li>
    <li>AI Product Bootcamp</li>
    <li>AI Strategy Consultation</li>
  </ul>
  
  <p>Contact us to schedule your AI consultation and transformation assessment.</p>
</body>
</html>`,

  '/thought-leadership': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Thought Leadership - Insights & Content Hub | Wittingly Ventures</title>
  <meta name="description" content="Latest insights on enterprise AI strategy, implementation best practices, and industry trends from AI expert Yuying Chen Wynn. Articles, videos, and podcasts.">
  <meta name="keywords" content="AI thought leadership, enterprise AI insights, AI strategy content, AI implementation best practices, AI industry trends">
  
  <link rel="canonical" href="https://wittingly.ventures/thought-leadership">
</head>
<body>
  <h1>AI Thought Leadership & Insights</h1>
  <h2>Cutting-edge AI Strategy Content</h2>
  <p>Expert perspectives on AI transformation, strategic implementation, and the future of enterprise technology from Yuying Chen Wynn.</p>
  
  <h3>Featured Content</h3>
  <ul>
    <li>Stop Forcing AI Into Old Boxes - Four Directions for Real Value Creation</li>
    <li>From Chatbots to Custom Software: The Real AI Revolution in Enterprise</li>
    <li>AI Governance Reality Check - Example Assessments and Lessons Learned</li>
  </ul>
  
  <h3>Speaking Engagements</h3>
  <ul>
    <li>MIT Sloan School of Management</li>
    <li>Northwestern Kellogg School of Management</li>
    <li>Stanford Continuing Studies</li>
    <li>UCLA Anderson School of Management</li>
  </ul>
</body>
</html>`,

  '/ai-readiness': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Readiness Assessment - Evaluate Your Enterprise AI Maturity</title>
  <meta name="description" content="Take our comprehensive AI readiness assessment to evaluate your organization's AI maturity level and receive personalized recommendations for AI implementation.">
  <meta name="keywords" content="AI readiness assessment, enterprise AI maturity, AI implementation evaluation, organizational AI capability">
  
  <link rel="canonical" href="https://wittingly.ventures/ai-readiness">
</head>
<body>
  <h1>AI Readiness Assessment</h1>
  <h2>Evaluate Your Enterprise AI Maturity</h2>
  <p>Comprehensive assessment tool to evaluate your organization's AI readiness and receive personalized recommendations.</p>
  
  <h3>Assessment Areas</h3>
  <ul>
    <li>AI Strategy & Leadership</li>
    <li>Data Infrastructure</li>
    <li>Technical Capabilities</li>
    <li>Organizational Change Management</li>
    <li>Governance & Risk Management</li>
  </ul>
  
  <p>Complete the assessment to receive your AI maturity score and actionable recommendations.</p>
</body>
</html>`
};

export function prerenderMiddleware(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.get('User-Agent')?.toLowerCase() || '';
  const isBot = BOT_USER_AGENTS.some(bot => userAgent.includes(bot));
  
  // Check if request is from a search engine bot
  if (isBot) {
    const path = req.path;
    const staticContent = STATIC_PAGES[path];
    
    if (staticContent) {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('X-Prerendered', 'true');
      return res.send(staticContent);
    }
  }
  
  next();
}