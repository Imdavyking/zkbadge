import { useState, useEffect } from "react";
import axiosBackend from "../../services/axios.config.services";
import { FaSpinner } from "react-icons/fa";
import DatasetItem from "./item";
import { DatasetInfo } from "../../types/dataset.type";

// Sample datasets for demo purposes

function DiscoverDataset() {
  const [search, setSearch] = useState("");
  const [isGettingDatasets, setIsGettingDatasets] = useState(false);
  const [filter, setFilter] = useState({
    category: "",
    verified: "",
    rating: "",
  });

  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<DatasetInfo[]>([]);
  const getUserDatasets = async () => {
    try {
      setIsGettingDatasets(true);
      const datasets = (await axiosBackend.get("/api/dataset"))
        .data as DatasetInfo[];

      setFilteredDatasets(datasets);
      setDatasets(datasets);

      return datasets;
    } catch (error) {
    } finally {
      setIsGettingDatasets(false);
    }
  };
  useEffect(() => {
    getUserDatasets();
  }, []);
  useEffect(() => {
    if (!datasets.length) return;
    let filtered = datasets.filter((dataset) => {
      return (
        dataset.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter.category ? dataset.category === filter.category : true)
      );
    });
    setFilteredDatasets(filtered);
  }, [search, filter, datasets]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">Discover Datasets</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Search datasets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-5 mb-8">
        <select
          className="p-3 border border-gray-300 rounded-lg shadow-sm"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          value={filter.category}
        >
          <option value="">Category</option>
          <option value="Medicine">Medicine</option>
          <option value="Finance">Finance</option>
          <option value="Text">Text</option>
        </select>
      </div>

      {isGettingDatasets && <FaSpinner className="animate-spin  text-3xl" />}

      {/* Dataset Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredDatasets.map((dataset) => (
          <DatasetItem dataset={dataset} key={dataset.cid} />
        ))}
      </div>

      {/* Pagination (if needed) */}
      <div className="flex justify-center gap-3 mt-8">
        <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
          Previous
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
}

export default DiscoverDataset;
