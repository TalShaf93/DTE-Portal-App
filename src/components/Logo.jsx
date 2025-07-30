import React from 'react';
import { cn } from '../utils/cn';

// Import SVG logos
import LogoGradientLight from '../assets/brand/logo_gradient_light.svg';
import LogoGradientDark from '../assets/brand/logo_gradient_dark.svg';

/**
 * Dan-Tech Energy Logo Component
 * 
 * Features:
 * - Uses actual SVG logo files from assets/brand/
 * - Fully responsive with proper breakpoints
 * - Multiple variants: gradient, mono-white, mono-lime, avatar
 * - Responsive sizing: xs, sm, md, lg, xl
 * - Brand-compliant with official Dan-Tech SVG assets
 * - Accessibility support with proper aria-labels
 * - Clear space and minimum size guidelines followed
 */

const Logo = ({
    variant = 'gradient',
    size = 'md',
    showText = true,
    className = '',
    responsive = true,
    ...props
}) => {
    // Enhanced responsive size configurations
    const sizeConfig = {
        xs: {
            logo: responsive
                ? 'w-5 h-5 sm:w-6 sm:h-6'
                : 'w-6 h-6',
            text: responsive
                ? 'text-xs sm:text-sm'
                : 'text-sm',
            gap: 'gap-1 sm:gap-2'
        },
        sm: {
            logo: responsive
                ? 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
                : 'w-8 h-8',
            text: responsive
                ? 'text-sm sm:text-base'
                : 'text-base',
            gap: 'gap-2'
        },
        md: {
            logo: responsive
                ? 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10'
                : 'w-10 h-10',
            text: responsive
                ? 'text-base sm:text-lg md:text-xl'
                : 'text-lg',
            gap: 'gap-2 sm:gap-3'
        },
        lg: {
            logo: responsive
                ? 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16'
                : 'w-16 h-16',
            text: responsive
                ? 'text-lg sm:text-xl md:text-2xl'
                : 'text-2xl',
            gap: 'gap-3 sm:gap-4'
        },
        xl: {
            logo: responsive
                ? 'w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20'
                : 'w-20 h-20',
            text: responsive
                ? 'text-xl sm:text-2xl md:text-3xl'
                : 'text-3xl',
            gap: 'gap-3 sm:gap-4'
        }
    };

    // Variant configurations based on brand guidelines
    const variantConfig = {
        gradient: {
            logoSrc: LogoGradientLight,
            textColor: 'text-brand-349',
            containerBg: 'bg-transparent'
        },
        'gradient-dark': {
            logoSrc: LogoGradientDark,
            textColor: 'text-white',
            containerBg: 'bg-transparent'
        },
        'mono-white': {
            logoSrc: LogoGradientDark,
            textColor: 'text-white',
            containerBg: 'bg-transparent',
            filter: 'brightness(0) invert(1)'
        },
        'mono-lime': {
            logoSrc: LogoGradientLight,
            textColor: 'text-brand-349',
            containerBg: responsive
                ? 'bg-brand-376 rounded-md sm:rounded-lg p-1'
                : 'bg-brand-376 rounded-lg p-1'
        },
        avatar: {
            logoSrc: LogoGradientLight,
            textColor: 'text-brand-349',
            containerBg: responsive
                ? 'bg-white rounded-lg sm:rounded-xl p-1 shadow-sm'
                : 'bg-white rounded-xl p-1 shadow-sm'
        }
    };

    const config = variantConfig[variant];
    const sizes = sizeConfig[size];

    return (
        <div
            className={cn(
                "flex items-center",
                sizes.gap,
                responsive && "min-w-0", // Prevent flex overflow
                className
            )}
            {...props}
        >
            {/* Logo Icon */}
            <div
                className={cn(
                    "relative flex items-center justify-center transition-all duration-300 hover:scale-105 flex-shrink-0",
                    sizes.logo,
                    config.containerBg
                )}
                role="img"
                aria-label="Dan-Tech Energy Logo"
            >
                <img
                    src={config.logoSrc}
                    alt="Dan-Tech Energy"
                    className={cn(
                        "w-full h-full object-contain",
                        variant === 'avatar' && 'p-0.5'
                    )}
                    style={config.filter ? { filter: config.filter } : undefined}
                />
            </div>

            {/* Company Text */}
            {showText && (
                <div className={cn(
                    "font-bold tracking-tight whitespace-nowrap",
                    responsive && "hidden sm:block", // Hide text on very small screens by default
                    sizes.text,
                    config.textColor
                )}>
                    <span className="font-bold">Dan-Tech</span>
                    <span className={cn(
                        "font-normal ml-1",
                        responsive ? "text-brand-gray hidden md:inline" : "text-brand-gray"
                    )}>
                        Energy
                    </span>
                </div>
            )}
        </div>
    );
};

// Enhanced responsive logo variants
const LogoVariants = {
    // Header logo - responsive, shows full text on larger screens
    Header: (props) => (
        <Logo
            variant="gradient"
            size="md"
            showText={true}
            responsive={true}
            {...props}
        />
    ),

    // Sidebar logo - highly responsive to sidebar state
    Sidebar: (props) => {
        const { collapsed, ...restProps } = props;
        return (
            <Logo
                variant="gradient"
                size="sm"
                showText={!collapsed}
                responsive={true}
                {...restProps}
            />
        );
    },

    // Mobile header - compact version for mobile
    Mobile: (props) => (
        <Logo
            variant="gradient"
            size="sm"
            showText={false}
            responsive={true}
            {...props}
        />
    ),

    // Login page logo - large and prominent
    Login: (props) => (
        <Logo
            variant="gradient"
            size="lg"
            showText={false}
            responsive={true}
            {...props}
        />
    ),

    // Avatar/favicon style - always compact
    Avatar: (props) => (
        <Logo
            variant="avatar"
            size="sm"
            showText={false}
            responsive={false}
            {...props}
        />
    ),

    // Dark theme version - responsive
    Dark: (props) => (
        <Logo
            variant="mono-white"
            size="md"
            showText={true}
            responsive={true}
            {...props}
        />
    ),

    // Light background variant
    Light: (props) => (
        <Logo
            variant="mono-lime"
            size="md"
            showText={true}
            responsive={true}
            {...props}
        />
    ),

    // Dark gradient version
    GradientDark: (props) => (
        <Logo
            variant="gradient-dark"
            size="md"
            showText={true}
            responsive={true}
            {...props}
        />
    ),

    // Compact version for tight spaces
    Compact: (props) => (
        <Logo
            variant="gradient"
            size="xs"
            showText={false}
            responsive={true}
            {...props}
        />
    )
};

// Export both default and named exports
export { LogoVariants };
export default Logo;

