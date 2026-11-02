import { routes } from "@/config/routes";

export interface BudgetSuggestion {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  min?: number;
  max?: number;
}

export const NAIRA_BUDGET_SUGGESTIONS: BudgetSuggestion[] = [
  {
    id: "5m-7m",
    label: "₦5,000,000 - ₦7,000,000",
    shortLabel: "₦5M - ₦7M",
    description: "Entry-level quality — Toyota, Honda, Hyundai",
    min: 5000000,
    max: 7000000,
  },
  {
    id: "7m-10m",
    label: "₦7,000,000 - ₦10,000,000",
    shortLabel: "₦7M - ₦10M",
    description: "Mid-range favourites — Lexus, Ford, Kia",
    min: 7000000,
    max: 10000000,
  },
  {
    id: "10m-15m",
    label: "₦10,000,000 - ₦15,000,000",
    shortLabel: "₦10M - ₦15M",
    description: "Premium sedans & versatile SUVs",
    min: 10000000,
    max: 15000000,
  },
  {
    id: "15m-25m",
    label: "₦15,000,000 - ₦25,000,000",
    shortLabel: "₦15M - ₦25M",
    description: "Executive SUVs — Mercedes, BMW, Land Rover",
    min: 15000000,
    max: 25000000,
  },
  {
    id: "above-25m",
    label: "Above ₦25,000,000",
    shortLabel: "Above ₦25M",
    description: "Top-tier luxury & flagship models",
    min: 25000000,
  },
];

const WORD_NUMBERS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

/**
 * Formats any continuous sequence of digits inside text with commas after every 3 digits.
 * E.g.: "2000000" -> "2,000,000"
 * E.g.: "under 2000000" -> "under 2,000,000"
 * E.g.: "2000000 - 3000000" -> "2,000,000 - 3,000,000"
 * Preserves decimals like "2.5m" or "2.5"
 */
export function formatNumberClusters(text: string): string {
  if (!text) return "";
  return text.replace(/\b(\d[\d,]*\d|\d+)\b/g, (match) => {
    const cleanDigits = match.replace(/,/g, "");
    if (!/^\d+$/.test(cleanDigits)) return match;
    // Format every 3 digits with a comma
    return cleanDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });
}

/**
 * Converts a numeric amount to spelled-out words in Nigerian Naira.
 * E.g. 2,000,000 -> "Two Million Naira"
 * E.g. 2,500,000 -> "Two Million, Five Hundred Thousand Naira"
 */
export function formatNairaInWords(amount: number): string {
  if (!amount || amount <= 0) return "";

  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convertChunk(num: number): string {
    let str = "";
    if (num >= 100) {
      str += units[Math.floor(num / 100)] + " Hundred";
      num %= 100;
      if (num > 0) str += " and ";
    }
    if (num >= 20) {
      str += tens[Math.floor(num / 10)];
      if (num % 10 > 0) str += "-" + units[num % 10];
    } else if (num > 0) {
      str += units[num];
    }
    return str;
  }

  const millions = Math.floor(amount / 1_000_000);
  const thousands = Math.floor((amount % 1_000_000) / 1_000);
  const remainder = amount % 1_000;

  const parts: string[] = [];
  if (millions > 0) {
    parts.push(`${convertChunk(millions)} Million`);
  }
  if (thousands > 0) {
    parts.push(`${convertChunk(thousands)} Thousand`);
  }
  if (remainder > 0 && millions === 0) {
    parts.push(convertChunk(remainder));
  }

  if (parts.length === 0) return "";
  return parts.join(", ") + " Naira";
}

/**
 * Formats a numeric amount to a clean compact representation.
 * E.g. 2,000,000 -> "₦2M"
 * E.g. 2,500,000 -> "₦2.5M"
 * E.g. 20,000,000 -> "₦20M"
 */
