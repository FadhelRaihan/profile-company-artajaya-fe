declare module 'redux-persist/integration/react' {
  import React from 'react';
  interface PersistGateProps {
    children?: React.ReactNode;
    loading?: React.ReactNode;
    persistor: any;
  }
  export class PersistGate extends React.Component<PersistGateProps> {}
}
