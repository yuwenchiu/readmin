import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database, Tables } from "../../database.types";
import { Button } from "@/components/ui/button";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [instruments, setInstruments] = useState<Tables<"instruments">[]>([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data } = await supabase.from("instruments").select();
    setInstruments(data ?? []);
  }

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.name}>{instrument.name}</li>
      ))}
      <Button
        variant="ghost"
        size="lg"
        className="text-white hover:text-gray-200"
      >
        Button123
      </Button>
    </ul>
  );
}

export default App;
