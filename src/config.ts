import { config } from 'dotenv';

config();

export const AUTH_SECRET = process.env.AUTH_SECRET;
export const API_HOST = process.env.API_HOST;

export const API_PASSWORD = process.env.API_PASSWORD;

export const LAGO_API_HOST = process.env.LAGO_API_HOST;
export const LAGO_API_KEY = process.env.LAGO_API_KEY;
export const SMALL_PLAN_LIMIT = process.env.SMALL_PLAN_LIMIT;
export const MEDIUM_PLAN_LIMIT = process.env.MEDIUM_PLAN_LIMIT;
export const LARGE_PLAN_LIMIT = process.env.LARGE_PLAN_LIMIT;
export const SMALL_PLAN_PRICE = process.env.SMALL_PLAN_PRICE;
export const MEDIUM_PLAN_PRICE = process.env.MEDIUM_PLAN_PRICE;
export const LARGE_PLAN_PRICE = process.env.LARGE_PLAN_PRICE;
export const SUBSCRIPTION_PAY_ADDRESS = process.env.SUBSCRIPTION_PAY_ADDRESS;
export const USE_SSL = process.env.USE_SSL;
export const USE_SIA_CENTRAL = process.env.USE_SIA_CENTRAL;
