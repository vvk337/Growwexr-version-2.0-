'use client';

import { FlowButton } from './flow-button';

export const FlowButtonDemo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', background: '#020713', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <h3 style={{ color: '#fff' }}>Inverted (Starts with Color, Removes on Hover)</h3>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <FlowButton text="Primary Inverted" variant="primary" inverted={true} />
        <FlowButton text="Gold Inverted" variant="gold" inverted={true} />
        <FlowButton text="White Inverted" variant="white" inverted={true} />
      </div>

      <h3 style={{ color: '#fff', marginTop: '1rem' }}>Original (Starts Transparent, Fills on Hover)</h3>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <FlowButton text="Primary Normal" variant="primary" inverted={false} />
        <FlowButton text="Gold Normal" variant="gold" inverted={false} />
        <FlowButton text="White Normal" variant="white" inverted={false} />
      </div>
    </div>
  );
};

export default { FlowButtonDemo };

