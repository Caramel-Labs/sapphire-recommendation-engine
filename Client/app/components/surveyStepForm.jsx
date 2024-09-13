'use client'

import { useFormState } from "@/app/context/formContext"


import Welcome from "./welcome"
import LocationSelector from "./locationSelector"
import Details from "./details"
import InterestSelection from "./interestSelection"
import End from "./end"

export default function SurveyStepForm() {
    const { step } = useFormState()
    switch (step) {
      case 0:
        return <LocationSelector />
      case 1: 
        return <Details />
      case 2: 
        return <InterestSelection  />
      case 3: 
        return <End />
      case 4: 
      return 
      case 5:
        return 
      default:
        return null
    }
  }