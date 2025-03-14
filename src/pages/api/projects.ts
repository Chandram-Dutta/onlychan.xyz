import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = ({ params, request }) => {
    const filePath = path.resolve('src/assets/projects.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return new Response(jsonData);
} 