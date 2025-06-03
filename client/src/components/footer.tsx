import { EXTERNAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Dial-an-AI-Expert", href: "/services#dial-an-ai-expert", isRoute: true },
        { name: "Fractional CAIO", href: "/services#fractional-chief-ai-officer", isRoute: true },
        { name: "Enterprise AI Enablement", href: "/services#enterprise-ai-enablement", isRoute: true }
      ]
    },
    {
      title: "Content",
      links: [
        { name: "Newsletter", href: EXTERNAL_LINKS.substack, external: true },
        { name: "Podcast", href: EXTERNAL_LINKS.youtube, external: true },
        { name: "LinkedIn", href: EXTERNAL_LINKS.linkedin, external: true }
      ]
    },
    {
      title: "Contact",
      links: [
        { name: "yuyingcwynn@gmail.com", href: "mailto:yuyingcwynn@gmail.com", external: true },
        { name: "yuying@wittinglyventures.com", href: "mailto:yuying@wittinglyventures.com", external: true },
        { name: "Greater Los Angeles Area", href: "#", isRoute: false }
      ]
    }
  ];

  const handleLinkClick = (href: string, external?: boolean, isRoute?: boolean) => {
    if (external) {
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
        window.location.href = href;
      } else {
        window.open(href, '_blank');
      }
    } else if (isRoute) {
      // Handle route-based navigation with anchors
      if (href.includes('#')) {
        const [path, anchor] = href.split('#');
        // Navigate to the page first
        window.location.href = path;
        // Wait for page load then scroll to section
        setTimeout(() => {
          const element = document.getElementById(anchor);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.location.href = href;
      }
    } else {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">WittinglyVentures</div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Driving AI transformation with 15+ years of expertise in generative AI, machine learning, and enterprise strategy.
            </p>
          </div>
          
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => {
                        const external = 'external' in link ? link.external : false;
                        const isRoute = 'isRoute' in link ? link.isRoute : false;
                        handleLinkClick(link.href, external, isRoute);
                      }}
                      className="hover:text-primary transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Yuying Chen-Wynn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
