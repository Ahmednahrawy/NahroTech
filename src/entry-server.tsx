import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from './App';
import {CollectedHeadData, HeadCollectorProvider} from './components/SeoHead';
import {getRouterBasename} from './utils/routes';

export {PRERENDER_ROUTES} from './routes';

export interface PrerenderResult {
  html: string;
  head: CollectedHeadData;
}

export function render(url: string): PrerenderResult {
  let collectedHead: CollectedHeadData = {
    lang: url.startsWith('/ar') ? 'ar' : 'en',
    dir: url.startsWith('/ar') ? 'rtl' : 'ltr',
    tagsHtml: '',
  };

  const basename = getRouterBasename();
  const location = basename !== '/' ? `${basename}${url}` : url;

  const html = renderToString(
    <StrictMode>
      <HeadCollectorProvider
        onCollect={(data) => {
          collectedHead = data;
        }}
      >
        <StaticRouter basename={basename} location={location}>
          <App />
        </StaticRouter>
      </HeadCollectorProvider>
    </StrictMode>,
  );

  return {html, head: collectedHead};
}
