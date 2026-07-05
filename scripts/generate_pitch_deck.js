const pptxgen = require("pptxgenjs");
const path = require("path");

const BG = "FBFBFA";
const INK = "1A1A19";
const MUTED = "6B6B68";
const ACCENT = "B85042";
const SAND = "E7E8D1";
const SAGE = "A7BEAE";

const OUT = path.join(__dirname, "..", "CraftCut_Pitch_Deck.pptx");

function makePres() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "César";
  pres.title = "CraftCut — César+ Start-up";
  pres.subject = "Station F Admission Pitch Deck";
  return pres;
}

function darkSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: INK };
  return slide;
}

function lightSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: BG };
  return slide;
}

function footer(slide, n, total = 12) {
  slide.addText(`${n} / ${total}`, {
    x: 9.1, y: 5.15, w: 0.8, h: 0.3,
    fontSize: 9, color: MUTED, align: "right", margin: 0,
  });
}

function titleBlock(slide, title, subtitle, dark = false) {
  const color = dark ? "FFFFFF" : INK;
  const subColor = dark ? "D4D4D2" : MUTED;
  slide.addText(title, {
    x: 0.7, y: 0.55, w: 8.6, h: 0.9,
    fontSize: 34, bold: true, color, fontFace: "Georgia", margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.7, y: 1.35, w: 8.0, h: 0.45,
      fontSize: 13, color: subColor, fontFace: "Calibri", margin: 0,
    });
  }
}

function accentBar(slide, y = 0.35) {
  slide.addShape("rect", {
    x: 0.7, y, w: 1.1, h: 0.08, fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });
}

function card(slide, x, y, w, h, title, body) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: "FFFFFF" },
    line: { color: "D8D8D4", width: 1 },
  });
  slide.addShape("rect", {
    x, y, w: 0.07, h,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });
  slide.addText(title, {
    x: x + 0.22, y: y + 0.18, w: w - 0.35, h: 0.35,
    fontSize: 14, bold: true, color: INK, fontFace: "Georgia", margin: 0,
  });
  slide.addText(body, {
    x: x + 0.22, y: y + 0.55, w: w - 0.35, h: h - 0.7,
    fontSize: 11, color: MUTED, fontFace: "Calibri", valign: "top", margin: 0,
  });
}

function phoneFrame(slide, x, y) {
  slide.addShape("rect", {
    x, y, w: 1.55, h: 3.1,
    fill: { color: INK }, line: { color: INK, width: 0 }, rectRadius: 0.12,
  });
  slide.addShape("rect", {
    x: x + 0.1, y: y + 0.18, w: 1.35, h: 2.55,
    fill: { color: "2A2A28" }, line: { color: "2A2A28", width: 0 },
  });
  slide.addShape("rect", {
    x: x + 0.18, y: y + 0.28, w: 0.62, h: 0.22,
    fill: { color: "FFFFFF" }, line: { color: "FFFFFF", width: 0 },
  });
  slide.addText("CESAR+", {
    x: x + 0.2, y: y + 0.29, w: 0.58, h: 0.2,
    fontSize: 7, bold: true, color: INK, align: "center", margin: 0,
  });
}