export function formatCompactNaira(amount: number): string {
  if (amount >= 1_000_000_000) {
    const val = (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "");
    return `₦${val}B`;
  }
  if (amount >= 1_000_000) {
    const val = (amount / 1_000_000)
      .toFixed(2)
      .replace(/\.00$/, "")
      .replace(/(\.[0-9])0$/, "$1");
    return `₦${val}M`;
  }
  if (amount >= 1_000) {
    const val = (amount / 1_000).toFixed(1).replace(/\.0$/, "");
    return `₦${val}k`;
  }
  return `₦${amount.toLocaleString()}`;
}

export interface BudgetClarifier {
  compact: string;
  inWords: string;
  amount?: number;
  minPrice?: number;
  maxPrice?: number;
  canQuickExpandMillion?: boolean;
  expandedValue?: string;
}

/**
 * Provides a clear, unambiguous human explanation of what the user entered
 * to prevent zero-counting errors.
 */
export function describeBudgetText(raw: string): BudgetClarifier | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Check if user entered a small standalone number <= 50 that could be millions
  const singleNumberMatch = trimmed.match(/^([0-9]+(?:\.[0-9]+)?)$/);
  let canQuickExpandMillion = false;
  let expandedValue: string | undefined;

  if (singleNumberMatch) {
    const num = parseFloat(singleNumberMatch[1]);
    if (num > 0 && num <= 50) {
      canQuickExpandMillion = true;
      expandedValue = (num * 1_000_000).toLocaleString();
    }
  }

  const parsed = parseBudgetText(trimmed);

  // If it's a range (both min and max)
  if (parsed.minPrice !== undefined && parsed.maxPrice !== undefined) {
    const minCompact = formatCompactNaira(parsed.minPrice);
    const maxCompact = formatCompactNaira(parsed.maxPrice);
    const minWords = formatNairaInWords(parsed.minPrice);
    const maxWords = formatNairaInWords(parsed.maxPrice);
    return {
      compact: `${minCompact} – ${maxCompact}`,
      inWords: `${minWords} to ${maxWords}`,
      minPrice: parsed.minPrice,
      maxPrice: parsed.maxPrice,
    };
  }

  // If it's maxPrice only (or under / up to / single budget)
  if (parsed.maxPrice !== undefined && parsed.minPrice === undefined) {
    const compact = formatCompactNaira(parsed.maxPrice);
    const inWords = formatNairaInWords(parsed.maxPrice);
    const isUnder = /under|below|less|<|up to/i.test(trimmed);
    return {
      compact: isUnder ? `Up to ${compact}` : compact,
      inWords: isUnder ? `Up to ${inWords}` : inWords,
      amount: parsed.maxPrice,
      maxPrice: parsed.maxPrice,
      canQuickExpandMillion,
      expandedValue,
    };
  }

  // If it's minPrice only (above / from / over)
  if (parsed.minPrice !== undefined && parsed.maxPrice === undefined) {
    const compact = formatCompactNaira(parsed.minPrice);
    const inWords = formatNairaInWords(parsed.minPrice);
    return {
      compact: `From ${compact}`,
      inWords: `From ${inWords} and above`,
      amount: parsed.minPrice,
      minPrice: parsed.minPrice,
    };
  }

  return null;
}

/**
 * Parses an amount token like "2.5m", "₦2,000,000", "3 million", "500k", or "2500000"
 */
export function parseNairaAmount(token: string): number | null {
  if (!token) return null;
  const cleaned = token.toLowerCase().replace(/[₦$,\s]/g, "").trim();
  if (!cleaned) return null;

  // Pattern with 'm' or 'million': e.g. "2.5m", "2million"
  const mMatch = cleaned.match(/^([0-9]+(?:\.[0-9]+)?)(?:m|million)$/i);
  if (mMatch) {
    const val = parseFloat(mMatch[1]);
    return isNaN(val) ? null : Math.round(val * 1_000_000);
  }

  // Pattern with 'k' or 'thousand': e.g. "500k", "500thousand"
  const kMatch = cleaned.match(/^([0-9]+(?:\.[0-9]+)?)(?:k|thousand)$/i);
  if (kMatch) {
    const val = parseFloat(kMatch[1]);
    return isNaN(val) ? null : Math.round(val * 1_000);
  }

  // Word-based numbers like "two million"
  for (const [word, val] of Object.entries(WORD_NUMBERS)) {
    if (cleaned.startsWith(word)) {
      if (cleaned.includes("million") || cleaned.includes("m")) {
        return val * 1_000_000;
      }
      return val * 1_000_000;
    }
  }

  const num = parseFloat(cleaned);
  if (!isNaN(num) && num > 0) {
    // If small number like 1.5, 2, 2.5, 3 (<= 50), interpret as millions in car dealership context
    if (num <= 50) {
      return Math.round(num * 1_000_000);
    }
    return Math.round(num);
  }

  return null;
}

