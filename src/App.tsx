import { AppRouter } from "./route";

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function App() {
  const [queryClient] = useState(() => new QueryClient({}));

  const { networkConfig } = createNetworkConfig({
    localnet: { url: getFullnodeUrl("localnet") },
    testnet: { url: getFullnodeUrl("testnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider
          slushWallet={{
            name: "SuiPSP",
          }}
          autoConnect={true}
        >
          <AppRouter />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
