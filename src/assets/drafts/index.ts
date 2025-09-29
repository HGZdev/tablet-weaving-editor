import { plainChevronPattern } from "./plain-chevron-pattern";
import { braidPattern } from "./braid-pattern";
import { diamondWeavePattern } from "./diamond-weave-pattern";
import { oceanSpiralsPattern } from "./ocean-spirals-pattern";

// Export all patterns as an array
export const allPatterns = [
  plainChevronPattern,
  braidPattern,
  diamondWeavePattern,
  oceanSpiralsPattern,
];

// Export pattern metadata
export const patternMetadata = [
  {
    id: "plain-chevron",
    fileName: "plain-chevron-pattern.ts",
    name: plainChevronPattern.fileName,
    description: plainChevronPattern.description,
    category: "basic",
    difficulty: "beginner",
    draft: plainChevronPattern,
  },
  {
    id: "diamond-weave",
    fileName: "diamond-weave-pattern.ts",
    name: diamondWeavePattern.fileName,
    description: diamondWeavePattern.description,
    category: "traditional",
    difficulty: "intermediate",
    draft: diamondWeavePattern,
  },
  {
    id: "ocean-spirals",
    fileName: "ocean-spirals-pattern.ts",
    name: oceanSpiralsPattern.fileName,
    description: oceanSpiralsPattern.description,
    category: "nature",
    difficulty: "intermediate",
    draft: oceanSpiralsPattern,
  },
  {
    id: "braid-pattern",
    fileName: "braid-pattern.ts",
    name: braidPattern.fileName,
    description: braidPattern.description,
    category: "geometric",
    difficulty: "advanced",
    draft: braidPattern,
  },
];
