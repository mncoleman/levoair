/**
 * Web Vitals Tracking for Google Analytics
 *
 * This module tracks Core Web Vitals and sends them to Google Analytics 4.
 * These metrics are important for SEO and user experience.
 *
 * Core Web Vitals tracked:
 * - LCP (Largest Contentful Paint) - Loading performance
 * - FID (First Input Delay) - Interactivity
 * - CLS (Cumulative Layout Shift) - Visual stability
 * - FCP (First Contentful Paint) - Initial render
 * - TTFB (Time to First Byte) - Server response time
 * - INP (Interaction to Next Paint) - Responsiveness
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';
import { isAnalyticsAvailable } from './analytics';

/**
 * Web Vitals rating thresholds (Google's recommended values)
 */
const VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 }
};

/**
 * Get performance rating based on value and thresholds
 */
const getRating = (
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = VITALS_THRESHOLDS[name as keyof typeof VITALS_THRESHOLDS];

  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
};

/**
 * Send metric to Google Analytics
 */
const sendToAnalytics = (metric: Metric) => {
  if (!isAnalyticsAvailable()) {
    console.warn('[Web Vitals] Google Analytics not available, metric not sent:', metric.name);
    return;
  }

  // Get the rating for this metric
  const rating = getRating(metric.name, metric.value);

  // Round the value to avoid too much precision
  const value = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);

  // Send to GA4 as an event
  try {
    window.gtag!('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: value,
      metric_value: value,
      metric_delta: Math.round(metric.delta),
      metric_rating: rating,
      non_interaction: true, // Don't affect bounce rate
    });

    console.log(
      `[Web Vitals] ${metric.name}: ${value}${metric.name === 'CLS' ? ' (x1000)' : 'ms'} - ${rating}`
    );
  } catch (error) {
    console.error('[Web Vitals] Error sending metric to Analytics:', error);
  }
};

/**
 * Initialize Web Vitals tracking
 *
 * This function should be called once in your app's entry point (main.tsx).
 * It will automatically track all Core Web Vitals and send them to GA4.
 *
 * @example
 * import { initWebVitals } from '@/lib/webVitals';
 * initWebVitals();
 */
export const initWebVitals = (): void => {
  // Only track in production to avoid cluttering analytics with dev data
  if (import.meta.env.DEV) {
    console.log('[Web Vitals] Skipping in development mode');
    return;
  }

  if (!isAnalyticsAvailable()) {
    console.warn('[Web Vitals] Google Analytics not loaded, Web Vitals tracking disabled');
    return;
  }

  try {
    // Track Largest Contentful Paint (LCP)
    // Measures loading performance. Good LCP is 2.5s or less.
    onLCP(sendToAnalytics);

    // Track First Input Delay (FID) - deprecated, but still tracked
    // Measures interactivity. Good FID is 100ms or less.
    // Note: FID is being replaced by INP, but we track both for now

    // Track Interaction to Next Paint (INP)
    // Measures overall responsiveness. Good INP is 200ms or less.
    onINP(sendToAnalytics);

    // Track Cumulative Layout Shift (CLS)
    // Measures visual stability. Good CLS is 0.1 or less.
    onCLS(sendToAnalytics);

    // Track First Contentful Paint (FCP)
    // Measures time to first render. Good FCP is 1.8s or less.
    onFCP(sendToAnalytics);

    // Track Time to First Byte (TTFB)
    // Measures server response time. Good TTFB is 800ms or less.
    onTTFB(sendToAnalytics);

    console.log('[Web Vitals] Tracking initialized');
  } catch (error) {
    console.error('[Web Vitals] Error initializing tracking:', error);
  }
};

/**
 * Get a performance report for debugging
 * This can be useful in development or for creating custom dashboards
 */
export const getPerformanceReport = async (): Promise<{
  LCP?: number;
  FCP?: number;
  CLS?: number;
  TTFB?: number;
  INP?: number;
}> => {
  return new Promise((resolve) => {
    const report: any = {};

    onLCP((metric) => (report.LCP = metric.value));
    onFCP((metric) => (report.FCP = metric.value));
    onCLS((metric) => (report.CLS = metric.value));
    onTTFB((metric) => (report.TTFB = metric.value));
    onINP((metric) => (report.INP = metric.value));

    // Wait a bit for metrics to be collected
    setTimeout(() => resolve(report), 3000);
  });
};

/**
 * Log Web Vitals to console for debugging
 * Useful during development to see performance metrics
 */
export const debugWebVitals = (): void => {
  onLCP((metric) => console.log('LCP:', metric));
  onFCP((metric) => console.log('FCP:', metric));
  onCLS((metric) => console.log('CLS:', metric));
  onTTFB((metric) => console.log('TTFB:', metric));
  onINP((metric) => console.log('INP:', metric));
};

export default {
  initWebVitals,
  getPerformanceReport,
  debugWebVitals
};
