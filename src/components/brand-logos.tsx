import { Link } from "@tanstack/react-router";
import { BrandLockup } from "@/components/brand-lockup";
import { useLogo } from "@/components/lockup-switcher";
import type { LogoConfig } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * One component per place the logo appears. Each reads its lockup from LOGOS in src/lib/brand.ts
 * (or the dev Logo panel while reviewing); pass `config` to override for a one-off use.
 */
type Props = { config?: LogoConfig; className?: string };

/** Header logo on the light bar, linking home. */
export function HeaderLogo({ config, className }: Props) {
  const logo = useLogo("header", config);
  return (
    <Link to="/" aria-label="Brickfield Group home" className={cn("brand-link inline-flex", className)}>
      {logo && <BrandLockup {...logo} surface="light" title="" />}
    </Link>
  );
}

/** Footer logo on charcoal, linking home. */
export function FooterLogo({ config, className }: Props) {
  const logo = useLogo("footer", config);
  return (
    <Link to="/" aria-label="Brickfield Group home" className={cn("brand-link inline-flex", className)}>
      {logo && <BrandLockup {...logo} surface="dark" title="" />}
    </Link>
  );
}

/** The oversized, faint logo under the footer. Hidden when its config is null. */
export function FooterWatermark({ config, className }: Props) {
  const logo = useLogo("watermark", config);
  if (!logo) return null;
  return (
    <div className={cn("footer-wordmark", className)} aria-hidden="true">
      <BrandLockup {...logo} surface="dark" title="" fluid />
    </div>
  );
}
