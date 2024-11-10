import { useEffect, useState } from 'react'
import './App.css'
import { IDataType } from './models/DataType'
import TreeView from './components/TreeView/TreeView'
import { data_json } from "./api/data_json"

function App() {
  const [data, setData] = useState<IDataType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        setTimeout(() => {
          setData(data_json);
          setLoading(false);
        }, 2000);
      } catch (e) {
        setError('Failed to load data');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <span>{error}</span>
      </div>
    );
  }
  return (
    <>
      <TreeView data={data} />
    </>
  )
}

export default App;