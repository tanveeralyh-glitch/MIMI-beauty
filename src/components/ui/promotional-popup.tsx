"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

export function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already closed the popup in this session
    const hasSeenPopup = sessionStorage.getItem("mimi_promotional_popup_closed");
    
    if (!hasSeenPopup) {
      // Add a small delay for a more premium entrance feel
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("mimi_promotional_popup_closed", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-[#0c0c0c]/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#2A1815] p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(20,10,10,0.6)] border border-[#C9A86A]/30"
          >
            {/* Subtle botanical line-art details (Top Left & Bottom Right) */}
            <svg className="absolute -top-4 -left-4 h-32 w-32 text-[#C9A86A]/15 transform -rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 100C50 100 45 70 20 60C40 60 50 80 50 100Z" fill="currentColor"/>
              <path d="M50 100C50 100 65 65 90 50C65 55 55 80 50 100Z" fill="currentColor"/>
              <path d="M50 80C50 80 35 45 10 35C30 40 45 60 50 80Z" fill="currentColor"/>
              <path d="M53 85C53 85 75 55 100 40C80 45 63 65 53 85Z" fill="currentColor"/>
              <path d="M48 60C48 60 40 25 25 10C35 20 45 40 48 60Z" fill="currentColor"/>
              <path d="M52 65C52 65 80 30 100 15C85 25 65 45 52 65Z" fill="currentColor"/>
              <path d="M50 100C50 100 50 20 50 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            
            <svg className="absolute -bottom-4 -right-4 h-32 w-32 text-[#C9A86A]/15 transform rotate-168" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 100C50 100 45 70 20 60C40 60 50 80 50 100Z" fill="currentColor"/>
              <path d="M50 100C50 100 65 65 90 50C65 55 55 80 50 100Z" fill="currentColor"/>
              <path d="M50 80C50 80 35 45 10 35C30 40 45 60 50 80Z" fill="currentColor"/>
              <path d="M53 85C53 85 75 55 100 40C80 45 63 65 53 85Z" fill="currentColor"/>
              <path d="M48 60C48 60 40 25 25 10C35 20 45 40 48 60Z" fill="currentColor"/>
              <path d="M52 65C52 65 80 30 100 15C85 25 65 45 52 65Z" fill="currentColor"/>
              <path d="M50 100C50 100 50 20 50 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full text-[#FDFBF7]/60 transition-colors hover:bg-[#FDFBF7]/10 hover:text-[#FDFBF7]"
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="relative z-10 mx-auto flex max-w-[280px] flex-col items-center">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A86A]">
                Exclusive Welcome
              </span>
              
              <h2 className="font-display text-5xl sm:text-6xl text-[#FDFBF7] mb-2 leading-none">
                10% OFF
              </h2>
              
              <span className="mb-8 block text-[11px] font-medium uppercase tracking-[0.2em] text-[#FDFBF7]/80">
                For Our First 100 Customers
              </span>

              {/* Divider */}
              <div className="mb-8 flex w-full items-center justify-center opacity-80">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A86A]/50 to-transparent"></div>
                <div className="mx-3 h-1 w-1 rounded-full bg-[#C9A86A]"></div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A86A]/50 to-transparent"></div>
              </div>

              <p className="mb-10 text-sm leading-relaxed text-[#FDFBF7]/80 font-sans font-light">
                Be among the first to experience the Mimi Beauty ritual.
              </p>

              <Link
                href="/shop"
                onClick={handleClose}
                className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-[#C9A86A] text-xs font-semibold uppercase tracking-[0.2em] text-[#1D1412] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">Claim 10% Off</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
