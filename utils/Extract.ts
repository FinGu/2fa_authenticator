import React from "react"

export type as_state<T> = [T, React.Dispatch<React.SetStateAction<T>>]
