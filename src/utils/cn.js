import { clsx } from 'clsx';

/**
 * ClassNames utility function for conditional and dynamic className handling
 * 
 * This utility combines the power of clsx for conditional classes
 * with a clean, reusable function that's used throughout the Dan-Tech application.
 * 
 * Features:
 * - Conditional className application
 * - Array and object syntax support
 * - Automatic falsy value filtering
 * - Perfect for Tailwind CSS className merging
 * - TypeScript compatible
 * 
 * @param {...any} inputs - Class names, objects, arrays, or conditional expressions
 * @returns {string} - Combined and cleaned className string
 * 
 * @example
 * // Basic usage
 * cn('base-class', 'another-class') 
 * // → 'base-class another-class'
 * 
 * @example
 * // Conditional classes
 * cn('btn', {
 *   'btn-primary': isPrimary,
 *   'btn-disabled': isDisabled
 * })
 * // → 'btn btn-primary' (if isPrimary=true, isDisabled=false)
 * 
 * @example
 * // With arrays and mixed types
 * cn(['btn', 'px-4'], {
 *   'bg-green-600': variant === 'primary',
 *   'bg-gray-600': variant === 'secondary'
 * }, isLoading && 'opacity-50')
 * 
 * @example
 * // Component usage pattern
 * const Button = ({ variant, disabled, className, children }) => (
 *   <button 
 *     className={cn(
 *       'px-4 py-2 rounded-lg font-medium transition-all',
 *       {
 *         'bg-brand-361 text-white hover:bg-brand-349': variant === 'primary',
 *         'border border-brand-361 text-brand-361 hover:bg-grad-start/30': variant === 'secondary',
 *         'opacity-50 cursor-not-allowed': disabled
 *       },
 *       className
 *     )}
 *   >
 *     {children}
 *   </button>
 * )
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Variant-based className utility for component libraries
 * Useful for creating consistent component variants following design system
 * 
 * @param {Object} variants - Object with variant keys and their className values
 * @param {string} defaultVariant - Default variant key to use
 * @returns {Function} - Function that accepts variant name and returns className
 * 
 * @example
 * const buttonVariants = cva({
 *   primary: 'bg-brand-361 text-white hover:bg-brand-349',
 *   secondary: 'border border-brand-361 text-brand-361 hover:bg-grad-start/30',
 *   danger: 'bg-red-600 text-white hover:bg-red-700'
 * }, 'primary');
 * 
 * // Usage
 * buttonVariants('secondary') // → 'border border-brand-361 text-brand-361 hover:bg-grad-start/30'
 * buttonVariants() // → 'bg-brand-361 text-white hover:bg-brand-349' (default)
 */
export function cva(variants, defaultVariant) {
  return (variant = defaultVariant) => variants[variant] || variants[defaultVariant];
}

/**
 * Conditional className application with better readability
 * Useful for when you have many conditional classes
 * 
 * @param {Object} conditions - Object with condition keys and className values
 * @returns {string} - Combined className string for truthy conditions
 * 
 * @example
 * const classes = when({
 *   'text-red-500': hasError,
 *   'text-green-500': isSuccess,
 *   'opacity-50': isLoading,
 *   'cursor-not-allowed': isDisabled
 * });
 */
export function when(conditions) {
  return cn(conditions);
}

/**
 * Focus and interaction state utilities for consistent UX
 */
export const focusRing = cn(
  'focus:outline-none',
  'focus:ring-2', 
  'focus:ring-brand-361/40',
  'focus:ring-offset-2'
);

export const hoverScale = cn(
  'transition-transform',
  'duration-200',
  'hover:scale-105',
  'active:scale-95'
);

export const buttonBase = cn(
  'inline-flex',
  'items-center',
  'justify-center',
  'rounded-lg',
  'font-medium',
  'transition-all',
  'duration-200',
  focusRing
);

/**
 * Dan-Tech specific utility classes following brand guidelines
 */
export const brandClasses = {
  // Brand gradient background
  brandGradient: 'bg-gradient-to-r from-grad-start to-grad-end',
  
  // Primary button styling
  btnPrimary: cn(
    buttonBase,
    'bg-brand-361',
    'text-white',
    'hover:bg-brand-349',
    hoverScale
  ),
  
  // Secondary button styling
  btnSecondary: cn(
    buttonBase,
    'border',
    'border-brand-361',
    'text-brand-361',
    'hover:bg-grad-start/30',
    hoverScale
  ),
  
  // Card styling
  card: cn(
    'bg-white',
    'rounded-lg',
    'shadow-sm',
    'border',
    'border-gray-200',
    'p-5',
    'transition-all',
    'duration-200',
    'hover:shadow-md'
  ),
  
  // Input styling
  input: cn(
    'w-full',
    'px-3',
    'py-2',
    'border',
    'border-gray-300',
    'rounded-lg',
    'transition-colors',
    'duration-200',
    focusRing,
    'focus:border-brand-361'
  ),
  
  // Text variants following typography scale
  textDisplay: 'text-2xl font-bold text-brand-349 tracking-tight',
  textHeading: 'text-xl font-semibold text-brand-349',
  textBody: 'text-base text-brand-349',
  textSmall: 'text-sm text-brand-gray',
  textCaption: 'text-xs text-brand-gray tracking-wide'
};

/**
 * Layout utilities for consistent spacing
 */
export const layout = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-8 lg:py-12',
  grid: 'grid gap-6',
  flex: 'flex items-center gap-4',
  sidebar: 'w-64 lg:w-72'
};

/**
 * Animation utilities
 */
export const animations = {
  fadeIn: 'animate-in fade-in duration-200',
  slideIn: 'animate-in slide-in-from-left duration-300',
  scaleIn: 'animate-in zoom-in duration-200',
  slideUp: 'animate-in slide-in-from-bottom duration-300'
};

export default cn;