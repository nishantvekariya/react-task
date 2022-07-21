import { useState } from "react";
import { Input } from "antd";
import { getDefinitions } from '../../axios/axios';
import './searchItem.css';

const SearchItem = () => {
  const [searchWord, setSearchWord] = useState('');
  const [error, setError] = useState('');
  const [definitionList, setDefinitionList] = useState([]);

  const handleSearch = () => {
    setError('');
    setDefinitionList([]);
    console.log(searchWord);
    getDefinitions(searchWord)
      .then((resp) => {
        const response = resp?.data;
        console.log('resp', response);
        // const res = response.foe(obj => {
        //   return obj.meanings
        // });
        const res = response.map(a => a.meanings.map(b => b.definitions.map(c => c.definition)));
        let merge = [].concat.apply([], res);
        merge = [].concat.apply([], merge);
        console.log(merge);
        setDefinitionList(merge);
      })
      .catch((err) => {
        console.log('err', err?.response?.data?.message);
        setError(err?.response?.data?.message);
      });
  }
  return (
    <>
      <div className="site-card-wrapper">
        <p className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</p>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <Input
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Word" />
          <button
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            onClick={() => handleSearch()}
          >Search</button>
        </div>
        {definitionList ? (
          <ol className="list-decimal w-48 mt-4 text-sm font-medium text-gray-900 bg-white">
            {definitionList.map((item) => (
              <li className="p-2 w-96">{item}</li>
            ))}
          </ol>
        ) : ''}
        {error ? (
          <p class="mt-2 text-lg text-red-600">{error}</p>
        ) : ''}
      </div>
    </>
  );
};

export default SearchItem;