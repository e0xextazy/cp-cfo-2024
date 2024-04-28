import {QueryClient, QueryClientProvider} from 'react-query';
import block from 'bem-cn-lite';

import {ResultPage, UploadPage} from '../pages';
import {useAppState} from '../store';

const client = new QueryClient();

import './App.scss';

const b = block('app');

const App = () => {
    const {result} = useAppState();

    return (
        <QueryClientProvider client={client}>
            <div className={b('app')}>
                <div className={b('content')}>{result ? <ResultPage /> : <UploadPage />}</div>
            </div>
        </QueryClientProvider>
    );
};

export default App;
