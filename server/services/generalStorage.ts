import * as fs from 'fs';
import * as path from 'path';

const BRIEFS_DIR = path.join(process.cwd(), 'server', 'briefs');

export async function saveReviewInsights(briefId: string, insights: string) {
  const filePath = path.join(BRIEFS_DIR, `${briefId}.json`);
  if (!fs.existsSync(filePath)) return false;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!data.aiSummaries) data.aiSummaries = [];
  data.aiSummaries.push({ fileName: 'Review Insights', summary: insights });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  return true;
}

