import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Clients", href: "#clients" },
  { label: "Directors", href: "#directors" },
  { label: "Upcoming", href: "#upcoming" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      navItems.forEach((item) => {
        const el = document.querySelector(item.href);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(item.label);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          backgroundColor: scrolled
            ? "rgba(18,18,18,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#ffffff",
          }}
        >
          {/* LOGO */}
          <a
            href="#hero"
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            MEDIA
            <span style={{ color: "#FFD400" }}>HOUSE</span>
          </a>

          {/* DESKTOP + TABLET LINKS */}
          <ul
            className="navbar-links"
            style={{
              listStyle: "none",
              gap: "32px",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: 0,
              padding: 0,
            }}
          >
            {navItems.map((item) => (
              <li
                key={item.label}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  paddingBottom: "6px",
                }}
              >
                <a
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color:
                      active === item.label ? "#FFD400" : "#ffffff",
                  }}
                >
                  {item.label}
                </a>

                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    height: "1px",
                    width:
                      hovered === item.label || active === item.label
                        ? "100%"
                        : "0%",
                    backgroundColor: "#FFD400",
                    transition: "width 0.3s ease",
                  }}
                />
              </li>
            ))}
          </ul>

          {/* MOBILE HAMBURGER */}
          <div
            className="hamburger"
            onClick={() => setMenuOpen((p) => !p)}
style={{
  width: "28px",
  height: "20px",
  flexDirection: "column",
  justifyContent: "space-between",
  cursor: "pointer",
}}

          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  height: "2px",
                  background: "#FFD400",
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              background: "#0B0B0B",
              zIndex: 40,
              padding: "24px 0",
              textAlign: "center",
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 0",
                  fontSize: "14px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color:
                    active === item.label ? "#FFD400" : "#ffffff",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESPONSIVE RULES */}
      <style>
        {`
          .navbar-links {
            display: none;
          }
          .hamburger {
            display: flex;
          }

          @media (min-width: 768px) {
            .navbar-links {
              display: flex;
            }
            .hamburger {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
}
