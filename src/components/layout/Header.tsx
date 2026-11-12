import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { FlowButton } from '../ui/flow-button';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalDropdownOpen, setLegalDropdownOpen] = useState(false);
  const [mobileLegalOpen, setMobileLegalOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const legalDropdownRef = useRef<HTMLLIElement>(null);

  const isLegalActive = ['/privacy', '/privacy-policy', '/disclaimer', '/terms', '/terms-of-service'].includes(
    location.pathname
  );

  // Monitor scroll for sticky navy background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLegalDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close legal dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (legalDropdownRef.current && !legalDropdownRef.current.contains(e.target as Node)) {
        setLegalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key and lock body scroll while open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (legalDropdownOpen) {
          setLegalDropdownOpen(false);
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, legalDropdownOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.transparent}`}>
      <div className={`container ${styles.headerInner}`}>
        {/* Brand Logo */}
        <Link to="/" className={styles.logoLink} aria-label={`${siteConfig.name} Home`}>
          <img
            src={siteConfig.logo.full}
            alt={siteConfig.logo.alt}
            className={styles.logoImage}
            width="170"
            height="46"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {siteConfig.navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Legal Dropdown Button housing all 3 pages */}
            <li ref={legalDropdownRef} className={styles.dropdownWrapper}>
              <button
                type="button"
                className={`${styles.dropdownTrigger} ${isLegalActive ? styles.dropdownTriggerActive : ''}`}
                onClick={() => setLegalDropdownOpen(!legalDropdownOpen)}
                aria-expanded={legalDropdownOpen}
                aria-haspopup="true"
                aria-label="Legal documents menu"
              >
                <span>Legal</span>
                <ChevronDown
                  size={14}
                  className={`${styles.chevronIcon} ${legalDropdownOpen ? styles.chevronIconOpen : ''}`}
                />
              </button>

              <div
                className={`${styles.dropdownMenu} ${legalDropdownOpen ? styles.dropdownMenuOpen : ''}`}
                role="menu"
                aria-label="Legal documents"
              >
                <Link
                  to="/privacy"
                  className={`${styles.dropdownItem} ${
                    location.pathname === '/privacy' || location.pathname === '/privacy-policy'
                      ? styles.dropdownItemActive
                      : ''
                  }`}
                  role="menuitem"
                  onClick={() => setLegalDropdownOpen(false)}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/disclaimer"
                  className={`${styles.dropdownItem} ${
                    location.pathname === '/disclaimer' ? styles.dropdownItemActive : ''
                  }`}
                  role="menuitem"
                  onClick={() => setLegalDropdownOpen(false)}
                >
                  Disclaimer
                </Link>
                <Link
                  to="/terms"
                  className={`${styles.dropdownItem} ${
                    location.pathname === '/terms' || location.pathname === '/terms-of-service'
                      ? styles.dropdownItemActive
                      : ''
                  }`}
                  role="menuitem"
                  onClick={() => setLegalDropdownOpen(false)}
                >
                  Terms of Services
                </Link>
              </div>
            </li>
          </ul>
        </nav>

        {/* CTA Button Desktop */}
        <div className={styles.desktopCta}>
          <FlowButton to="/contact" text="Book Consultation" variant="primary" size="sm" />
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.mobileMenuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Panel */}
      <div
        id="mobile-navigation"
        ref={mobileDrawerRef}
        className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.mobileDrawerContent}>
          <div className={styles.mobileDrawerHeader}>
            <img
              src={siteConfig.logo.full}
              alt={siteConfig.logo.alt}
              className={styles.mobileLogo}
              width="140"
              height="38"
            />
            <button
              type="button"
              className={styles.mobileCloseButton}
              onClick={() => {
                setMobileMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className={styles.mobileDivider} />

          <nav className={styles.mobileNav} aria-label="Mobile Navigation">
            <ul className={styles.mobileNavList}>
              {siteConfig.navigation.map((item) => {
                const isActive =
                  location.pathname === item.href ||
                  (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}

              {/* Mobile Legal Accordion */}
              <li className={styles.mobileDropdownGroup}>
                <button
                  type="button"
                  className={`${styles.mobileDropdownTrigger} ${
                    isLegalActive ? styles.mobileDropdownTriggerActive : ''
                  }`}
                  onClick={() => setMobileLegalOpen(!mobileLegalOpen)}
                  aria-expanded={mobileLegalOpen}
                >
                  <span>Legal</span>
                  <ChevronDown
                    size={18}
                    className={`${styles.chevronIcon} ${mobileLegalOpen ? styles.chevronIconOpen : ''}`}
                  />
                </button>

                {mobileLegalOpen && (
                  <ul className={styles.mobileDropdownList}>
                    <li>
                      <Link
                        to="/privacy"
                        className={`${styles.mobileSubNavLink} ${
                          location.pathname === '/privacy' || location.pathname === '/privacy-policy'
                            ? styles.mobileSubNavLinkActive
                            : ''
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/disclaimer"
                        className={`${styles.mobileSubNavLink} ${
                          location.pathname === '/disclaimer' ? styles.mobileSubNavLinkActive : ''
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Disclaimer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms"
                        className={`${styles.mobileSubNavLink} ${
                          location.pathname === '/terms' || location.pathname === '/terms-of-service'
                            ? styles.mobileSubNavLinkActive
                            : ''
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Terms of Services
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          <div className={styles.mobileFooterCta}>
            <FlowButton
              to="/contact"
              text="Book Consultation"
              variant="primary"
              size="lg"
              className={styles.mobileFullBtn}
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
