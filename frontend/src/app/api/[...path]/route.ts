import { NextRequest } from 'next/server';
import { routeRequest } from '@/lib/server/apiRouter';

type RouteContext = { params: { path: string[] } };

async function handler(req: NextRequest, { params }: RouteContext) {
  return routeRequest(req, params.path);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
