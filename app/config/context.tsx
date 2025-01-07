import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useState,
	ReactNode,
} from 'react';

export interface AppContextInterface {
	selectedAthlete: string;
	setSelectedAthlete: Dispatch<SetStateAction<string>>;
}

const initialContext: AppContextInterface = {
	selectedAthlete: '',
	setSelectedAthlete: () => {},
};

const AppContext = createContext<AppContextInterface>(initialContext);

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [selectedAthlete, setSelectedAthlete] = useState<string>('');

	return (
		<AppContext.Provider value={{ selectedAthlete, setSelectedAthlete }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
