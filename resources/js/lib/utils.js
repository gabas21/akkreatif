/**
 * Utility helpers for AK Kreatif
 */

/**
 * Combine class names conditionally (lightweight cn utility)
 * Usage: cn('base-class', condition && 'conditional-class', 'another-class')
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

/**
 * Format a number with thousand separator
 * Usage: formatNumber(1000) → '1.000'
 */
export function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Truncate text to a max length
 */
export function truncate(str, maxLength = 100) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength).trim() + '...';
}
