import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'

interface Props{
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

export default function RadioButtonGroup({onChange, options, selectedValue}: Props) {
  return (
    <FormControl>
        <RadioGroup onChange={onChange} value={selectedValue}>
            {options.map(({value,label})=>(
                <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
            ))}


        </RadioGroup>
    </FormControl>
  )
}

