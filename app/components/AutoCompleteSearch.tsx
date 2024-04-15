'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'

interface City {
  geoname_id: string
  name: string
}

const AutocompleteSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<City[]>([])

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value
    setInputValue(newInputValue)

    try {
      const response = await fetch(
        `https://public.opendatasoft.com/api/v2/catalog/datasets/geonames-all-cities-with-a-population-1000/records?refine.name=${encodeURIComponent(
          newInputValue
        )}&limit=20`
      )
      const data = await response.json()
      setSuggestions(data.results)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search cities..."
      />
      <ul>
        {suggestions &&
          suggestions.map((suggestion) => (
            <li key={suggestion.geoname_id}>{suggestion.name}</li>
          ))}
      </ul>
    </div>
  )
}

export default AutocompleteSearch
