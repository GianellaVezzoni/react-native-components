import React from 'react';
import { BarVariant, BottomBarProps } from './types';
import { FloatingBar, SlidingBar, ScaleBar, MorphingBar, WaveBar } from './variants';

interface FactoryProps extends BottomBarProps {
  variant: BarVariant;
}

export const BottomBarFactory: React.FC<FactoryProps> = ({ variant, ...props }) => {
  const bars = {
    [BarVariant.Floating]: FloatingBar,
    [BarVariant.Sliding]: SlidingBar,
    [BarVariant.Scale]: ScaleBar,
    [BarVariant.Morphing]: MorphingBar,
    [BarVariant.Wave]: WaveBar,
  };

  const BarComponent = bars[variant];
  return <BarComponent {...props} />;
};

