import { describe, expect, test } from "bun:test";
import {
  LEAD_PRIORITIES,
  LEAD_STATUSES,
  budgetPriority,
  isLeadPriority,
  isLeadStatus,
} from "./crm";

describe("CRM leads", () => {
  test("define el pipeline comercial completo", () => {
    expect(LEAD_STATUSES).toEqual([
      "new", "qualified", "meeting", "proposal",
      "negotiation", "won", "project", "lost",
    ]);
  });

  test("calcula prioridad por inversión", () => {
    expect(budgetPriority("Más de $1.000M COP")).toBe("high");
    expect(budgetPriority("$500M - $1.000M COP")).toBe("high");
    expect(budgetPriority("$250M - $500M COP")).toBe("medium");
    expect(budgetPriority("$100M - $250M COP")).toBe("medium");
    expect(budgetPriority("$50M - $100M COP")).toBe("low");
  });

  test("valida estados y prioridades", () => {
    for (const status of LEAD_STATUSES) expect(isLeadStatus(status)).toBe(true);
    for (const priority of LEAD_PRIORITIES) expect(isLeadPriority(priority)).toBe(true);
    expect(isLeadStatus("unknown")).toBe(false);
    expect(isLeadPriority("urgent")).toBe(false);
  });
});
