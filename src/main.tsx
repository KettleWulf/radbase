import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/styles/main.scss";
import App from './App.tsx'
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GenreContextProvider } from './contexts/GenreContextProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<GenreContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</GenreContextProvider>
		</QueryClientProvider>
	</StrictMode>,
)
