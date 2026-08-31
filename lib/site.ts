export const REPO_URL = 'https://github.com/jamdesk/utilities'
export const LICENSE_URL = 'https://www.apache.org/licenses/LICENSE-2.0'
export const ORG_URL = 'https://www.jamdesk.com'
export const ORG_NAME = 'Jamdesk'

export const SIGNUP_URL = 'https://dashboard.jamdesk.com/signup'

/**
 * Signup link for a utilities page.
 *
 * `from` carries the PATHNAME, matching marketing's getSignupUrl(pathname)
 * (marketing/lib/constants.ts) — the dashboard funnel already groups on that
 * shape, so a second labelling scheme would fragment the report.
 *
 * UTM params are deliberately omitted: jd_utm is a first-touch cookie already
 * set by marketing middleware when the visitor landed here (Task 1), and
 * tagging an internal click would overwrite the real acquisition source.
 */
export function signupUrlFromTool(toolSlug?: string): string {
  const path = toolSlug ? `/utilities/${toolSlug}` : '/utilities'
  return `${SIGNUP_URL}?from=${encodeURIComponent(path)}`
}
