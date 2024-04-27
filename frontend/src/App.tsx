import {QueryClient, QueryClientProvider} from 'react-query';
import {UploadPage} from './pages';

const client = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={client}>
            <UploadPage />
        </QueryClientProvider>
    );
};

export default App;
