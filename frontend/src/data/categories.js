// En enda källa för kategorier och svårighetsgrader.
// `category` måste vara exakt samma text som står i frågornas "category"-fält.

export const categories = [
    {
        slug: "linjara-ekvationer",
        category: "Linjära ekvationer",
        label: "Linjära ekvationer",
        blurb: "Hitta x i ekvationer, från enkla till flerstegs.",
    },
    {
        slug: "andragradsekvationer",
        category: "Andragradsekvationer",
        label: "Andragradsekvationer",
        blurb: "Lös ekvationer med x² och hitta båda rötterna.",
    },
    {
        slug: "ekvationssystem",
        category: "Ekvationssystem",
        label: "Ekvationssystem",
        blurb: "Två ekvationer, två obekanta – även med grafer.",
    },
    {
        slug: "linjara-funktioner",
        category: "Linjära funktioner",
        label: "Linjära funktioner",
        blurb: "Lutning, y-axelns skärning och räta linjens ekvation.",
    },
    {
        slug: "parallella-linjer",
        category: "Parallella och vinkelräta linjer",
        label: "Parallella linjer",
        blurb: "Parallella och vinkelräta linjer samt antal lösningar.",
    },
    {
        slug: "geometriarea",
        category: "Geometri - Area",
        label: "Geometri: Area",
        blurb: "Beräkna arean av figurer.",
    },
    {
        slug: "geometricirkel",
        category: "Geometri - Cirkel",
        label: "Geometri: Cirkel",
        blurb: "Omkrets och area av cirklar.",
    },
    {
        slug: "geometripythagoras",
        category: "Geometri - Pythagoras",
        label: "Geometri: Pythagoras",
        blurb: "Räkna ut sidor i rätvinkliga trianglar.",
    },
    {
        slug: "geometrivolym",
        category: "Geometri - Volym",
        label: "Geometri: Volym",
        blurb: "Volym av geometriska kroppar.",
    },
    {
        slug: "statistik",
        category: "Statistik",
        label: "Statistik",
        blurb: "Diagram, medelvärde, median och procent.",
    },
    {
        slug: "andragradsfunktionens-graf",
        category: "Andragradsfunktionens graf",
        label: "Andragradsfunktionens graf",
        blurb: "Parabler, extrempunkter och grafens form.",
    },
    {
        slug: "nollstallen-symmetrilinje",
        category: "Nollställen och symmetrilinje",
        label: "Nollställen och symmetrilinje",
        blurb: "Rötter, symmetriaxel och extrempunkt.",
    },
    {
        slug: "problemlosning",
        category: "Problemlösning",
        label: "Problemlösning",
        blurb: "Tolka textproblem och välj rätt ekvation.",
    },
    {
        slug: "rationella-exponenter",
        category: "Potenser med rationella exponenter",
        label: "Potenser med rationella exponenter",
        blurb: "Bråkexponenter och rötter.",
    },
    {
        slug: "exponentialfunktioner",
        category: "Exponentialfunktioner",
        label: "Exponentialfunktioner",
        blurb: "Förändringsfaktor och exponentiell tillväxt.",
    },
    {
        slug: "logaritmer",
        category: "Logaritmer",
        label: "Logaritmer",
        blurb: "Tiologaritmer och exponentekvationer.",
    },
    {
        slug: "linjara-exponentiella-metoder",
        category: "Linjära och exponentiella metoder",
        label: "Linjära och exponentiella metoder",
        blurb: "Välj modell och jämför förändring.",
    },
];

export const difficulties = [
    { slug: "easy", label: "Lätt" },
    { slug: "medium", label: "Medel" },
    { slug: "hard", label: "Svår" },
];

export function getCategory(slug) {
    return categories.find((item) => item.slug === slug);
}

export function difficultyLabel(slug) {
    const key = String(slug ?? "").toLowerCase();
    return difficulties.find((item) => item.slug === key)?.label ?? slug;
}

export function difficultyClass(slug) {
    const key = String(slug ?? "").toLowerCase();
    return difficulties.some((item) => item.slug === key)
        ? `badge--${key}`
        : "badge--hard";
}
