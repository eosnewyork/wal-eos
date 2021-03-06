import React, { Component } from 'react';
import styled from 'react-emotion';
import { WalletProvider, Wallet } from 'wal-eos';
import WalletListItem from './WalletListItem';
import WalletStateSubscribe from 'WalletStateSubscribe';

// Visual components

const WalletListRoot = styled('div')({
  width: '100%',
  marginBottom: 4
});

// Exported component

export interface WalletListProps {
  walletProviders?: WalletProvider[];
  wallets?: Wallet[];
  onItemSelect?: (item: WalletProvider) => void;
  onItemDismissClick?: (item: Wallet) => void;
  onItemLogoutClick?: (item: Wallet) => void;
  onItemReconnectClick?: (item: Wallet) => void;
}

export class WalletList extends Component<WalletListProps> {
  render() {
    const {
      walletProviders,
      wallets,
      onItemSelect,
      onItemDismissClick,
      onItemLogoutClick,
      onItemReconnectClick
    } = this.props;

    return (
      <WalletListRoot>
        {walletProviders &&
          walletProviders.map(walletProvider => (
            <WalletListItem
              key={walletProvider.id}
              walletProvider={walletProvider}
              onSelect={onItemSelect}
              onDismissClick={onItemDismissClick}
              onLogoutClick={onItemLogoutClick}
              onReconnectClick={onItemReconnectClick}
            />
          ))}
        {wallets &&
          wallets.map(wallet => (
            <WalletStateSubscribe wallet={wallet} key={wallet.provider.id}>
              {() => (
                <WalletListItem
                  walletProvider={wallet.provider}
                  wallet={wallet}
                  onSelect={onItemSelect}
                  onDismissClick={onItemDismissClick}
                  onLogoutClick={onItemLogoutClick}
                  onReconnectClick={onItemReconnectClick}
                />
              )}
            </WalletStateSubscribe>
          ))}
      </WalletListRoot>
    );
  }
}

export default WalletList;
