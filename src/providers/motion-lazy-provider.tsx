'use client';

import { LazyMotion } from 'framer-motion';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------
const loadFeatures = () =>
  import('../components/shared/animations/features').then((res) => res.default);

type Props = {
  children: ReactNode;
};

export default function MotionLazyProvider({ children }: Props) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
