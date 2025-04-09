import React from 'react';
import RankingTable from '../../../components/ranking/RankingTable';
import { useMuretto } from '../MurettoContext';

function RankingPage() {
  const muretto  = useMuretto();
  console.log('muretto ranking page ', muretto);
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <RankingTable rapper={muretto.rapper || []} />
      </div>
    </div>
  );
}

export default RankingPage;