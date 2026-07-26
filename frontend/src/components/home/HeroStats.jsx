const stats = [

  ["98.7%", "Accuracy"],

  ["2 Sec", "Prediction"],

  ["6+", "Diseases"],

];

export default function HeroStats() {

  return (

    <div className="mt-14 flex flex-wrap gap-8">

      {stats.map(([value, label]) => (

        <div key={label}>

          <h2 className="text-3xl font-bold text-cyan-400">

            {value}

          </h2>

          <p className="mt-2 text-slate-500">

            {label}

          </p>

        </div>

      ))}

    </div>

  );

}