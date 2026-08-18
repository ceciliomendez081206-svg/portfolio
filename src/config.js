export default {
  analytics: {
    provider: 'plausible', // 'plausible' or 'ga' or null
    domain: '', // set to your domain (e.g., 'example.com') to enable Plausible
    gaMeasurementId: '', // set if using Google Analytics (G-...)
  },
  feedback: {
    endpoint: '/api/feedback', // optional: POST endpoint to send feedback JSON {name,email,message}
    storeLocal: true, // store feedback in localStorage when endpoint is not provided
  },
}
