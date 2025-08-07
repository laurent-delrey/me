'use client';

import React from 'react';
import { Magnetic } from '@/components/motion-primitives/magnetic';

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function MagneticLink({ href, children, color = '#ffffff', className = '' }: MagneticLinkProps) {
  return (
    <Magnetic intensity={0.3} range={50}>
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ 
          color,
          textDecoration: 'none',
          display: 'inline-block'
        }}
        className={`hover:underline ${className}`}
      >
        {children}
      </a>
    </Magnetic>
  );
}