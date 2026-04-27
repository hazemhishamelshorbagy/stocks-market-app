export const NAV_ITEMS = [
    { href: "", title: "Dashboard" },
    { href: "/search", title: "Search" },
    { href: "/watchlist", title: "WatchList" },
]

export const investmentGoalsOptions = [
  { value: "Growth", label: "Growth" },
  { value: "Income", label: "Income" },
  { value: "Capital Preservation", label: "Capital Preservation" },
  { value: "Balanced", label: "Balanced" },
  { value: "Speculation", label: "Speculation" },
];

export const riskToleranceOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Very High", label: "Very High" },
];

export const industryOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Energy", label: "Energy" },
  { value: "Consumer Goods", label: "Consumer Goods" },
  { value: "Utilities", label: "Utilities" },
  { value: "Real Estate", label: "Real Estate" },
];

export const MARKET_OVERVIEW_WIDGETS_CONFIG =
{
    "lineWidth": 2,
    "lineType": 0,
    "chartType": "area",
    "fontColor": "rgb(106, 109, 120)",
    "gridLineColor": "rgba(242, 242, 242, 0.06)",
    "volumeUpColor": "rgba(34, 171, 148, 0.5)",
    "volumeDownColor": "rgba(247, 82, 95, 0.5)",
    "backgroundColor": "#0F0F0F",
    "widgetFontColor": "#DBDBDB",
    "upColor": "#22ab94",
    "downColor": "#f7525f",
    "borderUpColor": "#22ab94",
    "borderDownColor": "#f7525f",
    "wickUpColor": "#22ab94",
    "wickDownColor": "#f7525f",
    "colorTheme": "dark",
    "isTransparent": false,
    "locale": "en",
    "chartOnly": false,
    "scalePosition": "right",
    "scaleMode": "Normal",
    "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
    "valuesTracking": "1",
    "changeMode": "price-and-percent",
    "symbols": [
        [
            "Apple",
            "NASDAQ:AAPL|1D"
        ],
        [
            "Google",
            "NASDAQ:GOOGL|1D"
        ],
        [
            "Microsoft",
            "NASDAQ:MSFT|1D"
        ]
    ],
    "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
    ],
    "fontSize": "10",
    "headerFontSize": "medium",
    "autosize": true,
    "width": "100%",
    "height": "100%",
    "noTimeScale": false,
    "hideDateRanges": false,
    "hideMarketStatus": false,
    "hideSymbolLogo": false
}

export interface TradingViewProps {
  title?: string;
  height?: number;
  config: Record<string, unknown>;
  className?: string;
  scriptUrl: string;
}
export const HEATMAP_WIDGET_CONFIG = {
    dataSource: 'SPX500',
    blockSize: 'market_cap_basic',
    blockColor: 'change',
    grouping: 'sector',
    isTransparent: true,
    locale: 'en',
    symbolUrl: '',
    colorTheme: 'dark',
    exchanges: [],
    hasTopBar: false,
    isDataSetEnabled: false,
    isZoomEnabled: true,
    hasSymbolTooltip: true,
    isMonoSize: false,
    width: '100%',
    height: '600',
};

export const TOP_STORIES_WIDGET_CONFIG = {
    displayMode: 'regular',
    feedMode: 'market',
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
    market: 'stock',
    width: '100%',
    height: '600',
};

export const MARKET_DATA_WIDGET_CONFIG = {
    title: 'Stocks',
    width: '100%',
    height: 600,
    locale: 'en',
    showSymbolLogo: true,
    colorTheme: 'dark',
    isTransparent: false,
    backgroundColor: '#0F0F0F',
    symbolsGroups: [
        {
            name: 'Financial',
            symbols: [
                { name: 'NYSE:JPM', displayName: 'JPMorgan Chase' },
                { name: 'NYSE:WFC', displayName: 'Wells Fargo Co New' },
                { name: 'NYSE:BAC', displayName: 'Bank Amer Corp' },
                { name: 'NYSE:HSBC', displayName: 'Hsbc Hldgs Plc' },
                { name: 'NYSE:C', displayName: 'Citigroup Inc' },
                { name: 'NYSE:MA', displayName: 'Mastercard Incorporated' },
            ],
        },
        {
            name: 'Technology',
            symbols: [
                { name: 'NASDAQ:AAPL', displayName: 'Apple' },
                { name: 'NASDAQ:GOOGL', displayName: 'Alphabet' },
                { name: 'NASDAQ:MSFT', displayName: 'Microsoft' },
                { name: 'NASDAQ:FB', displayName: 'Meta Platforms' },
                { name: 'NYSE:ORCL', displayName: 'Oracle Corp' },
                { name: 'NASDAQ:INTC', displayName: 'Intel Corp' },
            ],
        },
        {
            name: 'Services',
            symbols: [
                { name: 'NASDAQ:AMZN', displayName: 'Amazon' },
                { name: 'NYSE:BABA', displayName: 'Alibaba Group Hldg Ltd' },
                { name: 'NYSE:T', displayName: 'At&t Inc' },
                { name: 'NYSE:WMT', displayName: 'Walmart' },
                { name: 'NYSE:V', displayName: 'Visa' },
            ],
        },
    ],
};
