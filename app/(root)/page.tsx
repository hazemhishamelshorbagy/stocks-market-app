import TradingViewWidgetSkeleton from "@/components/fallback/TradingViewWidgetSkeleton";
import TradingViewWidget from "@/components/TradingViewWidget";
import { MARKET_DATA_WIDGET_CONFIG, MARKET_OVERVIEW_WIDGETS_CONFIG, TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants";
import { Suspense } from "react";

const Home = () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <main className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1 ">
          <TradingViewWidget
            title="Market OverView"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGETS_CONFIG}
            height={600}
            className="!h-[565px]"
          />
        </div>
        <div className="md-col-span xl:col-span-2">
           <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={MARKET_OVERVIEW_WIDGETS_CONFIG}
            height={600}
            className="!h-[565px]"
          />
        </div>
      </section>
      <section className="grid w-full mt-10 gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1 ">
          <TradingViewWidget
            
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            height={600}
            className="!h-[565px]"
          />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2 ">
           <TradingViewWidget
          
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={600}
            className="!h-[565px]"
          />
        </div>
      </section>
    </main>
  );
};
export default Home;
