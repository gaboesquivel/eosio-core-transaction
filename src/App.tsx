import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Action, APIClient, Asset, Name, Struct } from '@greymass/eosio';

const jungle = new APIClient({url: 'https://jungle.blockmatic.io'})
function App() {

  const deposit = async () => {
    @Struct.type('transfer')
    class Transfer extends Struct {
      @Struct.field('name') from!: Name
      @Struct.field('name') to!: Name
      @Struct.field('asset') quantity!: Asset
      @Struct.field('string') memo!: string
    }
    const info = await jungle.v1.chain.get_info()
    const header = info.getTransactionHeader()
    const action = Action.from({
      authorization: [
          {
              actor: 'corecorecore',
              permission: 'active',
          },
      ],
      account: 'eosio.token',
      name: 'transfer',
      data: Transfer.from({
          from: 'corecorecore',
          to: 'teamgreymass',
          quantity: '0.0042 EOS',
          memo: 'eosio-core is the best <3',
      }),
    })
  }

  return (
    <div className="App">
      <button onClick={deposit}>deposit</button>
    </div>
  );
}

export default App;
