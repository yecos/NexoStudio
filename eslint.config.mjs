import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Allow Next.js Image exceptions where needed
      "@next/next/no-img-element": "off",
      // Keep TypeScript pragmatic
      "@typescript-eslint/no-explicit-any": "warn",
      // Relax unused vars to warning (won't block CI)
      "@typescript-eslint/no-unused-vars": "warn",
      // Keep React pragmas
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
