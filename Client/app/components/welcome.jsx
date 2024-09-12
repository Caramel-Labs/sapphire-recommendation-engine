'use client'

import { useFormState } from "@/app/context/formContext"

export default function Welcome() {
    const { onHandleNext } = useFormState()
    return (
      <div>
        <h1>Welcome to the Survey</h1>
        <p>Click the button below to start the survey</p>
        <button onClick={onHandleNext}>Start Survey</button>
      </div>
    );
}