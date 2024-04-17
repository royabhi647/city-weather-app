import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCities } from "../../services/api";
import { BsArrowDownUp } from "react-icons/bs";

function CitiesTable() {
    const [cities, setCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [offset, setOffset] = useState(0);

    const [citySortOrder, setCitySortOrder] = useState('asc');
    const [countrySortOrder, setCountrySortOrder] = useState('asc');
    const [timezoneSortOrder, setTimezoneSortOrder] = useState('asc');

    let [filteredCities, setFilteredCities] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    /* @The useEffect hook and handleIntersection function is for fetching all city data and implement infinite scrolling. */

    useEffect(() => {
        const loadCities = async () => {
            try {
                const citiesData = await fetchCities(offset);
                setCities(prevCities => [...prevCities, ...citiesData.results]);
            } catch (error) {
                console.error(error);
            }
        };

        loadCities();
    }, [offset]);

    const handleIntersection = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setOffset(prevOffset => prevOffset + 20);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        const target = document.querySelector('#sentinel');
        if (target) {
            observer.observe(target);
        }

        return () => observer.disconnect();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true);
    }

    useEffect(() => {
        const filteredCities = cities.filter((city) =>
            city.name.toLowerCase().includes(searchTerm?.toLowerCase())
        );
        setFilteredCities(filteredCities);
    }, [cities, searchTerm]);

    /* @description The handleCitySortClick, handleCountrySortClick, handleTimezoneSortClick function is for filtering data. */

    const handleCitySortClick = () => {
        if (citySortOrder === 'asc') {
            filteredCities = filteredCities.sort((a, b) => b.name.localeCompare(a.name));
            setCitySortOrder('desc');
        } else {
            filteredCities = filteredCities.sort((a, b) => a.name.localeCompare(b.name));
            setCitySortOrder('asc');
        }
    };

    const handleCountrySortClick = () => {
        if (countrySortOrder === 'asc') {
            filteredCities = filteredCities.sort((a, b) => b.cou_name_en.localeCompare(a.cou_name_en));
            setCountrySortOrder('desc');
        } else {
            filteredCities = filteredCities.sort((a, b) => a.cou_name_en.localeCompare(b.cou_name_en));
            setCountrySortOrder('asc');
        }
    }

    const handleTimezoneSortClick = () => {
        if (timezoneSortOrder === 'asc') {
            filteredCities = filteredCities.sort((a, b) => b.timezone.localeCompare(a.timezone));
            setTimezoneSortOrder('desc');
        } else {
            filteredCities = filteredCities.sort((a, b) => a.timezone.localeCompare(b.timezone));
            setTimezoneSortOrder('asc');
        }
    }

    const handleOptionClick = (cityName) => {
        setSearchTerm(cityName);
        setShowDropdown(false);
    }

    return (
        <div className="flex flex-col justify-center p-4 bg-[#17384c]">
            <div className='sm:ml-6 lg:ml-8'>

                {/* input field search box. */}

                <input
                    type='text'
                    placeholder='Enter City name...'
                    value={searchTerm}
                    onChange={handleSearch}
                    className='p-2 border border-gray-300 rounded-md mb-4 outline-none w-1/3 bg-[#17384c] text-white'
                />

                {/* autocomplete options. */}

                {showDropdown && searchTerm && (
                    <ul className="autocomplete-list absolute bg-white shadow-md rounded-md overflow-hidden">
                        {filteredCities.map((city, idx) => (
                            <li key={idx} className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={() => handleOptionClick(city.name)}>
                                {city.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="overflow-x-auto ">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">

                        {/* table */}

                        <table className="min-w-full divide-y divide-gray-200">

                            {/* table head. */}

                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center" onClick={handleCitySortClick}>
                                            City Name
                                            <div className="ml-1 cursor-pointer">
                                                <BsArrowDownUp className={`transform ${citySortOrder === 'desc' ? 'rotate-180' : ''} transition duration-300 ease-in-out text-sm font-semibold`} />
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center" onClick={handleCountrySortClick}>
                                            Country
                                            <div className="ml-1 cursor-pointer">
                                                <BsArrowDownUp className={`transform ${countrySortOrder === 'desc' ? 'rotate-180' : ''} transition duration-300 ease-in-out text-sm font-semibold`} />
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center" onClick={handleTimezoneSortClick}>
                                            TimeZone
                                            <div className="ml-1 cursor-pointer">
                                                <BsArrowDownUp className={`transform ${timezoneSortOrder === 'desc' ? 'rotate-180' : ''} transition duration-300 ease-in-out text-sm font-semibold`} />
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            {/* table data. */}

                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCities.map((city, idx) => (
                                    <tr key={idx} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                to={{
                                                    pathname: `/weather/${encodeURIComponent(city.name)}`,
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900"
                                                onClick={(e) => {
                                                    if (e.button === 1) {
                                                        e.preventDefault();
                                                        window.open(`/weather/${encodeURIComponent(city.name)}`, '_blank'); // Open in new tab
                                                    }
                                                }}
                                            >
                                                {city.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{city.cou_name_en}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{city.timezone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="sentinel"></div>
        </div>
    )
}

export default CitiesTable;