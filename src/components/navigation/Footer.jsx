import React from 'react';
import { Shield, GitHub, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "VaultBin",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">VaultBin</span>
          </div>
          <p className="text-sm text-zinc-400 max-w-xs">
            Zero-knowledge, privacy-first secure sharing for the modern web.
          </p>
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            End-to-end encrypted
          </div>
        </div>
      )
    },
    {
      title: "Features",
      links: [
        { label: "Secure text sharing", href: "#" },
        { label: "File attachments", href: "#" },
        { label: "Real-time collaboration", href: "#" },
        { label: "Auto-expiration", href: "#" },
        { label: "Password protection", href: "#" }
      ]
    },
    {
      title: "Security",
      links: [
        { label: "Zero-knowledge encryption", href: "#" },
        { label: "Client-side processing", href: "#" },
        { label: "No server access to content", href: "#" },
        { label: "Automatic destruction", href: "#" },
        { label: "Open source", href: "#" }
      ]
    },
    {
      title: "Connect",
      content: (
        <div className="space-y-4">
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GitHub className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <div className="text-sm text-zinc-400">
            Made with <span className="text-red-400">♥</span> for privacy
          </div>
        </div>
      )
    }
  ];

  return (
    <footer className="glass-dark backdrop-blur-xl border-t border-zinc-800/50 mt-20 shadow-2xl">
      <div className="max-w-screen-2xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              {section.content ? (
                section.content
              ) : (
                <ul className="space-y-2">
                  {section.links?.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400">
            © {currentYear} VaultBin. Privacy-first by design.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-zinc-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-zinc-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/security" className="text-zinc-400 hover:text-white transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
