export const CRITERIA = [
  { id: "price", name: "Harga", type: "cost", label: "Harga (Rp)" },
  { id: "cpu", name: "CPU Cores", type: "benefit", label: "CPU (Cores)" },
  { id: "ram", name: "RAM", type: "benefit", label: "RAM (GB)" },
  {
    id: "storage",
    name: "Penyimpanan",
    type: "benefit",
    label: "Storage (GB)",
  },
  { id: "vram", name: "VRAM", type: "benefit", label: "VRAM (GB)" },
];

export const MAJORS = [
  {
    id: "informatika",
    name: "Teknik Informatika",
    // Target: A4 (Gaming) - Balanced High Specs
    weights: { price: 0.2, cpu: 0.25, ram: 0.25, storage: 0.15, vram: 0.15 },
  },
  {
    id: "dkv",
    name: "Desain Komunikasi Visual",
    // Target: A5 (Render) - Extreme VRAM focus
    weights: { price: 0.05, cpu: 0.15, ram: 0.2, storage: 0.1, vram: 0.5 },
  },
  {
    id: "bisnis",
    name: "Bisnis Digital",
    // Target: A2 (Bisnis) - Storage & Price focus
    weights: { price: 0.5, cpu: 0.1, ram: 0.1, storage: 0.25, vram: 0.05 },
  },
  {
    id: "sastra",
    name: "Sastra Inggris",
    // Target: A1 (Office) - Extreme Price focus (Cheap)
    weights: { price: 0.75, cpu: 0.05, ram: 0.05, storage: 0.1, vram: 0.05 },
  },
  {
    id: "arsitektur",
    name: "Arsitektur",
    // Target: A3 (Desain) - CPU/RAM focus
    weights: { price: 0.15, cpu: 0.3, ram: 0.3, storage: 0.15, vram: 0.1 },
  },
  {
    id: "akuntansi",
    name: "Akuntansi",
    // Target: A2 (Bisnis) - Balanced/Office
    weights: { price: 0.3, cpu: 0.2, ram: 0.2, storage: 0.2, vram: 0.1 },
  },
  {
    id: "hukum",
    name: "Hukum",
    // Target: A1 (Office) - Text focus
    weights: { price: 0.4, cpu: 0.1, ram: 0.1, storage: 0.3, vram: 0.1 },
  },
  {
    id: "kedokteran",
    name: "Kedokteran",
    // Target: A2/A3 - Balanced/Storage focus
    weights: { price: 0.2, cpu: 0.2, ram: 0.2, storage: 0.3, vram: 0.1 },
  },
];

// Helper to convert raw values to 1-5 scale (Crisp Conversion)
export const getCrispValue = (key, value) => {
  if (key === "price") {
    // C1 Price (Cost)
    if (value < 6000000) return 5; // Sangat Murah
    if (value <= 10000000) return 4; // 6jt - 10jt
    if (value <= 14000000) return 3; // 10jt - 14jt
    if (value <= 20000000) return 2; // 14jt - 20jt
    return 1; // > 20jt (Sangat Mahal)
  }
  if (key === "cpu") {
    // C2 CPU (Benefit)
    if (value >= 12) return 5;
    if (value >= 8) return 4; // 8 - 10 Core
    if (value === 6) return 3;
    if (value === 4) return 2;
    return 1; // 2 Core
  }
  if (key === "ram") {
    // C3 RAM (Benefit)
    if (value >= 32) return 5;
    if (value >= 16) return 4;
    if (value >= 8) return 3;
    if (value >= 4) return 2; // Starts at 2
    return 1; // Fallback
  }
  if (key === "storage") {
    // C4 Storage (Benefit)
    if (value >= 2000) return 4;
    if (value >= 1000) return 3;
    if (value >= 512) return 2;
    if (value >= 256) return 1;
    return 1;
  }
  if (key === "vram") {
    // C5 VRAM (Benefit)
    if (value >= 16) return 5; // A5's 32GB handled here
    if (value >= 8) return 4;
    if (value >= 6) return 3;
    if (value >= 4) return 2;
    return 1; // Integrated / 2 GB
  }
  return 1;
};

export const calculateTOPSIS = (laptops, weights) => {
  if (!laptops.length || !weights) return null;

  // 1. Decision Matrix (X) & Crisp Conversion
  const decisionMatrix = laptops.map((laptop) => {
    const scores = {};
    CRITERIA.forEach((c) => {
      scores[c.id] = getCrispValue(c.id, laptop[c.id]);
    });
    return { ...laptop, scores };
  });

  // 2. Normalization (R)
  // Formula: r_ij = x_ij / sqrt(sum(x_kj^2))
  const normalizedMatrix = decisionMatrix.map((item) => ({
    ...item,
    normalized: {},
  }));

  CRITERIA.forEach((c) => {
    const sumSquares = decisionMatrix.reduce(
      (sum, item) => sum + Math.pow(item.scores[c.id], 2),
      0
    );
    const denominator = Math.sqrt(sumSquares);

    normalizedMatrix.forEach((item) => {
      item.normalized[c.id] = item.scores[c.id] / (denominator || 1);
    });
  });

  // 3. Weighted Normalization (Y)
  // Formula: y_ij = w_j * r_ij
  const weightedMatrix = normalizedMatrix.map((item) => {
    const weighted = {};
    CRITERIA.forEach((c) => {
      weighted[c.id] = item.normalized[c.id] * weights[c.id];
    });
    return { ...item, weighted };
  });

  // 4. Ideal Solutions (A+ and A-)
  const idealPositive = {};
  const idealNegative = {};

  CRITERIA.forEach((c) => {
    const values = weightedMatrix.map((item) => item.weighted[c.id]);
    if (c.type === "benefit") {
      idealPositive[c.id] = Math.max(...values);
      idealNegative[c.id] = Math.min(...values);
    } else {
      // cost
      idealPositive[c.id] = Math.min(...values);
      idealNegative[c.id] = Math.max(...values);
    }
  });

  // 5. Distance Calculation (D+ and D-) & Preference Value (V)
  const finalResults = weightedMatrix.map((item) => {
    let distPos = 0;
    let distNeg = 0;

    CRITERIA.forEach((c) => {
      distPos += Math.pow(item.weighted[c.id] - idealPositive[c.id], 2);
      distNeg += Math.pow(item.weighted[c.id] - idealNegative[c.id], 2);
    });

    distPos = Math.sqrt(distPos);
    distNeg = Math.sqrt(distNeg);

    // V = D- / (D- + D+)
    const preference = distNeg / (distNeg + distPos);

    return {
      ...item,
      distPos,
      distNeg,
      preference,
    };
  });

  // Sort by Preference Value (Descending)
  return finalResults.sort((a, b) => b.preference - a.preference);
};
