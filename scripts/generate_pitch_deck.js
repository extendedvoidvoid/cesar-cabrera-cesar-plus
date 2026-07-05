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

function titleBlock(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.7, y: 0.55, w: 8.6, h: 0.9,
    fontSize: 34, bold: true, color: INK, fontFace: "Georgia", margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.7, y: 1.35, w: 8.0, h: 0.45,
      fontSize: 13, color: MUTED, fontFace: "Calibri", margin: 0,
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

  // 1 — Title
  const s1 = darkSlide(pres);
  accentBar(s1, 2.1);
  s1.addText("CraftCut", {
    x: 0.7, y: 2.25, w: 8.5, h: 1.0,
    fontSize: 54, bold: true, color: "FFFFFF", fontFace: "Georgia", margin: 0,
  });
  s1.addText("Automatisation vidéo IA pour marques exigeantes", {
    x: 0.7, y: 3.2, w: 8.0, h: 0.5,
    fontSize: 16, color: "D4D4D2", fontFace: "Calibri", margin: 0,
  });
  s1.addText("Paris · Station F · 2026", {
    x: 0.7, y: 4.55, w: 4.0, h: 0.35,
    fontSize: 11, color: SAGE, fontFace: "Calibri", margin: 0,
  });
  footer(s1, 1);

  // 2 — Executive Summary
  const s2 = lightSlide(pres);
  titleBlock(s2, "Résumé exécutif", "Le montage vidéo IA qui fonctionne enfin");
  s2.addText("« Pour les marques\nau cahier des charges élevé. »", {
    x: 0.7, y: 2.0, w: 4.2, h: 1.4,
    fontSize: 22, italic: true, color: ACCENT, fontFace: "Georgia", margin: 0,
  });
  s2.addText([
    { text: "Synthèse du meilleur motion design — beat-sync, typographie suisse, grain organique.", options: { breakLine: true } },
    { text: "Contrôle total des sous-titres. Pipeline validé, prêt au déploiement cloud.", options: { breakLine: true } },
    { text: "350 vidéos/jour · 64,3M tokens/mois.", options: {} },
  ], {
    x: 5.3, y: 1.95, w: 4.1, h: 2.5,
    fontSize: 12, color: INK, fontFace: "Calibri", valign: "top", margin: 0,
  });
  footer(s2, 2);

  // 3 — Problem
  const s3 = lightSlide(pres);
  titleBlock(s3, "Le problème", "Trois blocages pour les marques exigeantes");
  card(s3, 0.7, 2.0, 2.8, 2.5, "Cahier des charges",
    "Le montage vidéo IA générique ne tient pas les standards motion design premium.");
  card(s3, 3.7, 2.0, 2.8, 2.5, "Engagement quotidien",
    "Entre le reportage hebdo et le flux social, aucune couche de vidéos qui développent les messages.");
  card(s3, 6.7, 2.0, 2.8, 2.5, "Dilution des stats",
    "Les marques hésitent à publier en plusieurs langues sur leurs comptes officiels.");
  footer(s3, 3);

  // 4 — Solution
  const s4 = lightSlide(pres);
  titleBlock(s4, "La solution", "Une promesse créative tenue par l'IA");
  s4.addShape("rect", {
    x: 0.7, y: 2.0, w: 8.8, h: 2.7,
    fill: { color: SAND }, line: { color: "D8D8D4", width: 1 },
  });
  s4.addText([
    { text: "Industrialiser l'excellence du motion design", options: { bold: true, breakLine: true } },
    { text: "Contrôle total des sous-titres — calage, glyphes, safe-zones, zéro collision UI", options: { breakLine: true } },
    { text: "Pipeline validé · Prêt au déploiement cloud", options: { breakLine: true } },
    { text: "50 campagnes/jour × 7 langues = 350 vidéos finalisées", options: {} },
  ], {
    x: 1.0, y: 2.3, w: 5.5, h: 2.2,
    fontSize: 13, color: INK, fontFace: "Calibri", valign: "top", margin: 0,
  });
  phoneFrame(s4, 7.6, 2.15);
  footer(s4, 4);

  // 5 — Entry point
  const s5 = lightSlide(pres);
  titleBlock(s5, "Porte d'entrée", "Pop culture → Labels → Podcasts jeunesse");
  card(s5, 0.7, 2.0, 2.8, 2.5, "Phase 1 — Pop culture",
    "Couvertures d'album et univers artistiques : vecteur naturel pour engager artistes et labels.");
  card(s5, 3.7, 2.0, 2.8, 2.5, "Phase 2 — Labels & artistes",
    "Chaînes verticales de niche à haute rétention autour des univers musicaux.");
  card(s5, 6.7, 2.0, 2.8, 2.5, "Phase 3 — Podcasts jeunesse",
    "Extension vers formats longs ciblés jeunesse, portés par la crédibilité acquise.");
  footer(s5, 5);

  // 6 — Editorial duo
  const s6 = lightSlide(pres);
  titleBlock(s6, "Duo éditorial", "Reportages hebdo + vidéos quotidiennes");
  card(s6, 0.7, 2.0, 4.2, 2.6, "Reportages hebdomadaires",
    "Terrain, architecture, Ouvriers de France, coulisses de marque — le fond, l'authenticité, la crédibilité.");
  card(s6, 5.2, 2.0, 4.3, 2.6, "Vidéos quotidiennes",
    "Formats courts qui approfondissent un message, une actualité, un détail — fidéliser sans lasser.");
  footer(s6, 6);

  // 7 — Internationalization
  const s7 = lightSlide(pres);
  titleBlock(s7, "Internationalisation", "Clonage vocal EU · Pages satellites");
  card(s7, 0.7, 2.0, 4.0, 2.5, "Clonage vocal européen",
    "Traduction + clonage vocal dans toutes les langues parlées en Europe — même voix, même intention.");
  s7.addShape("rect", {
    x: 5.2, y: 2.0, w: 4.3, h: 2.5,
    fill: { color: "FFFFFF" }, line: { color: "D8D8D4", width: 1 },
  });
  s7.addText("Compte officiel", {
    x: 5.4, y: 2.2, w: 1.8, h: 0.3,
    fontSize: 11, bold: true, color: INK, fontFace: "Georgia", margin: 0,
  });
  s7.addShape("rect", {
    x: 5.4, y: 2.55, w: 1.8, h: 0.7,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  s7.addText("Stats\nprotégées", {
    x: 5.4, y: 2.6, w: 1.8, h: 0.6,
    fontSize: 10, color: "FFFFFF", align: "center", valign: "middle", margin: 0,
  });
  s7.addText("Pages fan / satellites", {
    x: 7.4, y: 2.2, w: 1.9, h: 0.3,
    fontSize: 11, bold: true, color: ACCENT, fontFace: "Georgia", margin: 0,
  });
  s7.addText([
    { text: "FR · DE · ES · IT · PT · LV", options: { breakLine: true } },
    { text: "Appui créatif journalier", options: { breakLine: true } },
    { text: "Sans cannibaliser l'engagement", options: {} },
  ], {
    x: 7.4, y: 2.55, w: 1.9, h: 1.7,
    fontSize: 10, color: MUTED, fontFace: "Calibri", valign: "top", margin: 0,
  });
  footer(s7, 7);

  // 8 — Motion design excellence
  const s8 = lightSlide(pres);
  titleBlock(s8, "Excellence motion", "Contrôle typographique total");
  card(s8, 0.7, 2.0, 4.0, 2.5, "Synthèse motion design",
    "Rythme cinétique, compositions suisses, transitions beat-sync, grain organique — imposés à chaque sortie.");
  phoneFrame(s8, 5.5, 1.85);
  s8.addText([
    { text: "Contrôle total des sous-titres", options: { bullet: true, breakLine: true } },
    { text: "Zones de sécurité mobiles", options: { bullet: true, breakLine: true } },
    { text: "Signature broadcast CESAR+", options: { bullet: true } },
  ], {
    x: 7.3, y: 2.1, w: 2.3, h: 2.0,
    fontSize: 11, color: INK, fontFace: "Calibri", margin: 0,
  });
  footer(s8, 8);

  // 9 — Cloud deployment
  const s9 = lightSlide(pres);
  titleBlock(s9, "Déploiement cloud", "Pipeline validé · Scale enterprise");
  s9.addText("CLOUD READY", {
    x: 0.7, y: 2.2, w: 5.0, h: 0.8,
    fontSize: 28, bold: true, color: ACCENT, fontFace: "Consolas", margin: 0,
  });
  s9.addText([
    { text: "Orchestration multi-agents · Rendu parallèle", options: { breakLine: true } },
    { text: "Google Cloud Run · Azure AKS · AWS Fargate", options: { breakLine: true } },
    { text: "Montée en charge horizontale sans compromis esthétique", options: {} },
  ], {
    x: 0.7, y: 3.2, w: 5.5, h: 1.5,
    fontSize: 13, color: INK, fontFace: "Calibri", margin: 0,
  });
  s9.addShape("rect", {
    x: 6.5, y: 2.0, w: 3.0, h: 2.8,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  s9.addText("Multi-Agent\nOrchestration\nEnterprise", {
    x: 6.5, y: 2.4, w: 3.0, h: 2.0,
    fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0,
  });
  footer(s9, 9);

  // 10 — Token math
  const s10 = lightSlide(pres);
  titleBlock(s10, "Volume opérationnel", "Justification crédits cloud entreprise");
  s10.addText("64,3", {
    x: 0.7, y: 2.0, w: 5.5, h: 1.2,
    fontSize: 72, bold: true, color: ACCENT, fontFace: "Georgia", margin: 0,
  });
  s10.addText("Millions de tokens / mois", {
    x: 0.7, y: 3.1, w: 5.5, h: 0.5,
    fontSize: 18, color: INK, fontFace: "Calibri", margin: 0,
  });
  s10.addText("50 cycles × 31 000 tokens × 30 jours  |  350 sorties localisées/jour", {
    x: 0.7, y: 3.7, w: 8.5, h: 0.4,
    fontSize: 10, color: MUTED, fontFace: "Consolas", margin: 0,
  });
  s10.addShape("rect", {
    x: 6.8, y: 2.0, w: 2.7, h: 2.5,
    fill: { color: SAND }, line: { color: "D8D8D4", width: 1 },
  });
  s10.addText("Cible crédits\n$25k – $100k\nvia HAL Station F", {
    x: 6.9, y: 2.3, w: 2.5, h: 2.0,
    fontSize: 12, bold: true, color: INK, align: "center", valign: "middle", margin: 0,
  });
  footer(s10, 10);

  // 11 — Market
  const s11 = lightSlide(pres);
  titleBlock(s11, "Marché & croissance", "Go-to-market 2026");
  card(s11, 0.7, 2.0, 2.8, 2.5, "Labels & artistes",
    "Pop culture et couvertures d'album comme vecteur d'entrée.");
  card(s11, 3.7, 2.0, 2.8, 2.5, "Marques exigeantes",
    "Automatisation IA respectant un cahier des charges motion design élevé.");
  card(s11, 6.7, 2.0, 2.8, 2.5, "Institutions & EU",
    "Reportages + satellites multilingues sans diluer les comptes officiels.");
  footer(s11, 11);

  // 12 — Closing
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