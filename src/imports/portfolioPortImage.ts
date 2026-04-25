/**
 * Portfolio Web — hero / card image
 * Encoded as a JS string so vite-plugin-singlefile inlines it into the HTML bundle.
 */
const svg = `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pbg" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#010e0e"/>
      <stop offset="60%" stop-color="#011818"/>
      <stop offset="100%" stop-color="#020c0c"/>
    </linearGradient>
    <filter id="psh" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#000000" flood-opacity="0.55"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="url(#pbg)"/>
  <ellipse cx="300" cy="260" rx="280" ry="210" fill="#025959" fill-opacity="0.10"/>
  <ellipse cx="660" cy="160" rx="130" ry="110" fill="#FF8300" fill-opacity="0.07"/>

  <!-- Browser frame shadow -->
  <rect x="55" y="66" width="498" height="342" rx="14" fill="#000" fill-opacity="0.5" filter="url(#psh)"/>

  <!-- Browser chrome -->
  <rect x="55" y="66" width="498" height="342" rx="14" fill="#111111"/>
  <rect x="55" y="66" width="498" height="30" rx="14" fill="#222222"/>
  <rect x="55" y="82" width="498" height="14" fill="#222222"/>

  <!-- Traffic lights -->
  <circle cx="78"  cy="81" r="5" fill="#FF5F56"/>
  <circle cx="95"  cy="81" r="5" fill="#FFBD2E"/>
  <circle cx="112" cy="81" r="5" fill="#27C93F"/>

  <!-- URL bar -->
  <rect x="148" y="73" width="270" height="16" rx="8" fill="#333333"/>
  <text x="283" y="85" text-anchor="middle" font-family="monospace" font-size="7.5" fill="#9ca3af">sofialvarez.portfolio</text>

  <!-- ── Nav bar ── -->
  <rect x="55" y="96" width="498" height="33" fill="#025959"/>
  <circle cx="80"  cy="112" r="8"  fill="rgba(255,255,255,0.18)"/>
  <text x="80" y="116" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="700" fill="white">S</text>
  <rect x="388" y="107" width="26" height="5" rx="2" fill="rgba(255,255,255,0.22)"/>
  <rect x="422" y="107" width="26" height="5" rx="2" fill="rgba(255,255,255,0.22)"/>
  <rect x="456" y="105" width="50" height="10" rx="5" fill="#FF8300"/>
  <text x="481" y="114" text-anchor="middle" font-family="Arial,sans-serif" font-size="6.5" font-weight="600" fill="white">Contacto</text>

  <!-- ── Hero section ── -->
  <rect x="55" y="129" width="498" height="112" fill="#0d2020"/>
  <text x="82" y="157" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#4ecfcf">Sofia Alvarez</text>
  <text x="82" y="173" font-family="Arial,sans-serif" font-size="10" fill="rgba(255,255,255,0.55)">UX/UI Designer</text>
  <rect x="82" y="182" width="170" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>
  <rect x="82" y="192" width="130" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
  <rect x="82" y="218" width="80" height="18" rx="9" fill="#FF8300"/>
  <text x="122" y="231" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" font-weight="600" fill="white">Ver proyectos</text>
  <!-- Profile oval -->
  <ellipse cx="456" cy="185" rx="44" ry="50" fill="rgba(2,89,89,0.28)"/>
  <ellipse cx="456" cy="185" rx="30" ry="36" fill="rgba(2,89,89,0.2)"/>

  <!-- ── Projects strip ── -->
  <rect x="55" y="241" width="498" height="167" fill="#0a1a1a"/>
  <text x="82" y="261" font-family="Arial,sans-serif" font-size="8" font-weight="700" fill="rgba(2,89,89,0.8)" letter-spacing="1">PROYECTOS DESTACADOS</text>

  <!-- Card 1: IUPI -->
  <rect x="78"  y="270" width="140" height="120" rx="9" fill="#1a2a2a"/>
  <rect x="78"  y="270" width="140" height="56"  rx="9" fill="#025959" fill-opacity="0.55"/>
  <text x="148" y="302" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="white">IUPI</text>
  <text x="88"  y="342" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.45)">Fintech</text>
  <text x="88"  y="355" font-family="Arial,sans-serif" font-size="6.5" fill="rgba(255,255,255,0.28)">UX/UI Designer</text>
  <rect x="88"  y="365" width="36" height="5" rx="2" fill="rgba(255,131,0,0.3)"/>

  <!-- Card 2: Bookie -->
  <rect x="228" y="270" width="140" height="120" rx="9" fill="#1a2a2a"/>
  <rect x="228" y="270" width="140" height="56"  rx="9" fill="#906E2A" fill-opacity="0.55"/>
  <text x="298" y="302" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="white">Bookie</text>
  <text x="238" y="342" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.45)">App de lectura</text>
  <text x="238" y="355" font-family="Arial,sans-serif" font-size="6.5" fill="rgba(255,255,255,0.28)">UX/UI Designer</text>
  <rect x="238" y="365" width="36" height="5" rx="2" fill="rgba(255,131,0,0.3)"/>

  <!-- Card 3: Mas+ Bank -->
  <rect x="378" y="270" width="140" height="120" rx="9" fill="#1a2a2a"/>
  <rect x="378" y="270" width="140" height="56"  rx="9" fill="#4A1683" fill-opacity="0.55"/>
  <text x="448" y="302" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="white">Mas+ Bank</text>
  <text x="388" y="342" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.45)">App bancaria</text>
  <text x="388" y="355" font-family="Arial,sans-serif" font-size="6.5" fill="rgba(255,255,255,0.28)">UX/UI Designer</text>
  <rect x="388" y="365" width="36" height="5" rx="2" fill="rgba(255,131,0,0.3)"/>

  <!-- ── Right: code editor panel ── -->
  <rect x="596" y="88" width="166" height="284" rx="10" fill="rgba(255,255,255,0.025)" stroke="rgba(2,89,89,0.22)" stroke-width="1"/>
  <rect x="596" y="88" width="166" height="22"  rx="10" fill="rgba(2,89,89,0.14)"/>
  <text x="610" y="103" font-family="monospace" font-size="7" fill="rgba(78,207,207,0.55)">PortfolioCaseStudy.tsx</text>
  <!-- Code lines -->
  <rect x="608" y="120" width="108" height="4" rx="2" fill="rgba(255,131,0,0.35)"/>
  <rect x="608" y="131" width="138" height="4" rx="2" fill="rgba(78,207,207,0.28)"/>
  <rect x="616" y="142" width="90"  height="4" rx="2" fill="rgba(255,255,255,0.16)"/>
  <rect x="616" y="153" width="118" height="4" rx="2" fill="rgba(255,255,255,0.13)"/>
  <rect x="624" y="164" width="80"  height="4" rx="2" fill="rgba(255,255,255,0.10)"/>
  <rect x="624" y="175" width="96"  height="4" rx="2" fill="rgba(78,207,207,0.18)"/>
  <rect x="624" y="186" width="70"  height="4" rx="2" fill="rgba(255,255,255,0.10)"/>
  <rect x="616" y="197" width="60"  height="4" rx="2" fill="rgba(255,255,255,0.13)"/>
  <rect x="608" y="208" width="92"  height="4" rx="2" fill="rgba(255,131,0,0.28)"/>
  <rect x="608" y="225" width="142" height="4" rx="2" fill="rgba(78,207,207,0.22)"/>
  <rect x="608" y="236" width="120" height="4" rx="2" fill="rgba(255,131,0,0.18)"/>
  <rect x="608" y="247" width="100" height="4" rx="2" fill="rgba(255,255,255,0.09)"/>
  <rect x="608" y="258" width="114" height="4" rx="2" fill="rgba(78,207,207,0.15)"/>
  <rect x="608" y="269" width="80"  height="4" rx="2" fill="rgba(255,255,255,0.07)"/>
  <rect x="608" y="280" width="130" height="4" rx="2" fill="rgba(255,131,0,0.14)"/>
  <rect x="608" y="291" width="96"  height="4" rx="2" fill="rgba(78,207,207,0.12)"/>
  <rect x="608" y="302" width="110" height="4" rx="2" fill="rgba(255,255,255,0.06)"/>
  <rect x="608" y="313" width="78"  height="4" rx="2" fill="rgba(255,131,0,0.10)"/>
  <rect x="608" y="324" width="120" height="4" rx="2" fill="rgba(78,207,207,0.09)"/>
  <rect x="608" y="335" width="90"  height="4" rx="2" fill="rgba(255,255,255,0.05)"/>
  <rect x="608" y="346" width="104" height="4" rx="2" fill="rgba(78,207,207,0.07)"/>

  <!-- Decorative circles bottom-right -->
  <circle cx="644" cy="418" r="32" fill="none" stroke="rgba(2,89,89,0.14)" stroke-width="1" stroke-dasharray="4 4"/>
  <circle cx="644" cy="418" r="20" fill="none" stroke="rgba(255,131,0,0.10)" stroke-width="1"/>
  <circle cx="644" cy="418" r="7"  fill="rgba(2,89,89,0.18)"/>
  <circle cx="700" cy="440" r="4"  fill="rgba(78,207,207,0.20)"/>
  <circle cx="720" cy="425" r="3"  fill="rgba(255,131,0,0.18)"/>
  <circle cx="748" cy="445" r="5"  fill="rgba(2,89,89,0.14)"/>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="4" height="500" fill="rgba(255,131,0,0.45)"/>

  <!-- Bottom label -->
  <text x="30" y="472" font-family="Arial,sans-serif" font-size="10" fill="rgba(78,207,207,0.30)">Portfolio Web · 2025 · Vibe Coding con Claude Code</text>
</svg>`;

export const portfolioPort: string = `data:image/svg+xml,${encodeURIComponent(svg)}`;
