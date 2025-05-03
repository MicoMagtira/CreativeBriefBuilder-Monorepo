import * as fs from "node:fs";
import * as path from "node:path";
import { v4 as uuidv4 } from "uuid";

export interface AudienceInfo {
  ageRange: string;
  gender?: Array<"Male" | "Female">;
  customerPainPoints: string;
  emotionsToAlignWith?: string;
  audienceValuesAndBeliefs?: string;
  habitsAndDemographics?: string;
}

export interface OffersInfo {
  mainOffer: string;
  usps: string[];
  selectedFormats?: Record<string, boolean>;
  enableDiversityOverrides?: boolean;
}

export interface VisualAssetsInfo {
  images: string[];
  videos?: string[];
}

export interface BrandReviewsInfo {
  reviews: string[];
}

export interface AISummary {
  fileName: string;
  summary: string;
}

export interface BrandInfo {
  clientName: string;
  industry: string;
  productUrl: string;
  productList: string;
  brandGuidelines?: string;
  audience?: AudienceInfo;
  offers?: OffersInfo;
  visualAssets?: VisualAssetsInfo;
  brandReviews?: BrandReviewsInfo;
  aiSummaries?: AISummary[];
}

const BRIEFS_DIR = path.join(process.cwd(), "server", "briefs");

export function ensureBriefsDir(): void {
  if (!fs.existsSync(BRIEFS_DIR)) {
    fs.mkdirSync(BRIEFS_DIR, { recursive: true });
  }
}

function validateBrandInfo(data: Partial<BrandInfo>): string | null {
  const required = ["clientName", "industry", "productUrl", "productList"];
  const missing = required.filter((k) => !(data as any)[k]);
  if (missing.length > 0) return `Missing required field(s): ${missing.join(", ")}`;
  // Simple URL validation
  const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i;
  if (!urlPattern.test(data.productUrl || "")) return "Invalid productUrl format.";
  return null;
}

export function saveBrandInfo(data: BrandInfo): string {
  const validationError = validateBrandInfo(data);
  if (validationError) throw new Error(validationError);
  ensureBriefsDir();
  const briefId = uuidv4();
  const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  return briefId;
}

// Full update (PUT)
export function updateBrandInfo(briefId: string, data: BrandInfo): boolean {
  const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
  if (!fs.existsSync(filePath)) return false;
  const validationError = validateBrandInfo(data);
  if (validationError) throw new Error(validationError);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  return true;
}

// Partial update (PATCH)
export function patchBrandInfo(briefId: string, patch: Partial<BrandInfo>): boolean {
  const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
  if (!fs.existsSync(filePath)) return false;
  const current = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const updated = { ...current, ...patch };
  const validationError = validateBrandInfo(updated);
  if (validationError) throw new Error(validationError);
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
  return true;
}

export function updateAudienceInfo(briefId: string, audience: AudienceInfo): boolean {
  try {
    ensureBriefsDir();
    const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
    console.log(`[updateAudienceInfo] File path: ${filePath}`);
    if (!fs.existsSync(filePath)) {
      // Auto-create file with minimal structure
      fs.writeFileSync(filePath, JSON.stringify({ briefId, createdAt: new Date().toISOString() }, null, 2), 'utf-8');
      console.log(`[updateAudienceInfo] File auto-created.`);
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as BrandInfo;
    data.audience = audience;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`[updateAudienceInfo] Error:`, err);
    return false;
  }
}

export function updateOffersInfo(briefId: string, offers: OffersInfo): boolean {
  try {
    ensureBriefsDir();
    const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
    console.log(`[updateOffersInfo] File path: ${filePath}`);
    if (!fs.existsSync(filePath)) {
      // Auto-create file with minimal structure
      fs.writeFileSync(filePath, JSON.stringify({ briefId, createdAt: new Date().toISOString() }, null, 2), 'utf-8');
      console.log(`[updateOffersInfo] File auto-created.`);
    }
    // Validation
    if (!offers.mainOffer || !Array.isArray(offers.usps) || offers.usps.length < 3) {
      console.error(`[updateOffersInfo] Invalid offers payload.`);
      return false;
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as BrandInfo;
    data.offers = offers;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`[updateOffersInfo] Error:`, err);
    return false;
  }
}

export function updateVisualAssetsInfo(briefId: string, visualAssets: VisualAssetsInfo): boolean {
  try {
    ensureBriefsDir();
    const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
    console.log(`[updateVisualAssetsInfo] File path: ${filePath}`);
    if (!fs.existsSync(filePath)) {
      // Auto-create file with minimal structure
      fs.writeFileSync(filePath, JSON.stringify({ briefId, createdAt: new Date().toISOString() }, null, 2), 'utf-8');
      console.log(`[updateVisualAssetsInfo] File auto-created.`);
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as BrandInfo;
    data.visualAssets = visualAssets;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`[updateVisualAssetsInfo] Error:`, err);
    return false;
  }
}

export function updateBrandReviewsInfo(briefId: string, brandReviews: BrandReviewsInfo): boolean {
  try {
    ensureBriefsDir();
    const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
    console.log(`[updateBrandReviewsInfo] File path: ${filePath}`);
    if (!fs.existsSync(filePath)) {
      // Auto-create file with minimal structure
      fs.writeFileSync(filePath, JSON.stringify({ briefId, createdAt: new Date().toISOString() }, null, 2), 'utf-8');
      console.log(`[updateBrandReviewsInfo] File auto-created.`);
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as BrandInfo;
    data.brandReviews = brandReviews;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`[updateBrandReviewsInfo] Error:`, err);
    return false;
  }
}

export async function addSummaryToBrief(briefId: string, summary: string, fileName = ''): Promise<void> {
  ensureBriefsDir();
  const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as BrandInfo;
  if (!data.aiSummaries) data.aiSummaries = [];
  data.aiSummaries.push({ fileName, summary });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getBrandInfo(briefId: string): BrandInfo | null {
  const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
  if (!fs.existsSync(filePath)) return null;
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as BrandInfo;
  return data;
}
