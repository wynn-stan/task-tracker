import React from 'react';

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  children: (props: { proceed?: () => void }) => void;
}

export type TPriorityFilter = 'all' | 'high' | 'medium' | 'low' | 'completed';
