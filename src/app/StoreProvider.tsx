import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { store, persistor } = makeStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