export interface ParsedBudgetResult {
  minPrice?: number;
  maxPrice?: number;
  textQuery?: string;
}

/**
 * Parses free-form text input into budget filters or search query
 */
export function parseBudgetText(raw: string): ParsedBudgetResult {
  const trimmed = raw.trim();
  if (!trimmed) return {};

  const lower = trimmed.toLowerCase();

  // 1. Check matching pre-defined suggestions directly
  const exactSuggestion = NAIRA_BUDGET_SUGGESTIONS.find(
    (s) =>
      s.label.toLowerCase() === lower ||
      s.shortLabel.toLowerCase() === lower ||
      s.id.toLowerCase() === lower
  );
  if (exactSuggestion) {
    return {
      minPrice: exactSuggestion.min,
      maxPrice: exactSuggestion.max,
    };
  }

  // 2. Range: e.g. "₦2M - ₦3M", "2m to 3m", "2000000 - 3000000"
  const rangeMatch = lower.match(/^(.+?)(?:\s*(?:-|to)\s*)(.+)$/i);
  if (rangeMatch) {
    const min = parseNairaAmount(rangeMatch[1]);
    const max = parseNairaAmount(rangeMatch[2]);
    if (min !== null || max !== null) {
      return {
        minPrice: min !== null ? min : undefined,
        maxPrice: max !== null ? max : undefined,
      };
    }
  }

  // 3. Under / Below / Less than / Up to / <
  const underMatch = lower.match(
    /^(?:under|below|less\s+than|up\s+to|<|max(?:imum)?)\s*(.+)$/i
  );
  if (underMatch) {
    const max = parseNairaAmount(underMatch[1]);
    if (max !== null) {
      return { maxPrice: max };
    }
  }

  // 4. Above / More than / Over / > / +
  const aboveMatch =
    lower.match(/^(?:above|over|more\s+than|>|min(?:imum)?)\s*(.+)$/i) ||
    lower.match(/^(.+)\+$/);
  if (aboveMatch) {
    const min = parseNairaAmount(aboveMatch[1]);
    if (min !== null) {
      return { minPrice: min };
    }
  }

  // 5. Single amount
  const single = parseNairaAmount(lower);
  if (single !== null) {
    return { maxPrice: single };
  }

  // 6. Generic text search fallback
  return { textQuery: trimmed };
}

/**
 * Builds the inventory URL based on budget input or suggestion
 */
export function buildInventoryUrl(
  input?: string,
  suggestion?: BudgetSuggestion
): string {
  if (suggestion) {
    const params = new URLSearchParams();
    if (suggestion.min !== undefined) params.set("minPrice", String(suggestion.min));
    if (suggestion.max !== undefined) params.set("maxPrice", String(suggestion.max));
    const qs = params.toString();
    return qs ? `${routes.inventory}?${qs}` : routes.inventory;
  }

  if (!input || !input.trim()) {
    return routes.inventory;
  }

  const parsed = parseBudgetText(input);
  const params = new URLSearchParams();
  if (parsed.minPrice !== undefined) params.set("minPrice", String(parsed.minPrice));
  if (parsed.maxPrice !== undefined) params.set("maxPrice", String(parsed.maxPrice));
  if (parsed.textQuery) params.set("q", parsed.textQuery);

  const qs = params.toString();
  return qs ? `${routes.inventory}?${qs}` : routes.inventory;
}
