import { motion } from 'framer-motion';
import { MessageSquare, Github } from 'lucide-react';
import { APP_CONFIG } from '../config';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-slate-800/50">
      <div className="absolute inset-0 bg-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
              Renamerged
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Solusi manajemen Faktur Pajak #1 untuk profesional.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <button
                onClick={() => scrollToSection('features')}
                className="block text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                Fitur
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                Cara Kerja
              </button>
              <button
                onClick={() => scrollToSection('security')}
                className="block text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                Keamanan
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                FAQ
              </button>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <a
                href="https://github.com/iunoxid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://t.me/iunoin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Version Info */}
          <div className="md:col-span-1">
            <h4 className="text-white text-sm font-semibold mb-4">Version</h4>
            <p className="text-gray-500 text-sm mb-1">v{APP_CONFIG.appVersion}</p>
            <p className="text-gray-600 text-xs">Windows 10/11</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs text-center md:text-left">
              © 2025 Renamerged.id. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs text-center md:text-right max-w-2xl">
              Disclaimer: Software independen, tidak berafiliasi dengan DJP.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
