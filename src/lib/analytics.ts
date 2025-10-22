/**
 * Google Analytics 4 Utilities
 *
 * This module provides type-safe utilities for tracking events and conversions
 * in Google Analytics 4.
 */

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Standard event parameters for GA4
 */
export interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Custom event types for the LevoAir website
 */
export type CustomEvent =
  | 'page_view'
  | 'cta_click'
  | 'contact_form_submit'
  | 'contact_form_success'
  | 'contact_form_error'
  | 'navigation_click'
  | 'portfolio_view'
  | 'service_view'
  | 'gallery_image_click'
  | 'gallery_image_open'
  | 'hero_cta_click'
  | 'footer_link_click'
  | 'social_media_click'
  | 'phone_click'
  | 'email_click';

/**
 * Check if Google Analytics is loaded
 */
export const isAnalyticsAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track a custom event in Google Analytics
 *
 * @param eventName - Name of the event to track
 * @param params - Additional parameters for the event
 *
 * @example
 * trackEvent('cta_click', {
 *   event_category: 'engagement',
 *   event_label: 'hero_cta',
 *   value: 1
 * });
 */
export const trackEvent = (
  eventName: CustomEvent | string,
  params?: EventParams
): void => {
  if (!isAnalyticsAvailable()) {
    console.warn('[Analytics] Google Analytics not loaded, event not tracked:', eventName);
    return;
  }

  try {
    window.gtag!('event', eventName, params);
    console.log('[Analytics] Event tracked:', eventName, params);
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

/**
 * Track page view (for SPA navigation)
 *
 * @param path - The page path
 * @param title - The page title
 *
 * @example
 * trackPageView('/about', 'About Us');
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!isAnalyticsAvailable()) {
    return;
  }

  try {
    window.gtag!('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
    console.log('[Analytics] Page view tracked:', path, title);
  } catch (error) {
    console.error('[Analytics] Error tracking page view:', error);
  }
};

/**
 * Track CTA button clicks
 *
 * @param ctaLabel - Label identifying which CTA was clicked
 * @param ctaLocation - Where the CTA is located (hero, footer, etc.)
 *
 * @example
 * trackCTAClick('Get Started', 'hero_section');
 */
export const trackCTAClick = (ctaLabel: string, ctaLocation: string): void => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaLabel,
    cta_location: ctaLocation
  });
};

/**
 * Track form submissions
 *
 * @param formName - Name of the form
 * @param success - Whether the submission was successful
 * @param errorMessage - Error message if submission failed
 *
 * @example
 * trackFormSubmission('contact', true);
 */
export const trackFormSubmission = (
  formName: string,
  success: boolean,
  errorMessage?: string
): void => {
  const eventName = success ? 'contact_form_success' : 'contact_form_error';

  trackEvent(eventName, {
    event_category: 'forms',
    event_label: formName,
    form_name: formName,
    success,
    ...(errorMessage && { error_message: errorMessage })
  });
};

/**
 * Track navigation clicks
 *
 * @param linkText - Text of the navigation link
 * @param destination - Where the link goes
 *
 * @example
 * trackNavigation('About', '/about');
 */
export const trackNavigation = (linkText: string, destination: string): void => {
  trackEvent('navigation_click', {
    event_category: 'navigation',
    event_label: linkText,
    link_destination: destination
  });
};

/**
 * Track outbound links (external websites)
 *
 * @param url - The external URL
 * @param linkText - Text of the link
 *
 * @example
 * trackOutboundLink('https://example.com', 'Visit Partner Site');
 */
export const trackOutboundLink = (url: string, linkText?: string): void => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: linkText || url,
    outbound_url: url,
    transport_type: 'beacon'
  });
};

/**
 * Track file downloads
 *
 * @param fileName - Name of the file
 * @param fileUrl - URL of the file
 *
 * @example
 * trackDownload('brochure.pdf', '/files/brochure.pdf');
 */
export const trackDownload = (fileName: string, fileUrl: string): void => {
  trackEvent('file_download', {
    event_category: 'downloads',
    event_label: fileName,
    file_name: fileName,
    file_url: fileUrl
  });
};

/**
 * Track user interactions with the gallery
 *
 * @param action - Type of interaction (view, click, open)
 * @param imageId - Identifier for the image
 *
 * @example
 * trackGalleryInteraction('image_open', 'aerial-view-123');
 */
export const trackGalleryInteraction = (
  action: 'view' | 'click' | 'open',
  imageId?: string
): void => {
  trackEvent(`gallery_image_${action}`, {
    event_category: 'gallery',
    event_label: action,
    ...(imageId && { image_id: imageId })
  });
};

/**
 * Track service page views
 *
 * @param serviceTitle - Title of the service
 *
 * @example
 * trackServiceView('Aerial Photography');
 */
export const trackServiceView = (serviceTitle: string): void => {
  trackEvent('service_view', {
    event_category: 'content',
    event_label: serviceTitle,
    service_title: serviceTitle
  });
};

/**
 * Track contact method clicks (phone, email)
 *
 * @param method - Contact method (phone or email)
 * @param value - The phone number or email address
 *
 * @example
 * trackContactClick('phone', '555-1234');
 */
export const trackContactClick = (method: 'phone' | 'email', value: string): void => {
  trackEvent(`${method}_click`, {
    event_category: 'contact',
    event_label: method,
    contact_method: method,
    contact_value: value
  });
};

/**
 * Track social media link clicks
 *
 * @param platform - Social media platform name
 * @param url - URL of the social profile
 *
 * @example
 * trackSocialClick('LinkedIn', 'https://linkedin.com/company/levoair');
 */
export const trackSocialClick = (platform: string, url: string): void => {
  trackEvent('social_media_click', {
    event_category: 'social',
    event_label: platform,
    social_platform: platform,
    social_url: url
  });
};

/**
 * Set user properties for enhanced tracking
 *
 * @param properties - User properties to set
 *
 * @example
 * setUserProperties({ user_type: 'returning_visitor' });
 */
export const setUserProperties = (properties: Record<string, any>): void => {
  if (!isAnalyticsAvailable()) {
    return;
  }

  try {
    window.gtag!('set', 'user_properties', properties);
    console.log('[Analytics] User properties set:', properties);
  } catch (error) {
    console.error('[Analytics] Error setting user properties:', error);
  }
};

/**
 * Track scroll depth (useful for engagement metrics)
 *
 * @param percentage - Scroll depth percentage (25, 50, 75, 100)
 * @param pagePath - The page being scrolled
 *
 * @example
 * trackScrollDepth(50, '/about');
 */
export const trackScrollDepth = (percentage: number, pagePath: string): void => {
  trackEvent('scroll', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    scroll_depth: percentage,
    page_path: pagePath
  });
};

// Export all utilities
export default {
  isAnalyticsAvailable,
  trackEvent,
  trackPageView,
  trackCTAClick,
  trackFormSubmission,
  trackNavigation,
  trackOutboundLink,
  trackDownload,
  trackGalleryInteraction,
  trackServiceView,
  trackContactClick,
  trackSocialClick,
  setUserProperties,
  trackScrollDepth
};
