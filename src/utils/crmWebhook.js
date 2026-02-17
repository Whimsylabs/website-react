/**
 * CRM Webhook Utility
 * 
 * Sends form submissions to the WhimsyLabs CRM.
 * This is a fire-and-forget operation - it should not block form submission
 * or cause errors if the CRM is unavailable.
 */

const CRM_WEBHOOK_URL = process.env.REACT_APP_CRM_WEBHOOK_URL || 'http://localhost:8001/api/webhooks/form';

// Timeout for CRM requests (don't block forms for too long)
const CRM_TIMEOUT_MS = 5000;

/**
 * Send form data to the CRM webhook
 * 
 * @param {Object} options
 * @param {string} options.form_type - Type of form: 'demo_request', 'contact', 'trial_request', 'partnership', 'newsletter'
 * @param {string} options.email - Contact email (required)
 * @param {string} [options.first_name] - First name
 * @param {string} [options.last_name] - Last name
 * @param {string} [options.company] - Company/School name
 * @param {string} [options.job_title] - Role/Job title
 * @param {string} [options.phone] - Phone number
 * @param {string} [options.message] - Message content
 * @param {Object} [options.metadata] - Additional form-specific data
 * @returns {Promise<boolean>} - true if successful, false if failed (never throws)
 */
export async function sendToCRM({
  form_type,
  email,
  first_name,
  last_name,
  company,
  job_title,
  phone,
  message,
  metadata = {}
}) {
  // Don't send if no email (invalid submission)
  if (!email) {
    console.warn('CRM webhook: No email provided, skipping');
    return false;
  }

  const payload = {
    form_type,
    email,
    first_name,
    last_name,
    company,
    job_title,
    phone,
    message,
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    source_page: typeof window !== 'undefined' ? window.location.pathname : '',
    submitted_at: new Date().toISOString(),
    ...metadata
  };

  // Remove undefined/null values
  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined || payload[key] === null || payload[key] === '') {
      delete payload[key];
    }
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CRM_TIMEOUT_MS);

    const response = await fetch(CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      console.log('CRM webhook: Form data sent successfully');
      return true;
    } else {
      console.warn('CRM webhook: Server returned', response.status);
      return false;
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('CRM webhook: Request timed out');
    } else {
      console.warn('CRM webhook: Failed to send', error.message);
    }
    // Never throw - CRM errors should not affect the user experience
    return false;
  }
}

/**
 * Helper to parse a full name into first/last name
 * @param {string} fullName 
 * @returns {{first_name: string, last_name: string}}
 */
export function parseFullName(fullName) {
  if (!fullName) return { first_name: '', last_name: '' };
  const parts = fullName.trim().split(/\s+/);
  return {
    first_name: parts[0] || '',
    last_name: parts.slice(1).join(' ') || ''
  };
}

export default sendToCRM;
