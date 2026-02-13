import React from 'react';

export interface BookPageProps {
  pageNumber: number;
  isLeft: boolean;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export interface SpreadContent {
  left: React.ReactNode;
  right: React.ReactNode;
}