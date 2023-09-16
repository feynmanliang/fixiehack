export type Rec = {
  logo: string,
  summary: string,
  rank: number,
};

type RecCardProps = Rec & {
  onClear: () => void
};

function RecCard(p: RecCardProps) {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure><img className="logo" src={p.logo} /></figure>
      <div className="rank">
        {p.rank}
      </div>
      <div className="card-body">
        <p>
          {p.summary}
        </p>
        <div className="card-actions justify-end">
          <button onClick={p.onClear} className="btn btn-primary">Clear</button>
        </div>
      </div>
    </div>
  );
}

type RecProps = {
  recs: Rec[];
  onClear: (r: Rec) => void
};
export default function Recs(p: RecProps) {
  return (
    <div className="rec-container">
      {p.recs.map((r, i) => <RecCard
        {...r}
        onClear={p.onClear}
      />
      )}
    </div>
  );
}
