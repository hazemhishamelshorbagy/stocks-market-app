'use client';

import React from 'react';

interface TradingViewWidgetSkeletonProps {
  height?: number;
  className?: string;
}

const TradingViewWidgetSkeleton: React.FC<TradingViewWidgetSkeletonProps> = ({
  height = 600,
  className = '',
}) => {
  return (
    <div className={`tradingview-widget-container  ${className}`} style={{ height: `${height}px` }}>
      <div
        className="tradingview-widget-container__widget animate-pulse bg-gray-800 rounded"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Skeleton content */}
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading TradingView Widget...</div>
        </div>
      </div>
      <div className="tradingview-widget-copyright bg-gray-900 p-2 rounded-b">
        <div className="animate-pulse bg-gray-700 h-4 w-3/4 rounded"></div>
      </div>
    </div>
  );
};

export default TradingViewWidgetSkeleton;