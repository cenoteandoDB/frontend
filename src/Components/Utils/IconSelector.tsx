// src/components/IconSelector.tsx
import React from 'react';
import iconFileNames from '../../Services/IconsServices';

interface IconSelectorProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
}

export const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelectIcon }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {iconFileNames.map((iconName) => (
          <div
            key={iconName}
            style={{ margin: '10px', cursor: 'pointer' }}
            onClick={() => onSelectIcon(iconName)}
          >
            <img
              src={`/assets/cenoteando-icons/${iconName}`}
              alt={`icon-${iconName}`}
              width="20"
              height="20"
              style={{ border: selectedIcon === iconName ? '2px solid blue' : 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


