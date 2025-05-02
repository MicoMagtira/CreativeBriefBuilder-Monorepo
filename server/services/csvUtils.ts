import { parse } from 'csv-parse/sync';

/**
 * Attempts to auto-detect columns containing reviews and product names from a CSV string.
 * Returns an array of objects with only those columns, or all columns if detection fails.
 */
export function extractReviewAndProductColumns(csvString: string): { headers: string[], rows: string[][] } {
  // Parse CSV
  const records = parse(csvString, { skip_empty_lines: true });
  if (!records.length) return { headers: [], rows: [] };

  const headers = records[0].map((h: string) => h.trim().toLowerCase());
  const reviewColIdx = headers.findIndex((h: string) => /review|feedback|comment|testimonial/.test(h));
  const productColIdx = headers.findIndex((h: string) => /product|item|sku|name/.test(h));

  // If neither found, return all columns (fallback)
  if (reviewColIdx === -1 && productColIdx === -1) {
    return { headers: records[0], rows: records.slice(1) };
  }

  // Build new headers and rows with only detected columns
  const newHeaders = [];
  const colIdxs: number[] = [];
  if (productColIdx !== -1) { newHeaders.push(records[0][productColIdx]); colIdxs.push(productColIdx); }
  if (reviewColIdx !== -1 && reviewColIdx !== productColIdx) { newHeaders.push(records[0][reviewColIdx]); colIdxs.push(reviewColIdx); }

  const newRows = records.slice(1).map((row: string[]) => colIdxs.map(idx => row[idx] || ''));
  return { headers: newHeaders, rows: newRows };
}
