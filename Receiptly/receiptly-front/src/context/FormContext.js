import { createContext , useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({children}) => {
    const [Data, setData] = useState({})
    const [Step, setStep] = useState(0)
    const [isEditing, setIsEditing] = useState(false)

    const updateData = (data) => {
        setData(prev => ({...prev , ...data}))
    }

    const goToStep = (step) => {console.log(step); setStep(step)}

    return(
        <FormContext.Provider value={{Data , Step, updateData, goToStep, isEditing, setIsEditing}}>
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => useContext(FormContext);