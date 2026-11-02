import { describe, it, expect } from "vitest";
import { detectProvince, detectCategory, detectCidbGrading } from "../src/lib/scraper";

describe("TenderPulse Scraper & Natural Language Processing Engine", () => {
  describe("detectProvince", () => {
    it("should recognize explicit province names", () => {
      expect(detectProvince("Tender for Eastern Cape Department of Health")).toBe("Eastern Cape");
      expect(detectProvince("Road construction in Western Cape provincial corridor")).toBe("Western Cape");
      expect(detectProvince("KwaZulu-Natal school infrastructure revamp")).toBe("KwaZulu-Natal");
      expect(detectProvince("Gauteng provincial treasury advisory")).toBe("Gauteng");
      expect(detectProvince("Limpopo water reticulation")).toBe("Limpopo");
      expect(detectProvince("Mpumalanga hospital maintenance")).toBe("Mpumalanga");
      expect(detectProvince("North West sanitation refurbishment")).toBe("North West");
      expect(detectProvince("Northern Cape renewable energy park")).toBe("Northern Cape");
      expect(detectProvince("Free State agricultural development")).toBe("Free State");
    });

    it("should infer provinces from major South African cities and metropolitan areas", () => {
      expect(detectProvince("Supply of PPE in Gqeberha central clinic")).toBe("Eastern Cape");
      expect(detectProvince("Refurbishment of East London harbour offices")).toBe("Eastern Cape");
      expect(detectProvince("Mthatha general hospital medical supplies")).toBe("Eastern Cape");
      expect(detectProvince("Bisho administrative complex HVAC maintenance")).toBe("Eastern Cape");

      expect(detectProvince("Johannesburg Water pump maintenance")).toBe("Gauteng");
      expect(detectProvince("City of Tshwane IT infrastructure")).toBe("Gauteng");
      expect(detectProvince("Sandton substation circuit breakers")).toBe("Gauteng");

      expect(detectProvince("Durban municipal port terminal security")).toBe("KwaZulu-Natal");
      expect(detectProvince("eThekwini water works engineering")).toBe("KwaZulu-Natal");

      expect(detectProvince("City of Cape Town stormwater canal clearing")).toBe("Western Cape");
      expect(detectProvince("Stellenbosch municipal fleet lease")).toBe("Western Cape");

      expect(detectProvince("Mangaung metro waste removal")).toBe("Free State");
      expect(detectProvince("Polokwane bypass civil road construction")).toBe("Limpopo");
      expect(detectProvince("Mbombela provincial stadium turf care")).toBe("Mpumalanga");
      expect(detectProvince("Rustenburg municipal transformer upgrades")).toBe("North West");
      expect(detectProvince("Kimberley diamond valley water supply")).toBe("Northern Cape");
    });

    it("should fallback to National (Countrywide) for generic national entities", () => {
      expect(detectProvince("Transnet national rail freight tenders")).toBe("National (Countrywide)");
      expect(detectProvince("Eskom primary power generation procurement")).toBe("National (Countrywide)");
    });
  });

  describe("detectCategory", () => {
    it("should accurately classify construction tenders", () => {
      expect(detectCategory("Construction of 40km asphalt surfaced road")).toBe("Construction & Infrastructure");
      expect(detectCategory("Civil engineering works for flood protection")).toBe("Construction & Infrastructure");
      expect(detectCategory("Building renovation and roofing replacement")).toBe("Construction & Infrastructure");
    });

    it("should accurately classify ICT tenders", () => {
      expect(detectCategory("Supply and installation of ICT network servers")).toBe("IT & Technology");
      expect(detectCategory("Software development for revenue management")).toBe("IT & Technology");
      expect(detectCategory("Cyber security perimeter defense system")).toBe("IT & Technology");
    });

    it("should accurately classify PPE and workwear tenders", () => {
      expect(detectCategory("Supply and delivery of PPE for field workers")).toBe("PPE & Workwear");
      expect(detectCategory("Procurement of protective clothing and safety boots")).toBe("PPE & Workwear");
    });

    it("should accurately classify security and guarding services", () => {
      expect(detectCategory("Provision of 24/7 security guarding and access control")).toBe("Security & Guarding Services");
      expect(detectCategory("Installation of CCTV surveillance and PSIRA armed guards")).toBe("Security & Guarding Services");
    });

    it("should accurately classify cleaning and waste management", () => {
      expect(detectCategory("Deep cleaning and hygiene services for municipal offices")).toBe("Cleaning & Waste Management");
      expect(detectCategory("Integrated solid waste collection and sanitation")).toBe("Cleaning & Waste Management");
    });
  });

  describe("detectCidbGrading", () => {
    it("should extract valid CIDB contractor grading and class designations", () => {
      expect(detectCidbGrading("Tender requires CIDB 7CE or higher")).toBe("7CE");
      expect(detectCidbGrading("Contractor must be registered as 1GB")).toBe("1GB");
      expect(detectCidbGrading("Invitation to bid: 9CE Highway expansion")).toBe("9CE");
      expect(detectCidbGrading("Subcontracting opportunity for 4ME mechanical engineer")).toBe("4ME");
      expect(detectCidbGrading("Electrical works: 6EE certification required")).toBe("6EE");
    });

    it("should return undefined when no CIDB grading is specified", () => {
      expect(detectCidbGrading("Supply and delivery of stationary paper")).toBeUndefined();
      expect(detectCidbGrading("Auditing and accounting advisory services")).toBeUndefined();
    });
  });
});
