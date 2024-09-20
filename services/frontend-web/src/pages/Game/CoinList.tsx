import { Coin } from './Coin';

export function CoinList() {
  const positions = [2, 4, 6, 8, 10, 12, 14, 16];
  return (
    <>
      {positions.map((zPosition, index) => {
        return <Coin key={index} position={[1, 1, zPosition]} />;
      })}
    </>
  );
}