function buildDeck() {
  const pres = makePres();

  // Slide 1 — Title
  const s1 = darkSlide(pres);
  accentBar(s1, 2.1);
  s1.addText("CraftCut", {
    x: 0.7, y: 2.25, w: 8.5, h: 1.0,
    fontSize: 54, bold: true, color: "FFFFFF", fontFace: "Georgia", margin: 0,
  });
  s1.addText("César+ Start-up — Presse verticale souveraine", {
    x: 0.7, y: 3.2, w: 8.0, h: 0.5,
    fontSize: 16, color: "D4D4D2", fontFace: "Calibri", margin: 0,
  });
  s1.addText("Paris · Station F · 2026", {
    x: 0.7, y: 4.55, w: 4.0, h: 0.35,
    fontSize: 11, color: SAGE, fontFace: "Calibri", margin: 0,
  });
  footer(s1, 1);

  // Slide 2 — Executive Summary
  const s2 = lightSlide(pres);
  titleBlock(s2, "Résumé exécutif", "Patrimoine, mode et artisanat → essais vidéo 9:16");
  s2.addText("« Une Presse Gutenberg de l'ère verticale. »", {
    x: 0.7, y: 2.0, w: 4.2, h: 1.4,
    fontSize: 22, italic: true, color: ACCENT, fontFace: "Georgia", margin: 0,
  });
  s2.addText([
    { text: "CraftCut compile variables culturelles, artistiques et historiques en essais vidéo verticaux haute fidélité.", options: { breakLine: true } },
    { text: "Pochettes animées, haute couture, plans d'architecte, geste des Ouvriers de France.", options: { breakLine: true } },
    { text: "Centaines de chaînes thématiques ciblées — qualité broadcast, souveraineté totale.", options: {} },
  ], {
    x: 5.3, y: 1.95, w: 4.1, h: 2.5,
    fontSize: 12, color: INK, fontFace: "Calibri", valign: "top", margin: 0,
  });
  footer(s2, 2);

  // Slide 3 — Problem
  const s3 = lightSlide(pres);
  titleBlock(s3, "Le problème", "La dilution du prestige par le « AI slop »");
  card(s3, 0.7, 2.0, 2.8, 2.5, "Spam algorithmique",
    "Vidéos IA génériques, répétitives, basse fidélité — les plateformes les suppriment.");
  card(s3, 3.7, 2.0, 2.8, 2.5, "Patrimoine invisible",
    "L'artisanat français et le geste noble des Ouvriers restent hors du format mobile.");
  card(s3, 6.7, 2.0, 2.8, 2.5, "Scalabilité impossible",
    "Les maisons de luxe ne peuvent pas produire 350 variantes localisées par jour.");
  footer(s3, 3);

  // Slide 4 — Solution
  const s4 = lightSlide(pres);
  titleBlock(s4, "La solution", "Pipeline propriétaire CraftCut");
  s4.addShape("rect", {
    x: 0.7, y: 2.0, w: 8.8, h: 2.7,
    fill: { color: SAND }, line: { color: "D8D8D4", width: 1 },
  });
  s4.addText([
    { text: "Presse d'impression vidéo verticale autonome", options: { bold: true, breakLine: true } },
    { text: "Sourcing → Localisation → Typographie → Compilation HEVC", options: { breakLine: true } },
    { text: "50 campagnes/jour × 7 langues = 350 vidéos finalisées", options: { breakLine: true } },
    { text: "Standards Canal+ : typographie suisse, zones de sécurité, grain organique", options: {} },
  ], {
    x: 1.0, y: 2.3, w: 5.5, h: 2.2,
    fontSize: 13, color: INK, fontFace: "Calibri", valign: "top", margin: 0,
  });
  phoneFrame(s4, 7.6, 2.15);
  footer(s4, 4);

  // Slide 5 — Sourcing Agent
  const s5 = lightSlide(pres);
  titleBlock(s5, "Agent de sourcing", "Mining automatique d'actifs motion");
  card(s5, 0.7, 2.0, 4.2, 1.2, "Apple Music & Design Registers",
    "Surveillance des pochettes animées et registres de design haute résolution.");
  card(s5, 0.7, 3.4, 4.2, 1.2, "Rejet des placeholders",
    "Filtrage automatique des actifs statiques — uniquement du motion vérifié.");
  card(s5, 5.2, 2.0, 4.3, 2.6, "Deep Web Sourcing",
    "15 000 tokens d'input par cycle — catalogues mode, archives artisanales, historiques.");
  footer(s5, 5);

  // Slide 6 — Localization
  const s6 = lightSlide(pres);
  titleBlock(s6, "Agent de localisation", "Bornage dynamique des mots — 7 langues");
  s6.addTable([
    [
      { text: "Langue", options: { bold: true, fill: { color: SAND }, color: INK } },
      { text: "Limite mots", options: { bold: true, fill: { color: SAND }, color: INK } },
      { text: "Durée max", options: { bold: true, fill: { color: SAND }, color: INK } },
    ],
    ["FR / EN / ES / IT / PT / LV", "120 mots", "60 sec"],
    ["DE", "85 mots", "60 sec"],
    ["Consensus multi-agents", "12 000 tokens/output", "7 streams parallèles"],
  ], {
    x: 0.7, y: 2.0, w: 8.8, h: 2.2,
    fontSize: 11, color: INK,
    border: { pt: 0.5, color: "D8D8D4" },
    colW: [3.5, 2.5, 2.8],
    margin: 0.08,
  });
  footer(s6, 6);

  // Slide 7 — Typography
  const s7 = lightSlide(pres);
  titleBlock(s7, "Synthétiseur typographique", "ASS/SSA · Safe-zones · Signature CESAR+");
  card(s7, 0.7, 2.0, 4.0, 2.5, "Purification glyphes",
    "Suppression des smart-quotes, calage FontSize 54, MarginV 240.");
  phoneFrame(s7, 5.5, 1.85);
  s7.addText([
    { text: "Zones de sécurité mobiles", options: { bullet: true, breakLine: true } },
    { text: "Watermark broadcast CESAR+", options: { bullet: true, breakLine: true } },
    { text: "Zéro collision UI native", options: { bullet: true } },
  ], {
    x: 7.3, y: 2.1, w: 2.3, h: 2.0,
    fontSize: 11, color: INK, fontFace: "Calibri", margin: 0,
  });
  footer(s7, 7);

  // Slide 8 — Hardware
  const s8 = lightSlide(pres);
  titleBlock(s8, "Performance matérielle", "Local-first · Zéro-coût · M3 Max");
  s8.addText("hevc_videotoolbox", {
    x: 0.7, y: 2.2, w: 5.0, h: 0.8,
    fontSize: 28, bold: true, color: ACCENT, fontFace: "Consolas", margin: 0,
  });
  s8.addText([
    { text: "Encodage HEVC matériel Apple Silicon", options: { breakLine: true } },
    { text: "Rendu local zéro-coût avant montée Cloud Run", options: { breakLine: true } },
    { text: "Architecture hybride local-cloud souveraine", options: {} },
  ], {
    x: 0.7, y: 3.2, w: 5.5, h: 1.5,
    fontSize: 13, color: INK, fontFace: "Calibri", margin: 0,
  });
  s8.addShape("rect", {
    x: 6.5, y: 2.0, w: 3.0, h: 2.8,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  s8.addText("M3 Max\nGPU\nHEVC", {
    x: 6.5, y: 2.5, w: 3.0, h: 1.8,
    fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0,
  });
  footer(s8, 8);

  // Slide 9 — Token Math
  const s9 = lightSlide(pres);
  titleBlock(s9, "Scaling tokens", "Justification crédits cloud entreprise");
  s9.addText("64,3", {
    x: 0.7, y: 2.0, w: 5.5, h: 1.2,
    fontSize: 72, bold: true, color: ACCENT, fontFace: "Georgia", margin: 0,
  });
  s9.addText("Millions de tokens / mois", {
    x: 0.7, y: 3.1, w: 5.5, h: 0.5,
    fontSize: 18, color: INK, fontFace: "Calibri", margin: 0,
  });
  s9.addText("50 cycles × 31 000 tokens × 30 jours  |  350 sorties localisées/jour", {
    x: 0.7, y: 3.7, w: 8.5, h: 0.4,
    fontSize: 10, color: MUTED, fontFace: "Consolas", margin: 0,
  });
  s9.addShape("rect", {
    x: 6.8, y: 2.0, w: 2.7, h: 2.5,
    fill: { color: SAND }, line: { color: "D8D8D4", width: 1 },
  });
  s9.addText("Cible crédits\n$25k – $100k\nvia HAL Station F", {
    x: 6.9, y: 2.3, w: 2.5, h: 2.0,
    fontSize: 12, bold: true, color: INK, align: "center", valign: "middle", margin: 0,
  });
  footer(s9, 9);

  // Slide 10 — Station F
  const s10 = lightSlide(pres);
  titleBlock(s10, "Station F & HEC", "Candidature Fall/Winter 2026");
  card(s10, 0.7, 2.0, 4.2, 2.5, "Incubateur HEC Paris",
    "Patrimoine, design, luxe — alignement parfait avec Ouvriers de France.");
  card(s10, 5.2, 2.0, 4.3, 2.5, "Founders Program",
    "MVP live, scalabilité 350 vidéos/jour, fondateur-architecte système.");
  footer(s10, 10);

  // Slide 11 — Market
  const s11 = lightSlide(pres);
  titleBlock(s11, "Marché & croissance", "Opportunité 2026");
  card(s11, 0.7, 2.0, 2.8, 2.5, "Maisons de luxe",
    "Scaler la présence verticale sans diluer l'identité visuelle.");
  card(s11, 3.7, 2.0, 2.8, 2.5, "Institutions culturelles",
    "Exporter l'artisanat régional en 7 langues.");
  card(s11, 6.7, 2.0, 2.8, 2.5, "Labels & créateurs",
    "Pochettes animées → campagnes TikTok natives à haute rétention.");
  footer(s11, 11);

  // Slide 12 — Closing
  const s12 = darkSlide(pres);
  accentBar(s12, 2.0);
  s12.addText("CESAR / OSCAR", {
    x: 0.7, y: 2.15, w: 8.5, h: 1.0,
    fontSize: 48, bold: true, color: "FFFFFF", fontFace: "Georgia", margin: 0,
  });
  s12.addText("extendedvoidvoid.github.io/atelier-synesthesie", {
    x: 0.7, y: 3.35, w: 8.0, h: 0.4,
    fontSize: 12, color: SAGE, fontFace: "Calibri", margin: 0,
  });
  s12.addText("extendedvoid.prod+craftcut@gmail.com", {
    x: 0.7, y: 3.85, w: 8.0, h: 0.35,
    fontSize: 11, color: "8A8A86", fontFace: "Calibri", margin: 0,
  });
  footer(s12, 12);

  return pres.writeFile({ fileName: OUT });
}

buildDeck()
  .then(() => console.log(`✓ Deck written: ${OUT}`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });