import React from 'react';
import {
  VinylRecord,
  GlowRing,
  EqualizerWrapper,
  EqualizerBar,
  FloatingNote,
  BrandText,
  TaglineText
} from '@components/styled/musicVisual';
import { EQUALIZER_BARS, FLOATING_NOTES, GLOW_RINGS } from './constants';

const MusicVisual = () => (
  <>
    <BrandText>MUSICA</BrandText>
    <TaglineText>FEEL THE RHYTHM</TaglineText>
    {GLOW_RINGS.map((ring) => (
      <GlowRing key={ring.size} size={ring.size} duration={ring.duration} delay={ring.delay} />
    ))}
    <VinylRecord data-testid="vinyl-record" />
    <EqualizerWrapper>
      {EQUALIZER_BARS.map((bar, i) => (
        <EqualizerBar key={i} duration={bar.duration} delay={bar.delay} />
      ))}
    </EqualizerWrapper>
    {FLOATING_NOTES.map((note, i) => (
      <FloatingNote
        key={i}
        size={note.size}
        duration={note.duration}
        delay={note.delay}
        left={note.left}
        bottom={note.bottom}
      >
        {note.note}
      </FloatingNote>
    ))}
  </>
);

export default MusicVisual;
