import type { Application, Request, Response } from "express";
import * as http from "http";
import { saveBrandInfo, getBrandInfo, updateAudienceInfo, updateOffersInfo, updateVisualAssetsInfo, updateBrandReviewsInfo, updateBrandInfo, patchBrandInfo, type BrandInfo, type AudienceInfo, type OffersInfo, type VisualAssetsInfo, type BrandReviewsInfo } from "./briefInfo.js";
import { analyzeUploadHandler } from './analyzeUpload.js';
import { generateBriefSummaryHandler } from './aiBriefSummary.js';
import reviewAnalysisRouter from './reviewAnalysis.js';
import { generateBriefDocx } from './services/docxBriefGenerator.js';

console.log('[Startup] reviewAnalysis router loaded');

// Helper for async error handling
const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export async function registerRoutes(app: Application): Promise<http.Server> {
  app.use('/api/brand-reviews', reviewAnalysisRouter);

  // TEMPORARILY DISABLED - Visual Strategy Analysis
  // app.post('/api/visual-assets/analyze', analyzeVisualAssetsHandler);

  app.post('/api/analyze-upload', asyncHandler(analyzeUploadHandler));

  app.post("/api/briefs/save-section", asyncHandler(async (req: Request, res: Response) => {
    const { section, briefId, ...fields } = req.body || {};
    const fs = require('fs');
    const path = require('path');
    const BRIEFS_DIR = path.join(__dirname, 'briefs');

    // If briefId is provided and file does not exist, create it
    if (briefId) {
      const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
      if (!fs.existsSync(filePath)) {
        // Create initial brief file with minimal structure
        fs.writeFileSync(filePath, JSON.stringify({ briefId, createdAt: new Date().toISOString() }, null, 2), 'utf-8');
      }
    }

    if (section === "audience") {
      const audience: AudienceInfo = {
        ageRange: fields.ageRange,
        gender: fields.gender,
        customerPainPoints: fields.customerPainPoints,
        emotionsToAlignWith: fields.emotionsToAlignWith,
        audienceValuesAndBeliefs: fields.audienceValuesAndBeliefs,
        habitsAndDemographics: fields.habitsAndDemographics,
      };
      if (!audience.ageRange || !audience.customerPainPoints) {
        return res.status(400).json({ error: "Missing required audience fields." });
      }
      if (!briefId || typeof briefId !== "string") {
        return res.status(400).json({ error: "Missing or invalid briefId." });
      }
      const updated = updateAudienceInfo(briefId, audience);
      if (!updated) return res.status(404).json({ error: "Brief not found." });
      return res.json({ success: true, briefId });
    }

    if (section === "offers") {
      if (!briefId || typeof briefId !== "string") {
        return res.status(400).json({ error: "Missing or invalid briefId." });
      }
      const { mainOffer, usps, selectedFormats, enableDiversityOverrides } = fields;
      if (!mainOffer || !Array.isArray(usps) || usps.length < 3) {
        return res.status(400).json({ error: "Missing required fields for offers." });
      }
      const offers: OffersInfo = { mainOffer, usps, selectedFormats, enableDiversityOverrides };
      const updated = updateOffersInfo(briefId, offers);
      if (!updated) return res.status(404).json({ error: "Brief not found or validation failed." });
      return res.json({ success: true, briefId });
    }

    if (section === "visualAssets") {
      if (!briefId || typeof briefId !== "string") {
        return res.status(400).json({ error: "Missing or invalid briefId." });
      }
      const { images, videos } = fields;
      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ error: "Missing required images array." });
      }
      const visualAssets: VisualAssetsInfo = { images, videos };
      const updated = updateVisualAssetsInfo(briefId, visualAssets);
      if (!updated) return res.status(404).json({ error: "Brief not found." });
      return res.json({ success: true, briefId });
    }

    if (section === "brandReviews") {
      const { reviews } = fields;
      if (!briefId || typeof briefId !== "string") {
        return res.status(400).json({ error: "Missing or invalid briefId." });
      }
      if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
        return res.status(400).json({ error: "Missing required reviews array." });
      }
      const brandReviews: BrandReviewsInfo = { reviews };
      const updated = updateBrandReviewsInfo(briefId, brandReviews);
      if (!updated) return res.status(404).json({ error: "Brief not found." });
      return res.json({ success: true, briefId });
    }

    // Default: Save Brand Info
    const { clientName, industry, productUrl, productList, brandGuidelines } = fields;
    const missingFields: string[] = [];
    if (!clientName) missingFields.push("clientName");
    if (!industry) missingFields.push("industry");
    if (!productUrl) missingFields.push("productUrl");
    if (!productList) missingFields.push("productList");

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required field(s): ${missingFields.join(", ")}` });
    }

    const data: BrandInfo = {
      clientName,
      industry,
      productUrl,
      productList,
      brandGuidelines: brandGuidelines || ""
    };
    const newBriefId = saveBrandInfo(data);
    return res.json({ success: true, briefId: newBriefId });
  }));

  app.post('/api/briefs/:id/generate-summary', asyncHandler(generateBriefSummaryHandler));

  app.put("/api/briefs/:id", asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = updateBrandInfo(id, req.body);
    if (!updated) return res.status(404).json({ error: "Brand Info not found." });
    return res.json({ success: true, briefId: id });
  }));

  app.patch("/api/briefs/:id", asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`[PATCH] /api/briefs/${id} | Body:`, JSON.stringify(req.body));
    const updated = patchBrandInfo(id, req.body);
    if (!updated) {
      console.warn(`[PATCH] /api/briefs/${id} | 404 Not Found`);
      return res.status(404).json({ error: "Brand Info not found." });
    }
    console.log(`[PATCH] /api/briefs/${id} | Success`);
    return res.json({ success: true, briefId: id });
  }));

  app.get("/api/briefs/:id", asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = getBrandInfo(id);
    if (!data) return res.status(404).json({ error: "Brand Info not found." });
    return res.json(data);
  }));

  app.get("/api/briefs/:id/summary", asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = getBrandInfo(id);
    if (!data) return res.status(404).json({ error: "Brief not found." });
    return res.json({ summary: data });
  }));

  app.get('/api/briefs/:id/download-docx', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const buffer = await generateBriefDocx(id);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename=Creative_Brief_${id}.docx`);
    res.send(buffer);
  }));

  // Fallback 404 for unmatched routes
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found." });
  });

  const httpServer = http.createServer(app);
  return httpServer;
}
