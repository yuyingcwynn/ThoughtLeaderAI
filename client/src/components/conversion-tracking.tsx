import { useEffect } from 'react';
import { trackEvent, trackConversion } from '@/lib/google-analytics';

interface ConversionTrackingProps {
  eventType: 'contact_form' | 'consultation_booking' | 'assessment_completion' | 'service_inquiry';
  value?: number;
  currency?: string;
}

export function ConversionTracking({ eventType, value, currency = 'USD' }: ConversionTrackingProps) {
  useEffect(() => {
    const trackConversionEvent = () => {
      switch (eventType) {
        case 'contact_form':
          trackEvent('form_submit', 'engagement', 'contact_form');
          trackConversion('contact_form_submit', value);
          break;
        case 'consultation_booking':
          trackEvent('booking', 'conversion', 'consultation_booking');
          trackConversion('consultation_booking', value);
          break;
        case 'assessment_completion':
          trackEvent('assessment_complete', 'engagement', 'ai_readiness_assessment');
          trackConversion('assessment_completion', value);
          break;
        case 'service_inquiry':
          trackEvent('service_inquiry', 'engagement', 'service_page');
          trackConversion('service_inquiry', value);
          break;
      }
    };

    trackConversionEvent();
  }, [eventType, value, currency]);

  return null;
}

// Enhanced conversion tracking for specific actions
export const ConversionEvents = {
  trackContactFormSubmit: (formData: any) => {
    trackEvent('contact_form_submit', 'conversion', 'lead_generation');
    
    // Enhanced ecommerce tracking for service inquiries
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        currency: 'USD',
        value: 1000, // Estimated lead value
        items: [{
          item_id: 'contact_inquiry',
          item_name: 'AI Consulting Inquiry',
          category: 'Lead Generation',
          quantity: 1,
        }]
      });
    }
  },

  trackConsultationBooking: (packageType: string, amount: number) => {
    trackEvent('consultation_booking', 'conversion', packageType);
    
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: Date.now().toString(),
        value: amount,
        currency: 'USD',
        items: [{
          item_id: packageType,
          item_name: `AI Consultation - ${packageType}`,
          category: 'Consulting Services',
          quantity: 1,
          price: amount
        }]
      });
    }
  },

  trackAssessmentCompletion: (score: number) => {
    trackEvent('assessment_complete', 'engagement', 'ai_readiness');
    
    if (window.gtag) {
      window.gtag('event', 'level_up', {
        level: score,
        character: 'ai_readiness_score'
      });
    }
  },

  trackPageEngagement: (pageName: string, timeOnPage: number) => {
    if (timeOnPage > 30) { // Only track if user spent more than 30 seconds
      trackEvent('engaged_session', 'engagement', pageName, timeOnPage);
    }
  },

  trackDownload: (resourceName: string) => {
    trackEvent('file_download', 'engagement', resourceName);
    
    if (window.gtag) {
      window.gtag('event', 'select_content', {
        content_type: 'download',
        item_id: resourceName
      });
    }
  },

  trackVideoPlay: (videoTitle: string) => {
    trackEvent('video_play', 'engagement', videoTitle);
  },

  trackExternalLink: (url: string, linkText: string) => {
    trackEvent('external_link_click', 'engagement', linkText);
    
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'outbound',
        event_label: url,
        transport_type: 'beacon'
      });
    }
  }
};