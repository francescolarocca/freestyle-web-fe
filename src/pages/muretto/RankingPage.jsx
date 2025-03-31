import React from 'react';
import {useOutletContext} from 'react-router-dom';
import RankingTable from '../../components/ranking/RankingTable';
function RankingPage() {
  const { muretto } = useOutletContext();
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <RankingTable rapper={muretto.rapper || []} />
      </div>
    </div>
  );
}

export default RankingPage;