"use client"

import React, { useMemo, useState } from "react"
import { Controller } from "react-hook-form"
import countryList from "react-select-country-list"
import ReactCountryFlag from "react-country-flag"
import { ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"

type CountryOption = {
  value: string
  label: string
}

type CountryFieldProps = CountrySelectProps & {
  placeholder?: string
}

const getCountryFlag = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return null
  return (
    <ReactCountryFlag
      countryCode={countryCode.toUpperCase()}
      svg
      style={{ width: "1.2em", height: "1.2em" }}
      title={countryCode.toUpperCase()}
      className="inline-block"
    />
  )
}

const CountryField = ({
  name,
  label,
  control,
  error,
  required = false,
  placeholder = "Select a country",
}: CountryFieldProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const countries = useMemo<CountryOption[]>(() => countryList().getData(), [])
  const filteredCountries = useMemo(() => {
    if (!query) return countries
    return countries.filter(
      (country) =>
        country.label.toLowerCase().includes(query.toLowerCase()) ||
        country.value.toLowerCase().includes(query.toLowerCase())
    )
  }, [countries, query])

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="form-label mb-3 block text-gray-400">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue="US"
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => {
          const selectedCountry = countries.find(
            (country) => country.value === field.value
          )
          const displayLabel = selectedCountry ? (
            <span className="flex items-center gap-2 truncate">
              {getCountryFlag(selectedCountry.value)}
              <span className="truncate">{selectedCountry.label}</span>
            </span>
          ) : (
            placeholder
          )

          return (
            <>
              <input type="hidden" {...field} />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="country-select-trigger" asChild>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-slate-950 px-4 py-3 text-left text-sm text-white transition hover:border-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                  >
                    <span className="truncate">{displayLabel}</span>
                    <ChevronDown className="size-4 opacity-70" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-full max-w-md p-0">
                  <Command className="rounded-none border border-gray-700 bg-slate-950">
                    <CommandInput
                      value={query}
                      onValueChange={setQuery}
                      placeholder="Search country..."
                    />
                    <CommandList>
                      {filteredCountries.length === 0 ? (
                        <CommandEmpty>No countries found.</CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {filteredCountries.map((country) => (
                            <CommandItem
                              key={country.value}
                              value={country.value}
                              onSelect={(value) => {
                                field.onChange(value)
                                setOpen(false)
                                setQuery("")
                              }}
                            >
                              <span className="mr-2">{getCountryFlag(country.value)}</span>
                              <span className="truncate">{country.label}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </>
          )
        }}
      />

          {error && <p className="text-sm text-red-500">{error.message}</p>}
           <p className='text-xs text-gray-500'>
                Helps us show market data and news relevant to you.
            </p>
    </div>
  )
}

export default CountryField