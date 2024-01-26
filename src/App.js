import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import Home from './pages/home';
import Login from './pages/Login';
import Home2 from './pages/Home2';
import MoviePart from './pages/MoviePart';
import NextPage from './pages/NextPage';
import SearchMovies from './pages/SearchMovies';
import Payments from './pages/Payments';
import VideoPage from './pages/VideoPage';
import TV from './pages/tv';

import * as ROUTES from './constants/routes';

import { AlphaWalletAdapter } from '@solana/wallet-adapter-alpha';
import { AvanaWalletAdapter } from '@solana/wallet-adapter-avana';
import { BitKeepWalletAdapter } from '@solana/wallet-adapter-bitkeep';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { BitpieWalletAdapter } from '@solana/wallet-adapter-bitpie';
import { Coin98WalletAdapter } from '@solana/wallet-adapter-coin98';
import { CoinbaseWalletAdapter } from '@solana/wallet-adapter-coinbase';
import { CoinhubWalletAdapter } from '@solana/wallet-adapter-coinhub';
import { FractalWalletAdapter } from '@solana/wallet-adapter-fractal';
import { HyperPayWalletAdapter } from '@solana/wallet-adapter-hyperpay';
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger';
import { NekoWalletAdapter } from '@solana/wallet-adapter-neko';
import { NightlyWalletAdapter } from '@solana/wallet-adapter-nightly';
import { SafePalWalletAdapter } from '@solana/wallet-adapter-safepal';
import { SaifuWalletAdapter } from '@solana/wallet-adapter-saifu';
import { SalmonWalletAdapter } from '@solana/wallet-adapter-salmon';
import { SkyWalletAdapter } from '@solana/wallet-adapter-sky';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { SolongWalletAdapter } from '@solana/wallet-adapter-solong';
import { SpotWalletAdapter } from '@solana/wallet-adapter-spot';
import { TokenaryWalletAdapter } from '@solana/wallet-adapter-tokenary';
import { TrezorWalletAdapter } from '@solana/wallet-adapter-trezor';
import { WalletConnectWalletAdapter } from '@solana/wallet-adapter-walletconnect';
import { XDEFIWalletAdapter } from '@solana/wallet-adapter-xdefi';

import * as buffer from 'buffer';
window.Buffer = buffer.Buffer;

require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = "https://api.metaplex.solana.com/";
  // const endpoint = "https://api.devnet.solana.com";

  // initialise all the wallets you want to use
  const wallets = useMemo(
    () => [
      new AlphaWalletAdapter(),
      new AvanaWalletAdapter(),
      new BitKeepWalletAdapter(),
      new PhantomWalletAdapter(),
      new BitpieWalletAdapter(),
      new Coin98WalletAdapter(),
      new CoinbaseWalletAdapter(),
      new CoinhubWalletAdapter(),
      new FractalWalletAdapter(),
      new HyperPayWalletAdapter(),
      new LedgerWalletAdapter(),
      new NekoWalletAdapter(),
      new NightlyWalletAdapter(),
      new SafePalWalletAdapter(),
      new SaifuWalletAdapter(),
      new SalmonWalletAdapter(),
      new SkyWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolongWalletAdapter(),
      new SpotWalletAdapter(),
      new TokenaryWalletAdapter(),
      new TrezorWalletAdapter(),
      new WalletConnectWalletAdapter(),
      new XDEFIWalletAdapter(),
    ],
    [solNetwork]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Routes>
            <Route exact path={ROUTES.HOME} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Home2 />} />
            <Route exact path="/v1/moviePart/:id/*" element={<MoviePart />} />
            <Route exact path="/v1/nextPart/:id/*" element={<NextPage />} />
            <Route exact path="/search" element={<SearchMovies />} />
            <Route exact path="/v1/payments" element={<Payments />} />
            <Route exact path="/v1/play/*" element={<VideoPage />} />
            <Route exact path="/v1/iptv" element={<TV />} />
          </Routes>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
