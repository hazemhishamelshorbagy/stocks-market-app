'use client'
import useTradingviewWidget from '@/app/hooks/UseTradingViewWidget';
import React, {  memo } from 'react';
import { TradingViewProps } from '@/lib/constants';
import clsx from 'clsx';
import { cn } from '@/lib/utils';

const TradingViewWidget=({title,height=600,config,className,scriptUrl}:TradingViewProps)=> {
  const container = useTradingviewWidget(scriptUrl, config, height)



  return (
    <div className={cn(className,"w-full") }>
            {title && <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>}
            <div className={cn('tradingview-widget-container')} ref={container}>
                <div className="tradingview-widget-container__widget" style={{ height:height, width: "100%" }} />
            </div>
        </div>
  );
}

export default memo(TradingViewWidget);
