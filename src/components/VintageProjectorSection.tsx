import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const COLORS = {
  bg: "#000000",
  textPrimary: "#F5F5F5",
  textSecondary: "#9a9a9a",
  accent: "#FFD400",
};

/* =====================================================
   🎛 MANUAL POSITION CONFIGS (EDIT FREELY)
===================================================== */

const DESKTOP = {
  projectorWidth: "8%",
  projectorMinWidth: "260px",
  projectorMarginLeft: "2vw",

  beamLeft: "8%",
  beamTop: "49%",
  beamWidth: "48%",
  beamHeight: "55%",

  reelRight: "-1vw",
  reelWidth: "55%",

  textLeft: "8vw",
  textBottom: "4%",
  textMaxWidth: "420px",
};

const TABLET = {
  projectorWidth: "12%",
  projectorMinWidth: "220px",
  projectorMarginLeft: "1.5vw",

  beamLeft: "10%",
  beamTop: "50%",
  beamWidth: "50%",
  beamHeight: "21%",

  reelRight: "-4vw",
  reelWidth: "65%",

  textLeft: "6vw",
  textBottom: "5%",
  textMaxWidth: "360px",
};

const MOBILE = {
  projectorWidth: "140px",
  projectorMinWidth: "140px",
  projectorMarginLeft: "0.2rem",

  beamLeft: "0%",
  beamTop: "50%",
  beamWidth: "47%",
  beamHeight: "23%",

  reelRight: "32%",
  reelWidth: "90%",

  textLeft: "6%",
  textBottom: "6%",
  textMaxWidth: "90%",
};

const VintageProjectorSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [layout, setLayout] = useState(DESKTOP);

  /* =====================================================
     📱 SCREEN DETECTION (ONLY SELECTS CONFIG)
  ===================================================== */
  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      if (w < 768) setLayout(MOBILE);
      else if (w <=1024) setLayout(TABLET);
      else setLayout(DESKTOP);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ================= PROJECTOR ================= */}
      <motion.img
        src="/images/projector.jpg"
        alt="Vintage Film Projector"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          width: layout.projectorWidth,
          minWidth: layout.projectorMinWidth,
          marginLeft: layout.projectorMarginLeft,
          zIndex: 3,
          filter: "invert(1) grayscale(100%) contrast(1.1)",
        }}
      />

      {/* ================= LIGHT BEAM ================= */}
      <div
        style={{
          position: "absolute",
          left: layout.beamLeft,
          top: layout.beamTop,
          width: layout.beamWidth,
          height: layout.beamHeight,
          transform: "translateY(-50%)",
          clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
          background:
            "linear-gradient(to right, rgba(255,212,0,0.45), rgba(255,212,0,0))",
          filter: "blur(12px)",
          opacity: 0.75,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ================= FILM REEL ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        style={{
          position: "absolute",
          right: layout.reelRight,
          width: layout.reelWidth,
          aspectRatio: "16 / 9",
          zIndex: 3,
          backgroundImage: "url('/images/filmreel3.jpg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform:
            layout === MOBILE ? "translateX(50%)" : "none",
        }}
      >
        <video
          src="/videos/v1.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "68%",
            height: "62%",
            objectFit: "cover",
            filter:
              "grayscale(100%) contrast(1.15) brightness(0.9)",
          }}
        />
      </motion.div>

      {/* ================= TEXT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "absolute",
          bottom: layout.textBottom,
          left: layout.textLeft,
          maxWidth: layout.textMaxWidth,
          zIndex: 4,
          color: COLORS.textPrimary,
          cursor: "pointer",
          transform:
            layout === MOBILE
              ? "translateX(-50%)"
              : isHovered
              ? "translateY(-6px)"
              : "translateY(0)",
          transition: "all 0.4s ease",
          textAlign: layout === MOBILE ? "center" : "left",
        }}
      >
        <motion.h3
          key={isHovered ? "hovered" : "default"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            marginBottom: "12px",
            letterSpacing: "0.06em",
            color: isHovered ? COLORS.accent : COLORS.textPrimary,
            textShadow: isHovered
              ? "0 0 18px rgba(255,212,0,0.6)"
              : "none",
          }}
        >
          {isHovered ? "Cinema Was the First Medium" : "Where It All Began"}
        </motion.h3>

        <p
          style={{
            fontSize: "1rem",
            color: COLORS.textSecondary,
            lineHeight: 1.6,
          }}
        >
          Before algorithms and billboards, there was light, film,
          and storytelling. Cinema is still the most powerful way
          to move an audience.
        </p>
      </motion.div>
    </section>
  );
};

export default VintageProjectorSection;
