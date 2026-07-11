/* =========================================================================
   Brand-level constants shared across components: contact links, socials,
   and the all-important WhatsApp conversion link.
   ========================================================================= */

// TODO: replace the placeholder number with the real WhatsApp business number.
const WHATSAPP_NUMBER = '+77779220042'

/**
 * Build a WhatsApp "click to chat" link. The primary conversion action.
 * Optionally seed the message with the tour the traveller is interested in.
 */
export function whatsappLink(prefill?: string): string {
  const message =
    prefill ??
    "Hi Hello Kazakhstan! I'd like to plan a tour around Almaty. Could you help?"
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export interface SocialLink {
  label: string
  href: string
}

export const socials: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/kazakhstan.hello' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@kazakhstan_hello' },
  /**{ label: 'YouTube', href: 'https://youtube.com/' },*/
]

export const navLinks = [
  { key: 'tours', href: '#tours' },
  { key: 'regions', href: '#regions' },
  { key: 'about', href: '#about' },
  { key: 'reviews', href: '#reviews' },
] as const
