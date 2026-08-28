'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const menuItems = [
  { label: 'Services', href: '/services' },
  { label: 'Notice Help', href: '/notice-explainer' },
  { label: 'How It Works', href: '/#how-it-works' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="site-header">

      {/* LEFT SIDE: HAMBURGER + LOGO */}
      <div className="header-left" ref={menuRef}>

        <button
          className={`menu-button ${open ? 'is-open' : ''}`}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          <span className="menu-line" />
          <span className="menu-line" />
          <span className="menu-line" />
        </button>

        <Link
          className="brand"
          href="/"
          aria-label="CivicGuide India home"
        >
          <span className="brand-mark" aria-hidden="true">
            cg
          </span>

          <span>
            CivicGuide <b>India</b>
          </span>
        </Link>

        {/* MENU */}
        <div
          id="site-navigation"
          className={`menu-panel ${open ? 'menu-panel-open' : ''}`}
          aria-hidden={!open}
        >
          <nav aria-label="Main navigation">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                key={item.label}
                className="menu-link"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                style={
                  {
                    '--menu-index': index,
                  } as React.CSSProperties
                }
              >
                <span>{item.label}</span>

                <span
                  className="menu-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            ))}
          </nav>
        </div>

      </div>

      {/* RIGHT SIDE: ASK CIVICGUIDE */}
      <div className="header-actions">
        <Link
          className="ask-button"
          href="/ask-civicguide"
        >
          Ask CivicGuide
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

    </header>
  );
}